const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const mongodb = require("./db/mongo");
const path = require("path");
const { swaggerUi, swaggerDocs } = require('./config/swagger');

mongodb.initClientDbConnection();

const app = express();

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'documentation')));

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', indexRouter);
app.use(function(req, res, next) {
    res.status(404).json({
        name: 'API',
        version: 'dev',
        status: 404,
        message: 'not_found'
    });
});

module.exports = app;
