const express = require('express');
const router = express.Router();
const { bookAppointment, getMyAppointments, getAllAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/book', protect, bookAppointment);
router.get('/my-appointments', protect, getMyAppointments);

// Admin routes
router.get('/', protect, admin, getAllAppointments);
router.put('/:id/status', protect, admin, updateAppointmentStatus);

module.exports = router;
