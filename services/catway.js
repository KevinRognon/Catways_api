
const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

exports.getAllCatways = async (req, res) => {
	try {
		let catways = await Catway.find();

		if (catways) {
			return res.status(200).json({
                message: "Success",
                catways: catways
            })
		}

		return res.status(404).json('catways_not_found');
	} catch (error) {
		return res.status(501).json({
            error_message: "Erreur lors de la requête."
        });
	}
};

exports.createCatway = async (temp, req, res) => {

	let catway_number = await Catway.findOne({catwayNumber: temp.catwayNumber})

	if(catway_number) {
		return res.status(400).json({
			message: "Le catway " + catway_number.catwayNumber + " existe déjà."
		})
	}

	try {
		let catway = await Catway.create(temp);
		return res.status(200).json({
			message: "Catway créé avec succès",
			catway: catway
		});
	} catch (error) {
		return res.status(501).json({
			message: "Erreur lors de la requête: " + e
		});
	}

};

exports.getCatwayById = async (id, req, res) => {
	try {
		let catway = await Catway.findById(id);
		if(catway) {
			return catway;
		} else {
			res.status(404).json('catway not found');
		}
		return catway
	} catch (e) {
		res.status(501).json(`Internal error: ${e}`)
	}

}

exports.updateCatway = async (id, new_state, req, res) => {

	try {
		let catway = await Catway.findById(id);

		if (catway) {

			catway.catwayState = new_state;
			
			await catway.save();

			return res.status(200).json({
				message: "Catway modifié avec succès."
			});
		} else {
			return res.status(400).json({
				message: "Erreur lors de la modification du catway."
			});
		}

	} catch (error) {
		return res.status(501).json(error);
	}
};


exports.deleteCatway = async (id, req, res) => {
	try {
		const catway = await Catway.findOne({_id: id});
		await Reservation.deleteMany({catwayNumber: catway.catwayNumber});
		await Catway.deleteOne({_id: id});
		return res.status(200).json({
			message: "Suppression effective"
		})
	} catch (e) {
		return res.status(501).json(`Erreur lors de la suppression du catway: ${e}`);
	}
}