// Importações necessárias
import React from 'react';
import './index.scss';

// Componente Card - Exibe informações de um produto
// Props:
// - imgSrc: caminho da imagem do produto
// - descricao: descrição do produto
// - valor: preço do produto
// - nomeProduto: nome do produto
// - onReservar: função chamada ao clicar em "Reservar"
const Card = ({ imgSrc, descricao, valor, nomeProduto, onReservar }) => {
    // Função executada ao clicar no botão de reserva
    // Mostra alerta e chama função recebida via props
    const aoReservar = () => {
        alert(`${nomeProduto} foi adicionado ao carrinho de reserva!`);
        onReservar(); // Chama a função passada como prop para adicionar o produto
    };

    // Renderiza o card com as informações do produto
    return (
        <div className="card">
            <div className="img">
                <img src={imgSrc} alt={nomeProduto} />
            </div>
            <div className="nome-produto">{nomeProduto}</div>
            <div className="descricao">{descricao}</div>
            <div className="valor">{valor}</div>
            <button onClick={aoReservar} className="botao-reserva">Reservar</button>
        </div>
    );
};

export default Card;