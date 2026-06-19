const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  feesPerConsultation: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/150',
  }
}, {
  timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
