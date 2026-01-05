import { listarReservas, inserirReserva, alterarReserva, removerReserva,atualizarQuantidadeProdutos,listarReservasPendentes,confirmarReserva,cancelarReserva,listarReservasPorStatus} from '../repository/reservaRepository.js'

import { Router } from "express";
const endpoints = Router();

endpoints.get('/reserva/listar', async (req, resp) => {
  let registros = await listarReservas();
  resp.send(registros);
});



endpoints.post("/reserva/inserir", async (req, resp) => {
  const reserva = req.body;

  // Atualiza a quantidade de produtos no estoque
  await atualizarQuantidadeProdutos(reserva.produtosComQuantidade);

  let id = await inserirReserva(reserva);
  resp.send({ id });
});

endpoints.put("/reserva/:id", async (req, resp) => {
  let id = req.params.id;
  const reserva = req.body;

  let linhasAfetadas = await alterarReserva(id, reserva);

  if (linhasAfetadas == 0) {
    resp.status(404).end();
  } else {
    resp.end();
  }
});

endpoints.delete("/reserva/:id", async (req, resp) => {
  let id = req.params.id;

  let linhasAfetadas = await removerReserva(id);

  if (linhasAfetadas == 0) {
    resp.status(404).end();
  } else {
    resp.end();
  }
});


endpoints.get('/reserva/pendente', async (req, resp) => {
  try {
      let reservasPendentes = await listarReservasPendentes(); // Chama a função do repositório
      resp.send(reservasPendentes);
  } catch (err) {
      console.error("Erro ao listar reservas pendentes:", err);
      resp.status(500).send({ erro: "Erro ao listar reservas pendentes" });
  }
});

endpoints.put('/reserva/:id/confirmar', async (req, resp) => {
  try {
      const id = req.params.id;

      const linhasAfetadas = await confirmarReserva(id);

      if (linhasAfetadas === 0) {
          return resp.status(404).send({ erro: "Reserva não encontrada ou já confirmada." });
      }

      resp.status(200).send({ mensagem: "Reserva confirmada com sucesso!" });
  } catch (err) {
      console.error("Erro ao confirmar reserva:", err);
      resp.status(500).send({ erro: "Erro ao confirmar reserva." });
  }
});

endpoints.put('/reserva/:id/cancelar', async (req, resp) => {
  try {
      const id = req.params.id;
      const { produtos } = req.body; // Recebe os produtos da requisição

      if (!Array.isArray(produtos)) {
          return resp.status(400).send({ erro: "O campo 'produtos' deve ser um array." });
      }

      await cancelarReserva(id, produtos);

      resp.status(200).send({ mensagem: "Reserva cancelada e produtos devolvidos ao estoque com sucesso!" });
  } catch (err) {
      console.error("Erro ao cancelar reserva:", err);
      resp.status(500).send({ erro: "Erro ao cancelar reserva." });
  }
});

endpoints.get('/reserva/cancelados', async (req, resp) => {
  try {
    const reservas = await listarReservasPorStatus('Cancelado');
    resp.send(reservas);
  } catch (err) {
    resp.status(500).send({ erro: "Erro ao listar reservas canceladas" });
  }
});

endpoints.get('/reserva/concluidos', async (req, resp) => {
  try {
    const reservas = await listarReservasPorStatus('Confirmado');
    resp.send(reservas);
  } catch (err) {
    resp.status(500).send({ erro: "Erro ao listar reservas concluídas" });
  }
});

endpoints.get('/reserva/pendentes', async (req, resp) => {
  try {
    const reservas = await listarReservasPorStatus('Pendente');
    resp.send(reservas);
  } catch (err) {
    resp.status(500).send({ erro: "Erro ao listar reservas pendentes" });
  }
});

export default endpoints;

