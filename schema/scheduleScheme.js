const db = require('../config/dbconnection');
const {status,createResponse} = require('../config/const');

const getDailySchedule = async (req,res)=>{
    const day = req.params.day;

    db.query('SELECT code,subject,class,starttime,endtime,name,nik FROM schedule INNER JOIN subjects ON subjects.id = schedule.subjectid INNER JOIN users ON users.id = subjects.teacherid WHERE day=?',[day],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(createResponse(status.ERROR));
        }
        return res.status(200).send(result);
    })
}

const getTodaySchedule = async (req,res)=>{
    const day = req.params.day;

    db.query(`SELECT subjects.id as id, code,subject,class,starttime,endtime,name,nik FROM schedule INNER JOIN subjects ON subjects.id = schedule.subjectid INNER JOIN users ON users.id = subjects.teacherid WHERE day = ? AND ADDTIME(CURRENT_TIME,'00:30') >= starttime AND ADDTIME(CURRENT_TIME,'00:30') <= endtime AND schedule.id NOT IN (    `,[day],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(createResponse(status.ERROR));
        }
        return res.status(200).send(result);
    })
}

const addSchedule = async (req,res)=>{
    const id = req.body.id;
    const kelas = req.body.kelas;
    const day = req.body.day;
    const inTime = req.body.inTime;
    const outTime = req.body.outTime;

    db.query('INSERT INTO schedule (subjectid,class,day,starttime,endtime) VALUES(?,?,?,?,?)',[id,kelas,day,inTime,outTime],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(status.ERROR);
        }
        return res.status(200).send(createResponse(status.SUCCESS));
    })
}

module.exports={
    addSchedule,
    getDailySchedule,
    getTodaySchedule
}
