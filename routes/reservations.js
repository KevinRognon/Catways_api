const express = require('express');
const router = express.Router();
const service_reservation = require('../services/reservations');

router.get('/', service_reservation.getAllReservations);





module.exports = router;