import {Request, Response} from "express";
import {Pronostiek} from "../../shared/models/pronostiek/Pronostiek";
import {Tournament} from "../../shared/models/pronostiek/Tournament";

const mysql = require('mysql');
const dbconfig = require('./database');
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
                            res.send(rows[0]);
                        } else {
                            //this means there is none, so lets create one;
                            let prono : Pronostiek = new Pronostiek(req.user.id);
                            prono.tournament = new Tournament();
                            res.send(prono);
                        }
         });
    };

    public static savePronostiek(req : Request, res : Response)  {

        const prono = req.body;
        const now = new Date();

        let query : string;

        if(prono.id){
            query = "UPDATE pronostiek SET userId = ? , lastupdate = ? , pronostiek = ? where userId = ? ";
            connection.query(query,[req.user.id, now, JSON.stringify(prono.tournament), req.user.id],function(err : Error, rows : any) {
                if(err){throw  err;}
                res.send(prono);
            });

        } else {
            query = "INSERT INTO pronostiek ( userId, creationdate, lastupdate, pronostiek ) values (?,?,?,?)";
            connection.query(query,[req.user.id, now, now, JSON.stringify(prono.tournament)],function(err : Error, rows : any) {
                if(err){throw  err;}
                prono.id = rows.insertId;
                res.send(prono);
            });

        }
    };
}