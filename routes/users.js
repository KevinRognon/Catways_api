const express = require('express');
const router = express.Router();

const service = require("../services/users");
const private_route = require("../middlewares/private");

/* GET users listing. */


router.get('/findall', service.findall);
router.post('/add', service.add);
router.post('/authenticate', service.authenticate);


router.get('/:id', service.getById);
router.patch('/update', service.update);
router.delete('/delete', service.delete);


module.exports = router;
