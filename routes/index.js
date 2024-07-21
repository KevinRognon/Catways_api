const express = require('express');
const router = express.Router();

const userRoute = require("./users");
const catwaysRoute = require('./catways.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Bienvenue sur cette api.'
  })
});

router.use('/users', userRoute);
router.use('/catways', catwaysRoute);

module.exports = router;
