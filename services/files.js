const { storage } = require('../middlewares/file-storage');
const File = require('../models/file');
const fs = require('fs');

exports.createFile = (req, res, next) => {
    const file = new File({
        name: req.file.filename,
        imageUrl: `${req.protocol}://localhost:3000/uploads/${req.file.filename}`,
        userId: req.body.userId
    });

    file.save().then(() => {
        res.status(201).json(req.file)
    }).catch( error => {
        res.status(400).json({
            message: error
        })
    })
}