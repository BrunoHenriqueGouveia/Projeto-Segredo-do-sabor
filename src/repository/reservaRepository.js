import connection from './connection.js';

export async function listarReservas() {
    const comando = `
      SELECT 
        idreserva AS id,
        data_entrega AS dataEntrega,
        hora_entrega AS horaEntrega,
        ponto_entrega AS pontoEntrega,
        valor_total AS valorTotal,
        status,
        pagamento,
        produtos,
        qtdReserva,
        turno,
        idcliente_fk AS idCliente
      FROM reserva;
    `;
    
    let resp = await connection.query(comando);
    let registros = resp[0];
    
    return registros;
}

export async function inserirReserva(reserva) {
    let comando = `
      INSERT INTO reserva (
        data_entrega, 
        hora_entrega, 
        ponto_entrega,
        turno, 
        valor_total, 
        status, 
        pagamento,
        produtos, 
        qtdReserva,
        idcliente_fk
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?);
    `;
    
    let [info] = await connection.query(comando, [
      reserva.data,
      reserva.horario,
      reserva.pontoEntrega,
      reserva.turno,
      reserva.totalGeral,
      reserva.status,
      reserva.pagamento,
      JSON.stringify(reserva.produtos), // Transformar o array de produtos em JSON
      JSON.stringify(reserva.produtosComQuantidade),
      reserva.clienteId
    ]);
    return info.insertId;
}

export async function atualizarQuantidadeProdutos(produtos) {
  for (const produto of produtos) {
      const comando = `
          UPDATE produto
          SET quantidade = quantidade - ?
          WHERE idproduto = ? AND quantidade >= ?;
      `;

      const [info] = await connection.query(comando, [
          produto.quantidade, // Quantidade a ser subtraída
          produto.id,         // ID do produto
          produto.quantidade  // Verifica se há estoque suficiente
      ]);

      if (info.affectedRows === 0) {
          throw new Error(`Estoque insuficiente para o produto com ID ${produto.id}`);
      }
  }
}

export async function alterarReserva(id, reserva) {
    let comando = `
      UPDATE reserva 
      SET 
        data_entrega = ?, 
        hora_entrega = ?, 
        ponto_entrega = ?, 
        valor_total = ?, 
        status = ?, 
        pagamento = ?,
        produtos = ?, 
        idcliente_fk = ? 
      WHERE idreserva = ?;
    `;
    
    let [info] = await connection.query(comando, [
      reserva.dataEntrega,
      reserva.horaEntrega,
      reserva.pontoEntrega,
      reserva.valorTotal,
      reserva.status,
      reserva.pagamento,
      JSON.stringify(reserva.produtos), // Transformar o array de produtos em JSON
      reserva.clienteId,
      id
    ]);
    
    return info.affectedRows;
}

export async function removerReserva(id) {
    let comando = `
      DELETE FROM reserva 
      WHERE idreserva = ?;
    `;
    
    let [info] = await connection.query(comando, [id]);
    
    return info.affectedRows;
}


export async function listarReservasPendentes() {
  const comando = `
      SELECT 
          r.idreserva AS id,
          r.data_entrega AS dataEntrega,
          r.hora_entrega AS horaEntrega,
          r.ponto_entrega AS pontoEntrega,
          r.valor_total AS valorTotal,
          r.status,
          r.pagamento,
          r.produtos,
          r.qtdReserva,
          r.turno,
          r.idcliente_fk AS idCliente,
          c.nome AS nomeCliente, 
          c.telefone AS telefoneCliente
      FROM reserva r
      INNER JOIN cliente c ON r.idcliente_fk = c.idcliente
      WHERE r.status = 'Pendente';
  `;
  
  let resp = await connection.query(comando);
  let registros = resp[0];
  
  return registros;
}

export async function confirmarReserva(id) {
  const comando = `
      UPDATE reserva
      SET status = 'Confirmado'
      WHERE idreserva = ? AND status = 'Pendente';
  `;

  const [info] = await connection.query(comando, [id]);
  return info.affectedRows; // Retorna o número de linhas afetadas
}


export async function cancelarReserva(id, produtos) {
  try {
      // Inicia uma transação
      await connection.beginTransaction();

      // Atualiza o status da reserva para "Cancelado"
      const comandoReserva = `
          UPDATE reserva
          SET status = 'Cancelado'
          WHERE idreserva = ? AND status = 'Pendente';
      `;
      const [infoReserva] = await connection.query(comandoReserva, [id]);

      if (infoReserva.affectedRows === 0) {
          throw new Error(`Reserva com ID ${id} não encontrada ou já foi processada.`);
      }

      // Devolve os produtos ao estoque
      for (const produto of produtos) {
          const comandoProduto = `
              UPDATE produto
              SET quantidade = quantidade + ?
              WHERE idproduto = ?;
          `;
          await connection.query(comandoProduto, [produto.quantidadeReservados, produto.id]);
      }

      // Confirma a transação
      await connection.commit();
      return true;
  } catch (err) {
      // Reverte a transação em caso de erro
      await connection.rollback();
      throw err;
  }
}


export async function listarReservasPorStatus(status) {
  const comando = `
    SELECT 
      r.idreserva AS id,
      r.data_entrega AS dataEntrega,
      r.hora_entrega AS horaEntrega,
      r.ponto_entrega AS pontoEntrega,
      r.valor_total AS valorTotal,
      r.status,
      r.pagamento,
      r.produtos,
      r.qtdReserva,
      r.turno,
      r.idcliente_fk AS idCliente,
      c.nome AS nomeCliente, 
      c.telefone AS telefoneCliente
    FROM reserva r
    INNER JOIN cliente c ON r.idcliente_fk = c.idcliente
    WHERE r.status = ?;
  `;
  let resp = await connection.query(comando, [status]);
  return resp[0];
}