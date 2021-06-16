// options for the swagger documentation

module.exports = {
    swaggerDefinition: {
        info: {
            description: 'REST API that justifies a text in parameters',
            title: 'api-verify',
            version: '1.0.0',
        },
        host: `justify-api-vde-guil.herokuapp.com`,
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
                description: "header form: 'token XXXXXXXXXX'",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: [
        './router.js',
        './models/*.js'
    ] //Path to the API handle folder
};
