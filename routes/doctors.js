const express = require('express')
const router = express.Router()

const patientController = require('../controllers/admin')
const doctorCtrl = require('../controllers/doctors')



router.post('/drlogin', doctorCtrl.drLoginPage)
//get all patinet
router.get('/drlogin', (req, res) => {
  res.render('hospital/drlogin')
})

router.get('/badge', doctorCtrl.showDoctor);

//get single patient
router.get('/patient/:id', (req, res) => {
  res.send('get single patient')
})

//update patinet
router.put('/patient/:id', (req, res) => {
  res.send('update')
})


module.exports = router
