import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import graficoController from "./controller/graficoController.js";
import cursoController from "./controller/cursoController.js";
import agendamentoController from "./controller/agendamentoController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', graficoController);
app.use('/', cursoController);
app.use('/', agendamentoController);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
