const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
 badgeNumber: {
  type: String,
  required: true
 }
 
})

var DoctorModel = mongoose.model('Doctor', doctorSchema)

module.exports = DoctorModel
