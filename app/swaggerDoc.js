// options for the swagger documentation
const options = {
    swaggerDefinition: {
        info: {
            description: 'REST API that justifies a text in parameters',
            title: 'api-verify',
            version: '1.0.0',
        },
        host: `https://justify-api-vde-guil.herokuapp.com/`,
        basePath: '/api',
        produces: [
            "application/json",
            "text/plain"
        ],
        schemes: ['https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: [
        './app/router.js',
        './app/models/*.js'
    ] //Path to the API handle folder
};

module.exports = options;