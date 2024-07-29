
const Reservation                     = require('../models/reservation');

exports.createReservation = async (req, res) => {
	try {
		const infos = {
			catwayNumber: req.body.catwayNumber,
			clientName: req.body.clientName,
			boatName: req.body.boatName,
			checkIn: new Date(req.body.checkIn),
			checkOut: new Date(req.body.checkOut)
		}

		let existingReservation = await Reservation.find({
			catwayNumber: infos.catwayNumber,
			$or: [
				{
					checkIn: { $lt : infos.checkIn, $gt: infos.checkout }
				},
				{
					checkOut: { $gt : infos.checkIn, $lt: infos.checkOut }
				},
				{
					checkIn: { $lte: infos.checkIn },
					checkOut: { $gte: infos.checkOut }
				}
			]
		});

		if (existingReservation.length > 0) {
			return res.status(400).json({
				message: "Une réservation est déjà enregistrée pour ce créneau"
			})
		}

		const newReservation = await Reservation.create(infos);
		await newReservation.save(); 

		return res.status(201).json({
			message: "Réservation créée avec succès",
			reservation: newReservation
		})

	} catch (e) {
		return res.status(500).json({
			error_message: "Erreur lors de la requête."
		});
	}
};

exports.deleteReservation = async (req, res) => {
	try {

		const id_reservation = req.params.id;

		await Reservation.deleteOne({_id: id_reservation}).then(() => {
			return res.status(200).json({
				message: "Réservation supprimée"
			})
		});



	} catch (e) {
		return res.status(500).json({
			error_message: "Erreur lors de la requête."
		});
	}
}


exports.getAllReservations = async (req, res) => {
	try {
		let reservations = await Reservation.find();

		if (reservations) {
			return res.status(200).json({
                message: "Success",
                reservations: reservations
            })
		}

		return res.status(404).json('reservations_not_found');
	} catch (error) {
		return res.status(500).json({
            error_message: "Erreur lors de la requête."
        });
	}
};


exports.getReservationInfos = async (req, res) => {
	const id = req.params.id;
	try {
		let reservation = await Reservation.findOne({_id:id});
		
		if (reservation) {
			return res.status(200).json({
				message: "Success",
				reservation: reservation
			})
		}

		return res.status(404).json({
			message: "Not found"
		})

	} catch (e) {
		return res.status(500).json({
			message: "Erreur lors de la requête"
		})
	}
}