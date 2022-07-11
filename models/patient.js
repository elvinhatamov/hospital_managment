const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  id:{
    type:String
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  medicalRecordNumber: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default:true
  },
  createDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
})

const PatientModel = mongoose.model('Patient', patientSchema)

module.exports = PatientModel

