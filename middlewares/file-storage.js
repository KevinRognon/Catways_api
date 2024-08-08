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
        const name = file.originalname.split(' ').join('_');  // Remplace les espaces par des underscores
        const extension = MIME_TYPES[file.mimetype];  // Détermine l'extension du fichier
        callback(null, Date.now() + '_' + name + '.' + extension);  // Construit le nom du fichier
    }
});

module.exports = multer({ storage: storage });
