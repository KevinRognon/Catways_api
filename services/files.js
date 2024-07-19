const storage = require("../middlewares/files-storage");
const File = require("../models/file");
const fs = require("fs");

exports.createOneFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const file = new File({
        name: req.file.filename, // Changed from req.file[0].filename
        imageUrl: `${req.protocol}://localhost:3000/uploads/${req.file.filename}`, // Same here
        userId: req.body.userId
    });
    console.log(file);

    // file.save()
    //     .then(() => { res.status(201).json({message: "Objet enregistré!"}) })
    //     .catch(error => { res.status(400).json( {error} ) })
};