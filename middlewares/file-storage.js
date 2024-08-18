const multer = require('multer');

const MIME_TYPES = {
    'image/jpeg': 'jpg',
    'image/jpg' : 'jpg',
    'image/png' : 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');  // Spécifie le dossier de destination
    },
    filename: (req, file, callback) => {
        let userid = req.decoded.user._id;
        
        const name = file.originalname.split(' ').join('_');  // Remplace les espaces par des underscores
        callback(null, Date.now() + '_' + userid + "_" + name);  // Construit le nom du fichier
    }
});

module.exports = multer({ storage: storage });
