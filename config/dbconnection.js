'use strict'

const mysql = require('mysql');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    port: 3307,
    database:'face_attendance'
})

module.exports = db;