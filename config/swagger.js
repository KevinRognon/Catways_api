const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuration des options pour swagger-jsdoc
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation de l\'API avec Swagger',
            contact: {
                name: 'ROGNON Kevin',
                email: 'rognonk@gmail.com',
            },
            servers: [
                {
                    url: `${process.env.URL}`,
                },
            ],
        },
    },
    apis: ['./routes/*.js'], // Chemin vers les fichiers d'API pour la documentation
};

// Initialisation de swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
