const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const winston = require('winston');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const i18n = require('i18n')
const path = require('path')

i18n.configure({
    locales: ['en', 'fr', 'de', 'nl'],
    directory: path.join(__dirname, '../locales')
})

import * as pck from "../../package.json";

const options = {
    definition: {
        openapi: '3.0.1', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'DasLab', // Title (required)
            version: pck.version, // Version (required)
        },
        components: {
            securitySchemes: {
                "api_key": {
                    "type": "apiKey",
                    "name": "idtoken",
                    "in": "header"
                },
            },
        }
    },
    // Path to the API docs
    apis: ['src/controllers/*.ts', 'src/controllers/*.js'],
    basePath: '/',

};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

const Init = async (app) => {
    app.use(cors());
    app.use(compression());
    app.use(
        helmet({
            frameguard: false,
        })
    );
    app.use((req, res, next) => {
        winston.info(req.method, req.path, req.query)
        next();
    })
    app.use(bodyParser.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    app.use(i18n.init)
}

export const Middleware = Init;