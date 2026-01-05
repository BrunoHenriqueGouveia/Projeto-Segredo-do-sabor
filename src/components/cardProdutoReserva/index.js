// Importações necessárias
import React, { useState, useEffect } from "react";
import "./index.scss";

// Componente ProdutoCard - Exibe e gerencia um produto na reserva
// Props:
// - id: identificador único do produto
// - imagem: caminho da imagem do produto
// - nomeProduto: nome do produto
// - quantidadeUsuario: quantidade inicial selecionada
// - preco: preço unitário do produto
// - qtdEstoque: quantidade disponível em estoque
// - onExcluir: callback para remover o produto
// - onAtualizarTotal: callback para atualizar valor total
// - onAtualizarQuantidade: callback para atualizar quantidade
function ProdutoCard({ id, imagem, nomeProduto, quantidadeUsuario, preco, qtdEstoque, onExcluir, onAtualizarTotal, onAtualizarQuantidade }) {
  // Estado local para controlar a quantidade do produto
  const [quantidade, setQuantidade] = useState(quantidadeUsuario);

  // Effect para atualizar totais quando quantidade ou preço mudam
  useEffect(() => {
    const totalProduto = parseFloat(preco) * quantidade;
    onAtualizarTotal(id, totalProduto); // Atualiza o total no componente pai
    onAtualizarQuantidade(id, quantidade); // Atualiza a quantidade no componente pai
  }, [quantidade, preco, id]); // Remova `onAtualizarTotal` do array de dependências

  // Função para aumentar a quantidade, respeitando limite do estoque
  const aumentarQuantidade = () => {
    if (quantidade < qtdEstoque) {
      setQuantidade(quantidade + 1);
    } else {
      alert("Quantidade máxima atingida com base no estoque disponível!");
    }
  };

  // Função para diminuir a quantidade, mínimo de 1
  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  // Renderização do componente
  return (
    <div className="rectangle-1">
      {/* Imagem do produto */}
      <img className="img" src={imagem} alt={nomeProduto} />

      {/* Nome do produto */}
      <span className="nomeProduto">{nomeProduto}</span>

      {/* Controles de quantidade */}
      <div className="rectangle-2">
        <button className="fluent-subtract-regular" onClick={diminuirQuantidade}></button>
        <span className="text-a">{quantidade}</span>
        <button className="mdi-plus" onClick={aumentarQuantidade}></button>
      </div>

      {/* Preço unitário */}
      <div className="precoUnidade">
        <span className="r-dollar">R$</span>
        <span className="valorUnitario">{preco}</span>
        <span className="space-slash"> /</span>
        <span className="unit">un</span>
      </div>

      {/* Total do produto (quantidade * preço) */}
      <div className="totalDaqueleProduto">
        <span className="r">R$</span>
        <span className="nbsp">{(parseFloat(preco) * quantidade).toFixed(2)}</span>
      </div>

      {/* Botão para remover produto da reserva */}
      <button className="botao-excluir" onClick={() => onExcluir(id)}>
        Excluir
      </button>
    </div>
  );
}

export default ProdutoCard;