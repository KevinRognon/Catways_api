const express = require('express');
const router = express.Router();

const userRoute = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Bienvenue sur cette api.'
  })
});

router.use('/users', userRoute);

module.exports = router;
