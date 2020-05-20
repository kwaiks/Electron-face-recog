const db = require('../config/dbconnection');
const {status,createResponse} = require('../config/const');

const submitAttendance = async (req,res)=>{
    const name = req.body.name;
    const id = req.body.id;
    const nik = req.body.nik;
    const pic = req.body.pic;

    db.query('INSERT INTO attendance (scheduleid,attendtime,name,nik, picEvidence) VALUES(?,NOW(),?,?,?)',[id,name,nik,pic],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(createResponse(status.ERROR));
        }
        return res.status(200).send(createResponse(status.SUCCESS));
    })
}

module.exports ={
    submitAttendance
}