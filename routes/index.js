const express = require('express');
const router = express.Router();

const userRoute = require("./users");
const catwaysRoute = require('./catways.js');
const reservationsRoute = require('./reservations.js');
const fileRoute = require('../routes/files');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Bienvenue sur cette api.'
  })
});

router.use('/users', userRoute);
router.use('/catways', catwaysRoute);
router.use('/reservations', reservationsRoute);
router.use('/files', fileRoute);


module.exports = router;
