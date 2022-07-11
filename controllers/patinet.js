const PatientModel = require('../models/patient')
const bcrypt = require('bcryptjs')
const Chance = require('chance')
var chance = new Chance()
const passport = require('passport')
const BaererStrategy = require('passport-http-bearer')
const { deletePatient } = require('./admin')

passport.use(
  new BaererStrategy(function (token, done) {
    if (token === 'correct') {
      return done(null, true)
    } else {
      return done(null, false)
    }
  })
)

exports.passports = passport.authenticate('baerer', { session: false })
exports.patientRegistration = function (req, res, next) {
  console.log(req.body.password)
  const newPatinet = new PatientModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    medicalRecordNumber: req.body.medicalRecordNumber,
  })

  newPatinet
    .save()
    .then((document) => {
      if (document) {
        document.password = undefined
        res.json(document)
      } else {
        res.send('registration is unseccessfull')
      }
    })
    .catch((err) => {
      console.log(err)
      res.send('error happend')
    })
}

exports.findPatient = function (req, res, next) {
  PatientModel.findById(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send('User not found')
      } else {
        result.password = undefined
        res.json(result)
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error happend')
    })
}

//inputvalidation

exports.registerInputValidation = function (req, res, next) {
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

exports.emailRegistered = function (req, res, next) {
  PatientModel.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        res.status(400).send(`${req.body.email} is already registered`)
      } else {
        next()
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error happend')
    })
}

//encypt password
exports.hashPassword = function (req, res, next) {
  const { password } = req.body
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, passwordHash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).send('err')
      } else {
        req.body.password = passwordHash
        next()
      }
    })
  })
}

exports.loginInputValidation = function (req, res, next) {
  console.log(req)
  const { email, password } = req.body

  const missingFields = []

  if (!email) {
    missingFields.push('email')
  }
  if (!password) {
    missingFields.push('password')
  }
  if (missingFields.length) {
    res
      .status(400)
      .send(`The following fields are missing ${missingFields.join(', ')}`)
  } else {
    next()
  }
}

exports.checkPatient = function (req, res, next) {
  const { email } = req.body
  console.log(email)
  PatientModel.findOne({ email: email })

    .then((userDocument) => {
      if (!userDocument) {
        res
          .status(404)
          .send(`Patient with ${email} number is not exist in the system`)
      } else {
        req.userDocument = userDocument
        next()
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error occupied')
    })
}

exports.checkPassword = function (req, res, next) {
  const hashPassword = req.userDocument.password
  const { password } = req.body
  bcrypt.compare(password, hashPassword, function (err, isPasswordCorrect) {
    if (err) {
      console.log(err)
      res.status(500).send('Error happend')
    } else if (isPasswordCorrect) {
      next()
    } else {
      res.status(400).send('Password is incorrect')
    }
  })
}

exports.giveAccess = function (req, res, next) {
  console.log(req.body)
  const accessToken = chance.guid()
  req.userDocument.accessToken = accessToken
  req.userDocument
    .save()
    .then((result) => {
      if (result) {
        res.send(accessToken)
      } else {
        res.status(400).send('Error')
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error happened')
    })
}
