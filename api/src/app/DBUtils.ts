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

    public static savePronostiek(req : Request, res : Response)  {

        if(new Date() > TOURNAMENT_START_DATE){
            res.status(405).send("Not allowed to save");
        }

        const prono = req.body;
        const now = new Date();

        let query : string;

        if(prono.id){
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