// Importações necessárias
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";

// Componente FiltroReservas - Exibe e filtra reservas por status
function FiltroReservas() {
  // Estados para gerenciar as reservas e filtros
  const [reservas, setReservas] = useState([]); // Lista de reservas
  const [statusSelecionado, setStatusSelecionado] = useState("Todos"); // Status atual do filtro

  // Função para buscar reservas conforme o status selecionado
  const buscarReservas = async (status) => {
    let url = "http://localhost:5015/reserva/listar";
    if (status === "Pendente") url = "http://localhost:5015/reserva/pendentes";
    if (status === "Concluido") url = "http://localhost:5015/reserva/concluidos";
    if (status === "Cancelado") url = "http://localhost:5015/reserva/cancelados";
    try {
      const response = await axios.get(url);
      setReservas(response.data);
    } catch (err) {
      alert("Erro ao buscar reservas.");
    }
  };

  // Effect para buscar reservas ao iniciar e quando mudar o status
  useEffect(() => {
    buscarReservas(statusSelecionado);
  }, [statusSelecionado]);

  // Renderização do componente
  return (
    <div className="filtro-reservas">
      {/* Botões de filtro por status */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button className="botao" onClick={() => setStatusSelecionado("Todos")}>Todos</button>
        <button className="botao" onClick={() => setStatusSelecionado("Pendente")}>Pendentes</button>
        <button className="botao" onClick={() => setStatusSelecionado("Concluido")}>Concluídos</button>
        <button className="botao" onClick={() => setStatusSelecionado("Cancelado")}>Cancelados</button>
      </div>

      {/* Tabela de reservas */}
      <table border="1" cellPadding="8">
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Data Entrega</th>
            <th>Hora</th>
            <th>Ponto Entrega</th>
            <th>Status</th>
            <th>Pagamento</th>
            <th>Produtos</th>
          </tr>
        </thead>
        {/* Corpo da tabela - Lista as reservas */}
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.dataEntrega}</td>
              <td>{reserva.horaEntrega}</td>
              <td>{reserva.pontoEntrega}</td>
              <td>{reserva.status}</td>
              <td>{reserva.pagamento}</td>
              {/* Lista os produtos de cada reserva */}
              <td>
                {reserva.produtos?.produtosReservados?.map((p) => {
                  // Encontra a quantidade correspondente ao produto atual
                  const quantidadeReservada = reserva.qtdReserva?.find(q => q.id === p.id)?.quantidade || 0;

                  return (
                    <div key={p.id}>
                      {p.nome} ({quantidadeReservada} un)
                    </div>
                  );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FiltroReservas;