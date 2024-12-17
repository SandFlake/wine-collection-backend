/**
 * Swagger documentation for wine bottle routes.
 */
export const wineBottleDocs = {
  "/bottles": {
    get: {
      tags: ["Wine Bottles"],
      summary: "Retrieve all wine bottles",
      description: `
          Retrieve a list of all wine bottles with optional filters.
          Filters can be applied using query parameters such as winemaker, style, year, taste, name, and count range.
        `,
      parameters: [
        {
          in: "query",
          name: "winemakerId",
          schema: { type: "string" },
          description: "Filter by the ID of the winemaker.",
          example: "60d9f1e3b5b4b5105c1e9e8c",
        },
        {
          in: "query",
          name: "style",
          schema: { type: "string" },
          description:
            "Filter by wine style (case-insensitive, e.g., dry, sweet).",
          example: "Dry",
        },
        {
          in: "query",
          name: "year",
          schema: { type: "string" },
          description: `
              Filter by year or year range. 
              For a range, provide values as 'gte:YYYY' or 'lte:YYYY'.
            `,
          example: "2020",
        },
        {
          in: "query",
          name: "taste",
          schema: { type: "string" },
          description: `
              Filter by taste notes. Provide a comma-separated list of taste values.
              Example: "Plum,Tobacco,Oak".
            `,
          example: "Plum,Tobacco",
        },
        {
          in: "query",
          name: "name",
          schema: { type: "string" },
          description: "Filter by the wine name (case-insensitive).",
          example: "Cabernet Sauvignon",
        },
        {
          in: "query",
          name: "minCount",
          schema: { type: "number" },
          description: "Minimum count of wine bottles in the cellar.",
          example: 5,
        },
        {
          in: "query",
          name: "maxCount",
          schema: { type: "number" },
          description: "Maximum count of wine bottles in the cellar.",
          example: 20,
        },
      ],
      responses: {
        200: {
          description: "A list of wine bottles matching the filters.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      description: "The ID of the wine bottle.",
                    },
                    name: {
                      type: "string",
                      description: "The name of the wine bottle.",
                    },
                    year: {
                      type: "number",
                      description: "The year of production.",
                    },
                    size: {
                      type: "string",
                      description: "The size of the wine bottle.",
                    },
                    countInCellar: {
                      type: "number",
                      description: "Number of bottles in the cellar.",
                    },
                    style: {
                      type: "string",
                      description: "The style of the wine (e.g., dry, sweet).",
                    },
                    taste: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "A list of taste notes (e.g., Plum, Tobacco).",
                    },
                    description: {
                      type: "string",
                      description: "A detailed description of the wine.",
                    },
                    foodPairing: {
                      type: "string",
                      description: "Food pairing suggestions.",
                    },
                    link: {
                      type: "string",
                      description: "Public link to the wine image or details.",
                    },
                    image: {
                      type: "string",
                      description: "File path of the wine bottle image.",
                    },
                    winemakerId: {
                      type: "string",
                      description: "The ID of the associated winemaker.",
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "No wine bottles found matching the filters.",
        },
        400: {
          description: "Invalid query parameters.",
        },
      },
    },
    post: {
      tags: ["Wine Bottles"],
      summary: "Add a new wine bottle",
      description:
        "Add a new wine bottle to the collection with all relevant details.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "year", "size", "style", "winemakerId"],
              properties: {
                name: { type: "string", example: "Cabernet Sauvignon" },
                year: { type: "number", example: 2020 },
                size: { type: "string", example: "750ml" },
                style: { type: "string", example: "Dry" },
                winemakerId: {
                  type: "string",
                  example: "60d9f1e3b5b4b5105c1e9e8c",
                },
                countInCellar: { type: "number", example: 10 },
                description: {
                  type: "string",
                  example: "A full-bodied red wine.",
                },
                taste: {
                  type: "array",
                  items: { type: "string" },
                  example: ["Plum", "Oak"],
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Wine bottle created successfully." },
        400: { description: "Invalid input data." },
      },
    },
  },
  "/bottles/{id}": {
    get: {
      tags: ["Wine Bottles"],
      summary: "Get a wine bottle by ID",
      description: "Retrieve a single wine bottle by its ID.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "The wine bottle ID.",
        },
      ],
      responses: {
        200: { description: "A wine bottle object." },
        404: { description: "Wine bottle not found." },
      },
    },
    put: {
      tags: ["Wine Bottles"],
      summary: "Update a wine bottle",
      description: "Update an existing wine bottle by its ID.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "The wine bottle ID.",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Merlot" },
                year: { type: "number", example: 2018 },
                size: { type: "string", example: "750ml" },
                style: { type: "string", example: "Sweet" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Wine bottle updated successfully." },
        404: { description: "Wine bottle not found." },
        400: { description: "Invalid input data." },
      },
    },
    delete: {
      tags: ["Wine Bottles"],
      summary: "Delete a wine bottle",
      description: "Delete a wine bottle from the collection.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "The wine bottle ID.",
        },
      ],
      responses: {
        204: { description: "Wine bottle deleted successfully." },
        404: { description: "Wine bottle not found." },
      },
    },
  },
};

export const winemakerDocs = {
  "/winemakers": {
    get: {
      tags: ["Winemakers"],
      summary: "Retrieve all winemakers",
      description: "Retrieve a list of all winemakers.",
      responses: {
        200: { description: "A list of winemakers." },
        404: { description: "No winemakers found." },
      },
    },
    post: {
      tags: ["Winemakers"],
      summary: "Add a new winemaker",
      description: "Add a new winemaker with details like name and address.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "address"],
              properties: {
                name: {
                  type: "string",
                  description: "The name of the winemaker.",
                  example: "John Doe Winery",
                },
                address: {
                  type: "string",
                  description: "The address of the winemaker.",
                  example: "123 Vineyard Lane, Napa Valley, CA",
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Winemaker created successfully." },
        400: { description: "Invalid input data." },
      },
    },
  },
  "/winemakers/{id}": {
    get: {
      tags: ["Winemakers"],
      summary: "Get a winemaker by ID",
      description: "Retrieve a single winemaker by its ID.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "The winemaker ID.",
        },
      ],
      responses: {
        200: { description: "A winemaker object." },
        404: { description: "Winemaker not found." },
      },
    },
    put: {
      tags: ["Winemakers"],
      summary: "Update a winemaker",
      description: "Update an existing winemaker's details by ID.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "The winemaker ID.",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "The updated name of the winemaker.",
                  example: "Updated John Doe Winery",
                },
                address: {
                  type: "string",
                  description: "The updated address of the winemaker.",
                  example: "456 New Vineyard Lane, Napa Valley, CA",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Winemaker updated successfully." },
        404: { description: "Winemaker not found." },
        400: { description: "Invalid input data." },
      },
    },
    delete: {
      tags: ["Winemakers"],
      summary: "Delete a winemaker",
      description: "Delete a winemaker from the collection by its ID.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "The winemaker ID.",
        },
      ],
      responses: {
        204: { description: "Winemaker deleted successfully (no content)." },
        404: { description: "Winemaker not found." },
      },
    },
  },
};
