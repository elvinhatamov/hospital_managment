const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const BaererStrategy = require('passport-http-bearer')
const passport = require('passport')
const PatientModel = require('../models/patient')

passport.use(
  new BaererStrategy( function (token, done) {
    if (token === 'correct') {
      return done(null, true)
    } else {
      return done(null, false)
    }
  })
)


// /admin/add-patient =>
// router.get('/', adminController.getPatientsAll)

//get all patinet
router.get( '/patient',
  // passport.authenticate('bearer', { session: false }),
  adminController.getPatientsAll
)

//get single patient
router.get('/patient/:id', adminController.getOnePatient)

// create
router.post('/patient/create',
  adminController.inputValidation,
  adminController.getPostPatient
)

router.get('/patient/create',(req,res)=>{
  res.send('hospital/addpatient')
})

//delete patinet
router.delete('/patient/:id/', adminController.deletePatient);


//update patient
router.put(
  '/patient/:id/update',
  adminController.updateInputValidation,
  adminController.updatePatient
)
router.get('/patient/:id/update', (req,res)=>{
  res.render('hospital/updatePatient')
  
})

module.exports = router
