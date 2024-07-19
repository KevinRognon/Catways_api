

const mongoose = require("mongoose");

const clientOptions = {
    useNewUrlParser : true,
    dbName: 'Catways'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log("MongoDB connected");
    } catch (e) {
        console.log(`Erreur : ${e}`);
    }
}