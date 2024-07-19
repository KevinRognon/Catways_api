

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

// Methode d'authentification

exports.authenticate = async (req, res, next) => {
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email: email, name: name}, '-__v -createdAt -updatedAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });




                    return res.status(200).json({
                        'token' : token,
                        'user'  : {
                            'name': name,
                            'email': email
                        }
                    });
                }

                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (e) {
        return res.status(501).json(e);
    }
}


// Récupérer un utilisateur depuis la base de donnée Mongo.
exports.getById = async (req, res, next) => {
    let id = req.params.id;

    try {
        let user = await User.findById(id);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('user_not_found');
    } catch (e) {
        return res.status(501).json(e);
    }
};

// Récupérer tous les documents de la collection User

exports.findall = async (req, res, next) => {
    try {
        let users = await User.find();

        if(users) {
            return res.status(200).json(users)
        }
    } catch (e) {
        return res.status(501).json(e);
    }
}

// Ajouter un utilisateur à la base de données Mongo.

exports.add = async (req, res) => {
    const temp = ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.create(temp);
        if (user) {
            return res.status(200);
        }
    } catch (e) {
        return res.status(501).json(e);
    }
}

// Modifier un utilisateur

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const temp = ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.findOne({_id: id});

        if(user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(201).json(user);
        }

        return res.status(404).json("user_not_found");
    } catch (e) {
        return res.status(501).json(e);
    }
}

// Supprimer un utilisateur

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await User.deleteOne({ _id: id });
        return res.status(204).json('delete_ok');
    } catch (e) {
        return res.status(501).json(e);
    }
}