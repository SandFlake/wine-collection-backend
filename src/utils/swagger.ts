import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { wineBottleDocs, winemakerDocs } from "../docs/swaggerDocs";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Wine Collection Management API",
    version: "1.0.0",
    description: "API documentation for managing wine bottles and winemakers",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  tags: [
    { name: 'Wine Bottles', description: 'Operations related to wine bottles' },
    { name: 'Winemakers', description: 'Operations related to winemakers' },
  ],
  paths: { ...wineBottleDocs, ...winemakerDocs },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc({ swaggerDefinition, apis: [] });

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:3000/api-docs");
};
