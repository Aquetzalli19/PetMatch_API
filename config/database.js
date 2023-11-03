import mysql from 'mysql2';
import util from 'util';
import {DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } from "../src/config.js"

export const pool = mysql.createPool({

    connetionLimit : 10,
    host : DB_HOST,
    port : DB_PORT,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_DATABASE

});

pool.query = util.promisify(pool.query);