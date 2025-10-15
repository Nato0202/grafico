import { connection } from "../config/db.js";

export async function buscarAgendamentos() {
    const [rows] = await connection.execute('SELECT * FROM agendamentos');
    return rows;
}

export async function inserirAgendamento(data_agendamento, total_agendamentos) {
    const [result] = await connection.execute('INSERT INTO agendamentos (data_agendamento, total_agendamentos) VALUES (?, ?)', [data_agendamento, total_agendamentos]);
    return result.insertId;
}

export async function buscarAgendamentoPorId(id) {
    const [rows] = await connection.execute('SELECT * FROM agendamentos WHERE id = ?', [id]);
    return rows[0];
}

export async function atualizarAgendamento(id, data_agendamento, total_agendamentos) {
    await connection.execute('UPDATE agendamentos SET data_agendamento = ?, total_agendamentos = ? WHERE id = ?', [data_agendamento, total_agendamentos, id]);
}

export async function deletarAgendamento(id) {
    await connection.execute('DELETE FROM agendamentos WHERE id = ?', [id]);
}
