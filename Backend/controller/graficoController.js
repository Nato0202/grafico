import { Router } from "express";
import * as repo from '../repositories/graficoRepository.js';

const endpoints = Router();

endpoints.get('/grafico', async (req, res) => {
    try {
        const dados = await repo.buscarGraficos();
        res.json(dados);
    } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do gráfico' });
    }
});

endpoints.post('/grafico', async (req, res) => {
    try {
        const { nome, valor } = req.body;
        const id = await repo.inserirGrafico(nome, valor);
        res.status(201).json({ message: 'Gráfico criado com sucesso', id });
    } catch (error) {
        console.error('Erro ao criar gráfico:', error);
        res.status(500).json({ error: 'Erro ao criar gráfico' });
    }
});

endpoints.get('/grafico/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const grafico = await repo.buscarGraficoPorId(id);
        if (grafico) {
            res.json(grafico);
        } else {
            res.status(404).json({ error: 'Gráfico não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar gráfico:', error);
        res.status(500).json({ error: 'Erro ao buscar gráfico' });
    }
});

endpoints.put('/grafico/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, valor } = req.body;
        await repo.atualizarGrafico(id, nome, valor);
        res.json({ message: 'Gráfico atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar gráfico:', error);
        res.status(500).json({ error: 'Erro ao atualizar gráfico' });
    }
});

endpoints.delete('/grafico/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await repo.deletarGrafico(id);
        res.json({ message: 'Gráfico deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar gráfico:', error);
        res.status(500).json({ error: 'Erro ao deletar gráfico' });
    }
});

export default endpoints;
