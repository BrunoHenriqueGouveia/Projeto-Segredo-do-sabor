import connection from './connection.js';


export async function autenticarLogin(email, senha) {
    const comando = `
        SELECT idlogin AS id, email
        FROM login
        WHERE email = ? AND senha = ?;
    `;
    const [registros] = await connection.query(comando, [email, senha]);
    return registros.length ? registros[0] : null;
}