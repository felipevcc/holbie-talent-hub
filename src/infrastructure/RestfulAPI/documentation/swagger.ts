import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Coderise API",
    version: "1.0.0",
    description: "API for the Backend project at Coderise for a recruitment system between companies and students",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server"
    },
    {
      url: "https://recruitment-system-production.up.railway.app",
      description: "Secondary production server for testing"
    },
    {
      url: "https://165.232.131.33",
      description: "Production server"
    }
  ]
};

const options: OAS3Options = {
  swaggerDefinition,
  apis: ["./**/*.routes.ts"]
};

const swaggerSpecs = swaggerJSDoc(options);

export default swaggerSpecs;
