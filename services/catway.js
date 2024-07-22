
const Catway                     = require('../models/catway');

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

	try {
		let catway = await Catway.create(temp);
		res.render('catways/catway_creation_form/catway_creation_form', {
			message: 'Catway created successfully!',
			user: req.session.user
		});
	} catch (error) {
		if (error.code === 11000) {
			res.render('catways/catway_creation_form/catway_creation_form', { error_message: 'Email already used', user: req.user });
		} else {
			res.render('catways/catway_creation_form/catway_creation_form', { error_message: 'An error occurred, please try again', user: req.user });
		}
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
			return res.render('catways/update_catway/update_catway', {
				user: req.session.user,
				catway: catway,
				message: "Catway modifié avec succès!"
			})
		} else {
			return res.status(404).render('catways/update_catway/update_catway', {
				user: req.session.user,
				catway: catway,
				error_message: "Erreur dans la modification. Veuillez tenter de nouveau."
			});
		}

	} catch (error) {
		return res.status(501).json(error);
	}
};


exports.deleteCatway = async (id, req, res) => {
	try {
		await Catway.deleteOne({_id: id});
		return res.status(200).json({
			message: "Suppression effective"
		})
	} catch (e) {
		return res.status(501).json(`Erreur lors de la suppression du catway: ${e}`);
	}
}