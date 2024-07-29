const express = require('express');
const router = express.Router();
const service_reservation = require('../services/reservations');
const private_route = require('../middlewares/private');

router.get('/', private_route.checkJWT, service_reservation.getAllReservations);
router.post('/create', private_route.checkJWT, service_reservation.createReservation);
router.get('/:id', private_route.checkJWT, service_reservation.getReservationInfos);
router.delete('/:id', private_route.checkJWT, service_reservation.deleteReservation);





module.exports = router;