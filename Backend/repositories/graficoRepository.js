import { connection } from "../config/db.js";

export async function buscarGraficos() {
    const [rows] = await connection.execute('SELECT * FROM grafico');
    return rows;
}

export async function inserirGrafico(nome, valor) {
    const [result] = await connection.execute('INSERT INTO grafico (nome, valor) VALUES (?, ?)', [nome, valor]);
    return result.insertId;
}

export async function buscarGraficoPorId(id) {
    const [rows] = await connection.execute('SELECT * FROM grafico WHERE id = ?', [id]);
    return rows[0];
}

export async function atualizarGrafico(id, nome, valor) {
    await connection.execute('UPDATE grafico SET nome = ?, valor = ? WHERE id = ?', [nome, valor, id]);
}

export async function deletarGrafico(id) {
    await connection.execute('DELETE FROM grafico WHERE id = ?', [id]);
}

