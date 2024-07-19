const Book = require('../models/book');

exports.findall = async (req, res, next) => {

    try {
        let books = await Book.find();
        return res.status(200).json(books);
    } catch (e) {
        return res.status(501).json(e);
    }
}

exports.add = async (req, res, next) => {
    const temp = ({
        title: req.body.title,
        author: req.body.author
    });

    try {
        let book = await Book.create(temp);
        return res.status(200).json(book);
    } catch (e) {
        return res.status(501).json(e);
    }
}