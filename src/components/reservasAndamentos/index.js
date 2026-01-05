// Importações necessárias
import React from "react";
import "./index.scss";
import CardPendente from "../cardPedente";
import axios from "axios";
import { useEffect, useState } from "react";

function Reservas() {
  // Estados para controle de reservas e UI
  const [reservas, setReservas] = useState([]); // Lista de reservas pendentes
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null);     // Mensagens de erro

  // Effect para buscar reservas ao montar componente
  useEffect(() => {
    const buscarReservas = async () => {
      try {
        const response = await axios.get("http://localhost:5015/reserva/pendente");
        setReservas(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError("Erro ao buscar reservas.");
        setLoading(false);
      }
    };

    buscarReservas();
  }, []);

  // Função para confirmar uma reserva
  const confirmarReserva = async (id) => {
    try {
      await axios.put(`http://localhost:5015/reserva/${id}/confirmar`);
      alert("Reserva confirmada com sucesso!");

      // Atualiza a lista de reservas após a confirmação
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
    } catch (err) {
      console.error("Erro ao confirmar reserva:", err);
      alert("Erro ao confirmar a reserva.");
    }
  };

  // Função para cancelar uma reserva
  const cancelarReserva = async (id, produtos) => {
    try {
      await axios.put(`http://localhost:5015/reserva/${id}/cancelar`, { produtos });
      alert("Reserva cancelada com sucesso!");

      // Atualiza a lista de reservas após o cancelamento
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
    } catch (err) {
      console.error("Erro ao cancelar reserva:", err);
      alert("Erro ao cancelar a reserva.");
    }
  };

  // Renderização condicional para estados de loading e erro
  if (loading) return <p>Carregando reservas...</p>;
  if (error) return <p>{error}</p>;

  // Renderização principal do componente
  return (
    <div className="main-container">
      {/* Título da seção */}
      <span className="reservas-1"> Reservas</span>

      {/* Cabeçalho com ícone */}
      <div className="flex-row-b">
        <div className="tabler-bell-heart" />
        <span className="reservas-em-andamento">Reservas em andamento</span>
      </div>

      {/* Lista de reservas */}
      {reservas.map((reserva) => {
        // Formata a data para o formato brasileiro (DD/MM/AAAA)
        const data = new Date(reserva.dataEntrega + 'T00:00:00');
        const dataFormatada = data.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: 'America/Sao_Paulo' // Define explicitamente o timezone
        });
        
        // Combina os dados de produtosReservados com qtdReserva
        const produtosComQuantidade = reserva.produtos?.produtosReservados.map((produto) => {
          const quantidadeReservados = reserva.qtdReserva.find((qtd) => qtd.id === produto.id)?.quantidade || 0;
          return { ...produto, quantidadeReservados }; // Adiciona a quantidade ao produto
        });

        // Renderiza card para cada reserva
        return (
          <CardPendente
            key={reserva.id}
            produtos={produtosComQuantidade || []} // Passa os produtos combinados
            local={reserva.pontoEntrega || "Local não especificado"}
            data={dataFormatada || "Data não especificada"} // Usa a data formatada
            hora={reserva.horaEntrega || "Hora não especificada"}
            formaPagamento={reserva.pagamento || "Forma de pagamento não especificada"}
            total={reserva.valorTotal || 0}
            nomeCliente={reserva.nomeCliente || "Cliente não especificado"}
            telefoneCliente={reserva.telefoneCliente || "Telefone não especificado"}
            onConfirmar={() => confirmarReserva(reserva.id)}
            onCancelar={() => cancelarReserva(reserva.id, produtosComQuantidade)}
          />
        );
      })}
    </div>
  );
}

export default Reservas;