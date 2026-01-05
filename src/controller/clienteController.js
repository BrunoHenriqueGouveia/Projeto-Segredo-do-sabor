import { listar, inserir, alterar, remover, buscarPorEmailTelefone, inserirCliente } from '../repository/clienteRepository.js'

import { Router } from "express";
const endpoints = Router();


endpoints.get('/cliente/listar', async (req, resp) => {
  let registros = await listar();
  resp.send(registros);
});

endpoints.post("/cliente/inserir", async (req, resp) => {
  const cliente = req.body;
  let id = await inserir(cliente);
  resp.send({ id });
});


endpoints.put("/cliente/:id", async (req, resp) => {
  let id = req.params.id;
  const cliente = req.body;

  let linhasAfetadas = await alterar(id, cliente);

  if (linhasAfetadas == 0) {
    resp.status(404).end();
  } else {
    resp.end();
  }
});

endpoints.delete("/cliente/:id", async (req, resp) => {
  let id = req.params.id;

  let linhasAfetadas = await remover(id);

  if (linhasAfetadas == 0) {
    resp.status(404).end();
  } else {
    resp.end();
  }
});


endpoints.post('/cliente/verificar', async (req, resp) => {
  const { nome, email, telefone } = req.body;

  try {
    let cliente = await buscarPorEmailTelefone(email, telefone);

    if (!cliente) {
      const idcliente = await inserirCliente(nome, email, telefone);
      cliente = { id: idcliente, nome, email, telefone };
    }

    resp.send(cliente);
  } catch (error) {
    console.error(error);
    resp.status(500).send({ erro: "Erro ao verificar/criar cliente" });
  }
});


export default endpoints;






