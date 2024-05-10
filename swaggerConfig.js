const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',  
        info: {
            title: 'State Data API',  
            version: '1.0.0', 
            description: 'API for managing US state data and fun facts',
        },
    },
    apis: ['./src/routes/*.js'],   
};

const specs = swaggerJsdoc(options);

module.exports = specs;
