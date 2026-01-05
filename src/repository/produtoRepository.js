import connection from './connection.js';

export async function listarProdutos() {
    const comando = `
      SELECT 
        idproduto AS id,
        nome,
        descricao,
        preco,
        quantidade,
        data_criacao AS dataCriacao,
        data_validade AS dataValidade,
        ativo,
        img_Produto AS caminhoImagem
      FROM produto;
    `;
    
    let resp = await connection.query(comando);
    let registros = resp[0];
    
    return registros;
}


export async function listarProdutosDisponiveis() {
  const comando = `
    SELECT 
      idproduto AS id,
      nome,
      descricao,
      preco,
      quantidade,
      data_criacao AS dataCriacao,
      data_validade AS dataValidade,
      ativo,
      img_Produto AS caminhoImagem
    FROM produto
    WHERE quantidade > 0;
  `;
  
  let resp = await connection.query(comando);
  let registros = resp[0];
  
  return registros;
}

export async function listarProdutoPorId(id) {
    const comando = `
      SELECT 
        idproduto AS id,
        nome,
        descricao,
        preco,
        quantidade,
        data_criacao AS dataCriacao,
        data_validade AS dataValidade,
        ativo,
        img_Produto AS caminhoImagem
      FROM produto
      WHERE idproduto = ?;
    `;
    
    let resp = await connection.query(comando, [id]);
    let registro = resp[0][0]; // Retorna apenas o primeiro registro encontrado
    
    return registro;
}



export async function inserirProduto(produto) {
    let comando = `
      INSERT INTO produto (nome, descricao, preco, quantidade, img_Produto) 
      VALUES (?, ?, ?, ?, ?);
    `;
    let [info] = await connection.query(comando, [
      produto.nome,
      produto.descricao,
      produto.preco,
      produto.quantidade,
      produto.caminhoImagem, // Adiciona o caminho da imagem
    ]);
    return info.insertId;
}

export async function alterarProduto(id, produto) {
    let comando = `
      UPDATE produto 
      SET 
        nome = ?, 
        descricao = ?, 
        preco = ?, 
        quantidade = ?, 
        img_Produto = ? 
      WHERE idproduto = ?;
    `;
    let [info] = await connection.query(comando, [
      produto.nome,
      produto.descricao,
      produto.preco,
      produto.quantidade,
      produto.caminhoImagem, // Atualiza o caminho da imagem
      id
    ]);
    return info.affectedRows;
}

export async function removerProduto(id) {
    let comando = `
      DELETE FROM produto 
      WHERE idproduto = ?;
    `;
    let [info] = await connection.query(comando, [id]);
    return info.affectedRows;
}

