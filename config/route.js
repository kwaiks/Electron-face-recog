const express = require('express');
const fs = require('fs');

const userSchema = require('../schema/userScheme');
const subjectScheme = require('../schema/subjectScheme');
const scheduleScheme = require('../schema/scheduleScheme');
const attendanceScheme = require('../schema/attendanceScheme');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './public/images/' + req.body.nik;
    fs.mkdirSync(dir,{ recursive: true })
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage:storage});

const eviStorage = multer.diskStorage({
  destination: function(req, file, cb){
    const dir ='./public/images/evidence';
    cb(null,dir);
  },
  filename: function (req, file, cb){
    cb(null, file.originalname);
  }
})
const uploadEvi = multer({storage:eviStorage});

const router = express.Router();

router.post("/login",userSchema.login);

router.get("/getUser",userSchema.getUser);
router.get("/getUser/:id", userSchema.getUserById);
router.post("/saveUser",userSchema.saveUser);
router.post("/addUser",upload.array('images'),userSchema.addUser);

router.get("/getSubject",subjectScheme.getSubjects);
router.post("/addSubject",subjectScheme.addSubject);
router.post("/saveSubject",subjectScheme.saveSubject);
router.get("/deleteSubject/:id",subjectScheme.deleteSubject);

router.post("/addSchedule",scheduleScheme.addSchedule);
router.get("/getDailySchedule/:day",scheduleScheme.getDailySchedule);
router.get("/getTodaySchedule/:day",scheduleScheme.getTodaySchedule);
router.get("/getUserSchedule/:id",scheduleScheme.getUserSchedule);

router.post("/submitAttendance",uploadEvi.single('image'),attendanceScheme.submitAttendance);
router.get("/getAllAttendance", attendanceScheme.getAllAttendance);
router.get("/getUserAttendance/:nik", attendanceScheme.getUserAttendance);
router.post("/updateAttendance", attendanceScheme.updateAttendance);

module.exports = router;