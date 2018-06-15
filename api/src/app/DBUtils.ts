import { PronostiekViewModel } from './../shared/models/pronostiek.view.model';
import { Match } from './../shared/models/pronostiek/Match';
var crypto = require("crypto");

import { Key } from './../shared/models/key';
import {Request, Response} from "express";
import {Pronostiek} from "../shared/models/pronostiek/Pronostiek";
import {Tournament} from "../shared/models/pronostiek/Tournament";
import {getTournament} from "../shared/utils/TournamentUtils";
import { STATUS_CODES } from 'http';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
import { TOURNAMENT_START_DATE } from '../shared/utils/tournament.start.date';

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
        connection.query("SELECT * FROM pronostiek.ref_pronostiek limit 1",[], function(err : Error, rows : any){
                        if (err)
                            throw err;
                        let ref_pronostiek = rows[0];
                        ref_pronostiek = ref_pronostiek.data.toString('utf8');
                        ref_pronostiek = JSON.parse(ref_pronostiek);
                        res.send(ref_pronostiek);
                        
         });
    };


    public static getAllPronostiek(req: Request, res: Response){
        const query = 'SELECT j_user.id, j_user.firstname, j_user.lastname, j_user.email, prono.tournament FROM pronostiek.users as j_user JOIN pronostiek.pronostiek  as prono where j_user.id = prono.userid;';
        connection.query(query, [], function(err: Error, rows: any){
            if(err){
                res.status(500).send(err);
            }
            const returnVal: PronostiekViewModel[] = [];
            console.log(rows.length);
            if(rows !== undefined && rows.length > 0){
                console.log(rows[0]);
                
                rows.forEach((element: any) => {
                    const obj: PronostiekViewModel = {firstname: undefined, email: undefined, lastname: undefined, matches: [], knockoutRounds: []};
                    obj.firstname = element.firstname;
                    obj.lastname = element.lastname;
                    obj.email = element.email;
                    let stringValue = element.tournament.toString('utf8');
                    const tournament: Tournament = JSON.parse(stringValue);
                    tournament.groups.forEach(group => {
                        group.matches.forEach(match => {
                            obj.matches.push(match);
                        });
                    });

                    tournament.rounds.forEach(round => {
                        obj.knockoutRounds.push(round);
                    });

                    returnVal.push(obj);
                    
                });

            }
            res.send(returnVal);
        })
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
                console.log("update");
                query = "UPDATE ref_pronostiek SET  data = ? , lastupdate = ?, update_by= ? where id = ? ";
                connection.query(query,[JSON.stringify(req.body), now, req.user.id, id],function(err : Error ) {
                    if(err){ 
                         res.status(500).send(err);
                        return;
                    }
                    res.status(200).send("ok");
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