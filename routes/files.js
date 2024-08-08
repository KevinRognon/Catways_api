const express = require('express');

const router = express.Router();
const service = require('../services/files.js');
const upload = require('../middlewares/file-storage');
const private_route = require('../middlewares/private');

// router.get('/', private_route.checkJWT, service.getAllFiles);
router.post('/', private_route.checkJWT, upload.single('file'), service.createFile);


module.exports = router;