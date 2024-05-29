import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express"
import { Router } from "express";

const swaggerRoutes = Router();

const swaggerOptions = {
    definition: {
        openapi:"3.0.1",
        info: {
            title: "Docuemtación API Eidolon",
            description: "Documentación de API Eidolon para uso de Swagger"
        }
    },
    apis: [`./src/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
swaggerRoutes.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

export default swaggerRoutes