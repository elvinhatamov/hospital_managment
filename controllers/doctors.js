const PatientModel = require('../models/patient')
const DoctorModel = require('../models/doctor')

drPatinetFind = function (req, res) {
  const medicalRecordNumber = req.body
  PatientModel.find({ medicalRecordNumber })
    .then((result) => {
      if (result) {
        res.send(result)
      } else {
        res.status(404).send('Patient is not found')
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error happened')
    })
}


exports.updatePatient = function (req, res) {
  PatientModel.findOneAndUpdate(
    { medicalRecordNumber: req.params.medicalRecordNumber },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    {
      new: true,
    }
  )
    .then((result) => {
      if (!result) {
        res.status(404).send('Patien is not found')
      } else {
        res.json(result)
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('error happend')
    })
}

exports.drLoginPage = function(req,res){
  console.log(req);
  const {badgeNumber} = req.body
  .then((result)=>{
    if(result){
    res.send(result)
    }else{
      res.status(404).send(`${badgeNumber} is not found.`)
    }
  })
  .catch((err)=>{
    console.log(err).status(500).send('Error happened')
  })
}


exports.showDoctor = function(req,res){
  DoctorModel.find({badgeNumber: req.body.badgeNumber})
  .then((document)=>{
    if(!document){
      res.send("Error")
    }else{
      res.render("hospital/showdoctors" , {doctors: document})
    }
  })
}