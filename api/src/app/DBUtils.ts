import { ScoreViewModel } from './../shared/models/score.model';
import { Tournament } from './../shared/models/pronostiek/Tournament';
import { Match } from './../shared/models/pronostiek/Match';
import { PronostiekViewModel } from './../shared/models/pronostiek.view.model';
var crypto = require("crypto");

import { Key } from './../shared/models/key';
import {Request, Response} from "express";
import {Pronostiek} from "../shared/models/pronostiek/Pronostiek";
import {getTournament} from "../shared/utils/TournamentUtils";
import { TOURNAMENT_START_DATE } from '../shared/utils/tournament.start.date';
import { User } from '../shared/models/User';
import { Group } from '../shared/models/pronostiek/Group';

const mysql = require('mysql');
const dbconfig = require('./config/database');
const connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


export class UserUtils{

}


export class PronostiekUtils{

    public static getPronostiek(req : Request, res : Response)  {
        connection.query("SELECT * FROM pronostiek WHERE userId = ?",[req.user.id], function(err : Error, rows : any){
                        if (err)
                            throw err;
                        if(rows.length == 1){
                            let pronostiek = rows[0];
                            let stringValue = pronostiek.tournament.toString('utf8');
                            console.log(stringValue);
                            
                            pronostiek.tournament = JSON.parse(stringValue);
                            res.send(pronostiek);
                        } else {
                            //this means there is none, so lets create one;
                            let prono : Pronostiek = new Pronostiek(req.user.id);
                            prono.tournament =  getTournament();
                            res.send(prono);
                        }
         });
    };

    public static getRefPronostiek(req : Request, res : Response)  {
        getRefPronostiekData()
            .then((rows) => {
                res.send(rows);
            })
            .catch((err) => {
                throw err;
            });
    };


    public static getAllPronostiek(req: Request, res: Response){
        getAllPronostiekData()
            .then( data => res.send(data))
            .catch(err => { throw err; })
    }

    public static savePronostiek(req : Request, res : Response)  {

        if(new Date() > TOURNAMENT_START_DATE){
            res.status(405).send("Not allowed to save");
            return;
        }

        let exits = false;
        const selectQuery = "Select id from pronostiek.pronostiek where userid=?";

        connection.query(selectQuery, [req.user.id], function(err:Error, rows: any){
            
            const prono = req.body;
            if(rows.length > 0){
                exits = true;
                prono.id = rows[0].id;
            }
            
            const now = new Date();
            let query : string;

        if(exits){
            query = "UPDATE pronostiek SET  lastupdate = ? , tournament = ? where id = ? ";
            connection.query(query,[now, JSON.stringify(prono.tournament), prono.id],function(err : Error ) {
                if(err){throw  err;}
                prono.lastupdate = now ;
                res.send(prono);
            });

        } else {
            query = "INSERT INTO pronostiek ( userId, creationdate, lastupdate, tournament ) values (?,?,?,?)";
            connection.query(query,[req.user.id, now, now, JSON.stringify(prono.tournament)],function(err : Error, rows : any) {
                if(err){throw  err;}
                prono.id = rows.insertId;
                res.send(prono);
            });
             }
        });
     };

    public static saveRefPronostiek(req : Request, res : Response)  {

        let query = "select id from ref_pronostiek limit 1;"
        let id : number = undefined;
        let now = new Date();
        connection.query(query,[], function(err: Error, rows: any){

            if(err){throw  res.status(500).send(err);}
            if(rows.length > 0){
                id = rows[0].id;
            } 
            if(id !== undefined){
                // update flow:
                query = "UPDATE ref_pronostiek SET  data = ? , lastupdate = ?, update_by= ? where id = ? ";
                connection.query(query,[JSON.stringify(req.body), now, req.user.id, id],function(err : Error ) {
                    if(err){ 
                         res.status(500).send(err);
                        return;
                    }
                    res.status(204).send();
                });
            } else {
                // create flow:
                query = "INSERT into pronostiek.ref_pronostiek ( data, creationtime, lastupdate, update_by) values (?,?,?,?)"
                connection.query(query, [JSON.stringify(req.body), now, now, req.user.id ], function(err: Error, rows: any){
                    if(err){ 
                        res.status(500).send(err);
                       return;
                   }
                    res.status(200).send("ok");
                });
            }
            
        })
    };



    public static createKeys(req: Request, res: Response){

        const keys: Key[] = [];

        for (let i = 0; i < req.params.number; i++){
            const key = new Key();
            key.code = getKey();
            keys.push(key);
        }

        let query = " INSERT INTO pronostiek.keys ( code , used_by ) values "
        keys.forEach((key,index) => {
            query = query.concat("('"+key.code+"', null)");
            if(index != keys.length-1){
                query = query.concat(",");
            }
        });
        console.log(query);
        
        connection.query(query,[],function(err : Error, rows : any) {
            if(err){throw  err;}
            res.status(200).send("OK");
        });
    }

    public static getKeys(req: Request, res: Response){
        let query = " Select * from pronostiek.keys"
        connection.query(query,[],function(err : Error, rows : any) {
            if(err){throw  err;}
            res.status(200).send(rows);
        });
    }

    public static getAllUsers(req: Request, res: Response){
        let query = " Select * from pronostiek.users"
        connection.query(query,[],function(err : Error, rows : any) {
            if(err){throw  err;}
            res.status(200).send(rows);
        });
    }

    public static updateScores(req: Request, res: Response){
        let refProno: Tournament;
        let allPronos: PronostiekViewModel[];
        let allUsers: User[];
        let scoresToSave: ScoreViewModel[] = [];
        getRefPronostiekData()
        .then((rows: Tournament) => {
            refProno = rows;
            return getAllPronostiekData();
        })
        .then((data: PronostiekViewModel[]) => {
            allPronos = data;
            for(let prono of allPronos){
                let scoreToSave = {userId: prono.userId, firstName: prono.firstname, lastName: prono.lastname, score : 0};
                for(let matchToProcess of prono.matches){
                    scoreToSave.score =  scoreToSave.score + getScoreForMatch(matchToProcess, refProno);
                }
                scoresToSave.push(scoreToSave);
            }

            scoresToSave.sort(function(a,b){
                return b.score - a.score;
            })

           res.send(scoresToSave);
        });
        
    }

}




function getKey() {
    return makeid(5);
    // return crypto.randomBytes(5).toString('hex');;
}

function makeid(length : number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  function getRefPronostiekData() {
      return new Promise( function(resolve, reject){
        connection.query("SELECT * FROM pronostiek.ref_pronostiek limit 1",[], function(err : Error, rows : any){
            if (err)
                return reject(err);
            let ref_pronostiek = rows[0];
            ref_pronostiek = ref_pronostiek.data.toString('utf8');
            ref_pronostiek = JSON.parse(ref_pronostiek);
            
            if(ref_pronostiek.groups === undefined){
                ref_pronostiek = getTournament();
            } 

            ref_pronostiek.groups.forEach((group: Group) => {
                let newMatches : Match[] = [];
                group.matches.forEach(match => {
                    newMatches.push(Match.deserialize(match));
                })
                group.matches = newMatches;
            });

            resolve(ref_pronostiek);
            
    });
      });
  }

  function getAllPronostiekData() {

    return new Promise( function(resolve, reject) {
        const query = 'SELECT j_user.id, j_user.firstname, j_user.lastname, j_user.email, j_user.id, prono.tournament FROM pronostiek.users as j_user JOIN pronostiek.pronostiek  as prono where j_user.id = prono.userid;';
        connection.query(query, [], function(err: Error, rows: any){
            if(err){
                return reject(err);
            }
            const returnVal: PronostiekViewModel[] = [];
            console.log(rows.length);
            if(rows !== undefined && rows.length > 0){
                console.log(rows[0]);
                
                rows.forEach((element: any) => {
                    const obj: PronostiekViewModel = {firstname: undefined, email: undefined, lastname: undefined, userId: undefined, matches: [], knockoutRounds: []};
                    obj.userId = element.id;
                    obj.firstname = element.firstname;
                    obj.lastname = element.lastname;
                    obj.email = element.email;
                    let stringValue = element.tournament.toString('utf8');
                    const tournament: Tournament = JSON.parse(stringValue);
                    tournament.groups.forEach(group => {
                        group.matches.forEach(match => {
                            obj.matches.push(Match.deserialize(match));
                        });
                    });

                    tournament.rounds.forEach(round => {
                        obj.knockoutRounds.push(round);
                    });

                    returnVal.push(obj);
                    
                });

            }
            resolve(returnVal);
        })
    });

  }


function getAllUsersData() {
    return new Promise( function(resolve, reject){
      connection.query("SELECT * FROM pronostiek.users",[], function(err : Error, rows : any){
          if (err)
              return reject(err);
              resolve(rows);
        });
    });
}


function getScoreForMatch(matchToProcess: Match, refProno: Tournament): number{
    let refMatch = getMatchFromProno(refProno, matchToProcess);
    if(refMatch.homeTeamScore == undefined || refMatch.outTeamScore == undefined){
        return 0;
    }
    if(refMatch.homeTeamScore == matchToProcess.homeTeamScore && refMatch.outTeamScore == matchToProcess.outTeamScore){
        return 3;
    } else if(refMatch.getOutCome() == matchToProcess.getOutCome()){
        return 1;
    }
    return 0;
}

function getMatchFromProno(tournament :Tournament, matchToFind : Match){
    for(let group of tournament.groups){
        for (let match of group.matches){
            if(match.homeTeamName == matchToFind.homeTeamName && match.outTeamName == matchToFind.outTeamName){
                return match;
            }
        }
    }
}