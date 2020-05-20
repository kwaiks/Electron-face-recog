const db = require('../config/dbconnection');
const {status,createResponse} = require('../config/const');

const addSubject = async (req,res)=>{
    const id = Number(req.body.id);
    const subject = req.body.subject;
    const code = req.body.code;

    db.query('INSERT INTO subjects (code,subject,teacherid) VALUES (?,?,?)',[code,subject,id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(createResponse(status.ERROR));
        }
        return res.status(200).send(createResponse(status.SUCCESS));
    })
}

const saveSubject = async (req,res)=>{
    const id = req.body.id;
    const subject = req.body.subject;
    const teacherid = req.body.teacherid;

    db.query('UPDATE subjects SET subject = ?, teacherid = ? WHERE id = ?',[subject,teacherid,id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(createResponse(status.ERROR));
        }
        return res.status(200).send(createResponse(status.SUCCESS));
    })
}

const deleteSubject = async (req,res)=>{
    const id = req.params.id

    db.query('DELETE subjects WHERE id = ?',[id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(createResponse(status.ERROR, `${err.code} : ${err.errno}`));
        }
        return res.status(200).send(createResponse(status.SUCCESS));
    })
}

const getSubjects = async (req,res)=>{
    db.query('SELECT subjects.id,subject,code,name FROM subjects INNER JOIN users ON users.id = subjects.teacherid',(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(createResponse(status.ERROR));
        }
        return res.status(200).send(result);
    })
}

module.exports = {
    addSubject,
    saveSubject,
    deleteSubject,
    getSubjects,
}