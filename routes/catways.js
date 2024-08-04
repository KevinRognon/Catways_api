const express = require('express');
const router = express.Router();

const service_catway = require('../services/catway');
const private_route = require('../middlewares/private');

// Récupérer tous les catways
router.get('/', private_route.checkJWT, service_catway.getAllCatways);

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



module.exports = router;