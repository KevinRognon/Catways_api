const express = require('express');
const router = express.Router();

const service_catway = require('../services/catway');

const private_route = require('../middlewares/private');
const {body, validationResult} = require("express-validator");
const moment = require('moment');

// Récupérer tous les catways
router.get('/', service_catway.getAllCatways);

// Créer un catway

router.post('/create', private_route.checkJWT, async function (req, res) {
	const temp = ({
		catwayNumber : req.body.catwayNumber,
		catwayType   : req.body.catwayType,
		catwayState  : req.body.catwayState
	});


	try {
		await service_catway.createCatway(temp, req, res);
	} catch (e) {
		return res.status(501);
	}
});

// Modifier l'état d'un catway

router.get('/:id', private_route.checkJWT, async function(req, res) {
	let id = req.params.id;
	try {
		let catway = await service_catway.getCatwayById(id);
		if (catway) {
			return res.status(200).json({
				message: 'Success',
				catway: catway
			});
		}
	} catch (e) {
		return res.status(501).json({
			error_message: "Erreur lors de la requete"
		});
	}
})

router.patch('/:id/update', private_route.checkJWT, async function(req, res) {
	const new_state = req.body.catwayState;
	const id        = req.params.id;
	await service_catway.updateCatway(id, new_state, req, res);

});


// Suppression d'un catway
router.delete('/:id', private_route.checkJWT, async function(req, res) {
	try {
		await service_catway.deleteCatway(req.params.id, req, res);
	} catch (e) {
		return res.status(501);
	}
});

// =========== ROUTES RESERVATIONS ============

// router.get('/:id/reservations', private_route.checkJWT, async function(req, res) {
// 	try {
// 		const catway = await service_catway.getCatwayById(req.params.id);
// 		const reservations = await service_reservations.getReservationsOfCatway(req.params.id);
// 		return res.render('catways/reservations/reservations', {
// 			reservations: reservations,
// 			catway: catway,
// 			moment: moment,
// 			user: req.session.user
// 		})

// 	} catch (e) {
// 		return res.status(501);
// 	}
// });

// router.post('/:id/reservations', private_route.checkJWT, async function (req, res) {
// 	const id = req.params.id;
// 	const catway = await service_catway.getCatwayById(id);
// 	const temp = {
// 		catwayNumber : catway.catwayNumber,
// 		clientName   : req.body.client_name,
// 		boatName     : req.body.boat_name,
// 		checkIn      : req.body.checkIn,
// 		checkOut     : req.body.checkOut
// 	};

// 	try {
// 		let resa = await service_reservations.createReservation(temp);
// 		let reservations = await service_reservations.getReservationsOfCatway(id);


// 		if(resa) {
// 			return res.render('catways/reservations/reservations', {
// 				reservations: reservations,
// 				catway: catway,
// 				moment: moment,
// 				user: req.session.user,
// 				message: "Réservation enregistrée"
// 			});
// 		}
// 		return res.render('catways/reservations/reservations', {
// 			reservations: reservations,
// 			catway: catway,
// 			moment: moment,
// 			user: req.session.user,
// 			error_message: "Echec de la reservation"
// 		})
// 	} catch (e) {
// 		return res.status(501);
// 	}
// });

// router.get('/:id_catway/reservations/:id_reservation', private_route.checkJWT, async function (req, res) {
// 	console.log("Detail d'une reservation");
// 	const id_reservation = req.params.id_reservation;
// 	const id_catway = req.params.id_catway;
// 	const reservation = await service_reservations.getReservationById(id_reservation);
// 	const reservations = await service_reservations.getReservationsOfCatway(id_catway);
// 	const catway = await service_catway.getCatwayById(id_catway);

// 	if(!reservation) {
// 		return res.render('catways/reservations/reservations', {
// 			reservations: reservations,
// 			catway: catway,
// 			moment: moment,
// 			user: req.session.user,
// 			error_message: "Echec de l'ouverture de la page"
// 		})
// 	}

// 	return res.render('catways/reservations/detail_reservation', {
// 		catway: catway,
// 		reservation: reservation,
// 		moment: moment,
// 		user: req.session.user,
// 	})


// });


// router.get('/:id_catway/reservations/:id_reservation/delete', private_route.checkJWT, async function (req, res) {
// 	const catway = await service_catway.getCatwayById(req.params.id_catway);

// 	try {
// 		let deleted = await service_reservations.deleteReservation(req.params.id_reservation);
// 		const reservations = await service_reservations.getReservationsOfCatway(req.params.id_catway);
// 		console.log(deleted);

// 		return res.render('catways/reservations/reservations', {
// 			reservations: reservations,
// 			catway: catway,
// 			moment: moment,
// 			user: req.session.user,
// 			message: "Suppression effectuée"
// 		})
// 	} catch (e) {
// 		return res.status(501);
// 	}

// });







module.exports = router;