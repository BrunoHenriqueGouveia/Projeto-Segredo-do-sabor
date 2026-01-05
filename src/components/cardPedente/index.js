// Importações necessárias
import React from "react";
import "./index.scss";

// Componente ReservaCard - Exibe informações de uma reserva pendente
// Props:
// - produtos: array de produtos na reserva
// - local: local de entrega
// - data: data da entrega
// - hora: horário da entrega
// - formaPagamento: método de pagamento escolhido
// - total: valor total da reserva
// - nomeCliente: nome do cliente
// - telefoneCliente: telefone para contato
// - onConfirmar: função chamada ao confirmar reserva
// - onCancelar: função chamada ao cancelar reserva
const ReservaCard = ({ produtos, local, data, hora, formaPagamento, total, nomeCliente, telefoneCliente, onConfirmar, onCancelar }) => {
    return (
        <div className="rectangle">
            {/* Seção de Produtos - Lista todos os produtos da reserva */}
            <div className="produtos">
                {produtos.map((produto, index) => (
                    <div key={index} className="produtoItem">
                        <img
                            className="imgProduto"
                            src={produto.caminhoImagem ? `http://localhost:5015/storage/${produto.caminhoImagem}` : ""}
                            alt={produto.nome || "Produto"}
                        />
                        <span className="nomeProduto">{produto.nome || "Produto não especificado"}</span>
                        <span className="quantidade">{produto.quantidadeReservados || 0} un</span>
                    </div>
                ))}
            </div>

            {/* Seção de Dados da Reserva - Informações gerais e ações */}
            <div className="dadoReserva">
                <span className="local">{local}</span>
                <span className="data">{data}</span>
                <span className="hora">{hora}</span>
                <span className="formaPagamento">{formaPagamento}</span>
                <span className="total">Total R$ {total}</span>

                {/* Botões de ação */}
                <div className="flex-row-f">
                    <button className="confirmar" onClick={onConfirmar}>Confirmar</button>
                    <button className="cancelar" onClick={onCancelar}>Cancelar</button>
                </div>
            </div>

            {/* Seção de Dados do Cliente - Informações para contato */}
            <div className="dadosCliente">
                <span className="nomeCliente">{nomeCliente}</span>
                <span className="telefoneCliente">{telefoneCliente}</span>
            </div>
        </div>
    );
};

export default ReservaCard;