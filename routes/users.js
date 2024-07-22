const express = require('express');
const router = express.Router();

const service = require("../services/users");
const private_route = require("../middlewares/private");

/* GET users listing. */


router.get('/findall', private_route.checkJWT, service.findall);
router.post('/add', private_route.checkJWT, service.add);
router.post('/authenticate', service.authenticate);


router.get('/:id', private_route.checkJWT, service.getById);
router.patch('/:id/update', private_route.checkJWT, service.update);
router.delete('/:id', private_route.checkJWT, service.delete);


module.exports = router;
