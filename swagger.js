const swaggerAutogen = require("swagger-autogen")();

const options = {
    info: {
      title: "Blog API",
      description: "This is a blog API",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "x-api-key",
        in: "header",
      },
    },
};

const outputFile = './swagger-output.json';
const endpointsFile = ['./routes/*.js'];

swaggerAutogen(outputFile, endpointsFile, options).then(() => {
    console.log("Swagger file generated successfully!");
    require('./server');  // Asegúrate de que 'server' sea el archivo correcto
});
