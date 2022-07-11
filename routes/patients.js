const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patinet')

/// patient routes ///

router.post(
  '/login',
  patientController.loginInputValidation,
  patientController.checkPatient,
  patientController.checkPassword,
  patientController.giveAccess
)

router.get('/login', (req,res)=>{
  res.render('hospital/login')
})

//get single patient
router.post(
  '/register',
  patientController.registerInputValidation,
  patientController.emailRegistered,
  patientController.hashPassword,
  patientController.patientRegistration
)

//Get patient home page
router.get('/new',(req,res) =>{
 res.render("hospital/patient");
} )

//patient result
router.get('/:id', patientController.findPatient)

module.exports = router
