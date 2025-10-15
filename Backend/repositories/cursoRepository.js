import { connection } from "../config/db.js";

export async function buscarCursos() {
    const [rows] = await connection.execute('SELECT * FROM cursos');
    return rows;
}

export async function inserirCurso(course_name, period_name, total_inscritos) {
    const [result] = await connection.execute('INSERT INTO cursos (course_name, period_name, total_inscritos) VALUES (?, ?, ?)', [course_name, period_name, total_inscritos]);
    return result.insertId;
}

export async function buscarCursoPorId(id) {
    const [rows] = await connection.execute('SELECT * FROM cursos WHERE id = ?', [id]);
    return rows[0];
}

export async function atualizarCurso(id, course_name, period_name, total_inscritos) {
    await connection.execute('UPDATE cursos SET course_name = ?, period_name = ?, total_inscritos = ? WHERE id = ?', [course_name, period_name, total_inscritos, id]);
}

export async function deletarCurso(id) {
    await connection.execute('DELETE FROM cursos WHERE id = ?', [id]);
}
