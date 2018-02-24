import {Request} from "express";
import {Pronostiek} from "../../shared/models/pronostiek/Pronostiek";

const mysql = require('mysql');
const dbconfig = require('./database');
const connection = mysql.createConnection(dbconfig.connection);


export class UserUtils{

}


export class PronostiekUtils{

    public static getPronostiek(req : Request) : Pronostiek {

        console.log(req.user);
        console.log(req.user.id);


        return new Pronostiek(req.user.id);
    }
}