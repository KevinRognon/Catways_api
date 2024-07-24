
const Reservation                     = require('../models/reservation');

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
		return res.status(501).json({
            error_message: "Erreur lors de la requête."
        });
	}
};

