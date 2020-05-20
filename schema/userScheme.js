const db = require('../config/dbconnection');
const crypto = require('crypto');
const {status,createResponse} = require('../config/const');

const login = async (req,res)=>{
    console.log(req.body);
    const userName = req.body.username;
    const password = req.body.password;
    const hashedPass = crypto.createHash('sha256').update(password).digest('hex');

    db.query(`SELECT nik,name,type from users WHERE nik = ? AND password = ?`,[userName,hashedPass],(error,result)=>{
        if(error){
            console.log(error);
            return res.status(400).send('error Occured');
        }else if(result.length === 0 ){
            return res.status(200).send(createResponse(status.NOTFOUND,null));
        }
        return res.status(200).send(createResponse(status.SUCCESS,result[0]));
    })
}

const getUser = async (req,res)=>{
    db.query(`SELECT id,nik,name,picture FROM users WHERE type<>'admin'`, (error,result)=>{
        if(error){
            return res.status(400).send('Error Occured');
        }
        return res.status(200).send(result);
    })
}

const getUserById = async (req,res)=>{
    const dataId = req.params.id;
    db.query(`SELECT id,nik,name FROM users WHERE id=?`,[dataId], (error,result)=>{
        if(error){
            return res.status(400).send('Error Occured');
        }
        return res.status(200).send(createResponse(status.SUCCESS,result[0]));
    })
}

const saveUser = async (req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const nik = req.body.nik;

    db.query(`UPDATE users SET name=?, nik = ? WHERE id = ?`,[name,nik,id], (err,result)=>{
        if(err){
            return res.status(400).send('Error Ocurred');
        }
        return res.status(200).send(createResponse(status.SUCCESS));
    })
}

const addUser = async (req,res)=>{
    const name = req.body.name;
    const nik = req.body.nik;
    const images = req.body.picture;

    db.query('INSERT INTO users (nik,name,picture) VALUES (?,?,?)',[nik,name,images],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send('Error Ocurred');
        }
        return res.status(200).send(createResponse(status.SUCCESS))
    })
}

module.exports = {
    login,
    getUser,
    getUserById,
    saveUser,
    addUser
}