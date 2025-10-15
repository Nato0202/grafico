import { Router } from "express";
import * as repo from '../repositories/cursoRepository.js';

const endpoints = Router();

endpoints.get('/cursos', async (req, res) => {
    try {
        const dados = await repo.buscarCursos();
        res.json(dados);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
});

endpoints.post('/cursos', async (req, res) => {
    try {
        const { course_name, period_name, total_inscritos } = req.body;
        const id = await repo.inserirCurso(course_name, period_name, total_inscritos);
        res.status(201).json({ message: 'Curso criado com sucesso', id });
    } catch (error) {
        console.error('Erro ao criar curso:', error);
        res.status(500).json({ error: 'Erro ao criar curso' });
    }
});

endpoints.get('/cursos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await repo.buscarCursoPorId(id);
        if (curso) {
            res.json(curso);
        } else {
            res.status(404).json({ error: 'Curso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar curso:', error);
        res.status(500).json({ error: 'Erro ao buscar curso' });
    }
});

endpoints.put('/cursos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { course_name, period_name, total_inscritos } = req.body;
        await repo.atualizarCurso(id, course_name, period_name, total_inscritos);
        res.json({ message: 'Curso atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
});

endpoints.delete('/cursos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await repo.deletarCurso(id);
        res.json({ message: 'Curso deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar curso:', error);
        res.status(500).json({ error: 'Erro ao deletar curso' });
    }
});

export default endpoints;
