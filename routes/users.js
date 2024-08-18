const express = require('express');
const router = express.Router();

const service = require("../services/users");
const private_route = require("../middlewares/private");

/* GET users listing. */

// Récupère tous les utilisateurs de la base de données
router.get('/findall', private_route.checkJWT, service.findall);

// Ajoute un utilisateur
router.post('/add', private_route.checkJWT, service.add);

// Route d'authentification
router.post('/authenticate', service.authenticate);

// Récupère les informations d'un utilisateur par son ID
router.get('/:id', private_route.checkJWT, service.getById);

// Modifie les informations d'un utilisateur avec son ID
router.patch('/:id/update', private_route.checkJWT, service.update);

// Supprime un utilisateur avec son ID
router.delete('/:id', private_route.checkJWT, service.delete);


module.exports = router;
