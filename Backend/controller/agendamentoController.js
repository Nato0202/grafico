import { Router } from "express";
import * as repo from '../repositories/agendamentoRepository.js';

const endpoints = Router();

endpoints.get('/agendamentos', async (req, res) => {
    try {
        const dados = await repo.buscarAgendamentos();
        res.json(dados);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});

endpoints.post('/agendamentos', async (req, res) => {
    try {
        const { data_agendamento, total_agendamentos } = req.body;
        const id = await repo.inserirAgendamento(data_agendamento, total_agendamentos);
        res.status(201).json({ message: 'Agendamento criado com sucesso', id });
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        res.status(500).json({ error: 'Erro ao criar agendamento' });
    }
});

endpoints.get('/agendamentos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const agendamento = await repo.buscarAgendamentoPorId(id);
        if (agendamento) {
            res.json(agendamento);
        } else {
            res.status(404).json({ error: 'Agendamento não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar agendamento:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamento' });
    }
});

endpoints.put('/agendamentos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data_agendamento, total_agendamentos } = req.body;
        await repo.atualizarAgendamento(id, data_agendamento, total_agendamentos);
        res.json({ message: 'Agendamento atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
});

endpoints.delete('/agendamentos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await repo.deletarAgendamento(id);
        res.json({ message: 'Agendamento deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar agendamento:', error);
        res.status(500).json({ error: 'Erro ao deletar agendamento' });
    }
});

export default endpoints;
