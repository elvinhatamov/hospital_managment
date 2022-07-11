const PatientModel = require('../models/patient')

//Display list of admin

exports.getPostPatient = function (req, res, next) {
  const newPatient = new PatientModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    medicalRecordNumber: req.body.medicalRecordNumber,
  })
  newPatient
    .save()
    .then((document) => {
      if (document) {
        res.send(document)
      } else {
        res.redirect('hospital/addpatient')
      }
    })
    .catch((err) => {
      console.log(err)
      res.send('error happened')
    })
}
// function validation
exports.inputValidation = function (req, res, next) {
  const { firstName, lastName, email, password, medicalRecordNumber } = req.body

  const missingFields = []
  if (!lastName) {
    missingFields.push('flastName')
  }
  if (!firstName) {
    missingFields.push('firstName')
  }
  if (!email) {
    missingFields.push('email')
  }
  if (!password) {
    missingFields.push('password')
  }
  if (!medicalRecordNumber) {
    missingFields.push('medicalRecordNumber')
  }

  if (missingFields.length) {
    res
      .status(400)
      .send(`The following fields are missing ${missingFields.join(', ')}`)
  } else {
    next()
  }
}

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

//get patinets all

exports.getPatientsAll = function (req, res, next) {
  PatientModel.find()
    .then((result) => {
      console.log(result)
      if (!result) {
        res.status(404).send('Patien is not found')
      } else {
        res.render('hospital/admin', { patients: result })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('error happend')
    })
}

//get specific patient

exports.getOnePatient = function (req, res, nex) {
  const patients = []
  PatientModel.findById({ _id: req.params.id })
    .then((result) => {
      if (!result) {
        res.status(404).send('Patien is not found')
      } else {
        patients.push(result)
        res.render('hospital/showpatients', { patients: result })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('error happend')
    })
}

//Delete patient

exports.deletePatient = function (req, res) {
  
  PatientModel.findOneAndRemove({ _id: req.params.id })
    .then((result) => {
      if (!result) {
        res.status(400).json({error: 'Patien is not found'})
      } else {
        //
        res.status(200).json(result)

        res.render('hospital/showpatients')

   
      }
    
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('error happend')
      
    })
}

//Update the patient information
exports.updatePatient = function (req, res) {
  PatientModel.findOneAndUpdate(
    { _id: req.params.id },
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
        res.status(500).send('Patien is not found')
      } else {
        res.json(result)
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('error happend')
    })
}

exports.updateInputValidation = function (req, res, next) {
  const { firstName, lastName } = req.body
  const updateObj = {}

  if (firstName) {
    updateObj.firstName = firstName
  }
  if (lastName) {
    updateObj.lastName = lastName
  }
  req.updateObj = updateObj

  next()
}
