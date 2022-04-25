import express from "express";
import cors from "cors";
import morgan from "morgan";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";
const specs = swaggerJSDoc(options);

import userRoutes from "./routes/users";
import projectRoutes from "./routes/projects"
import contributionRoutes from "./routes/contribution"

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
app.use(projectRoutes);
app.use(contributionRoutes);
   
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
//app.get("/prueba", (req, res) => {
//    res.status(200).send("hola")
//})


export default app;
