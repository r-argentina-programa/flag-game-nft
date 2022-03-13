import {config} from "dotenv";
import express from "express";
import http from "http";
import {setupIo} from "./service/io.js";
import {setupRoutes} from "./controller/roundController.js";

config();

const app = express();
app.use(express.json());

setupRoutes(app);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Listening on port ${PORT}....`));
setupIo(server);
