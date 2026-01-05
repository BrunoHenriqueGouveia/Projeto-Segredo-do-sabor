import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'localhost',
  database: 'segredodosabor',
  user: 'root',
  password: 'p@$$w0rd'
})

console.log('Conexão com banco realizada!');
export default connection;