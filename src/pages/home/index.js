// Importações de estilos e componentes do React Router
import './index.scss'
import { Link } from 'react-router-dom'
import React from "react";

// Importações dos componentes da página
import Header from "../../components/header";          // Cabeçalho da página
import Queridinhos from "../../components/queridinhos"; // Seção de produtos mais vendidos
import NossaMarca from "../../components/nossaMarca";   // Seção sobre a marca
import Foter from '../../components/footer';            // Rodapé da página
import Produtos from '../../components/produtos'         // Lista de produtos disponíveis

// Componente principal da página Home
// Recebe como props:
// - onReservar: função chamada quando um produto é reservado
// - produtosReservados: array com os produtos já reservados
export default function Home({ onReservar, produtosReservados }) {
  return (
    <div className="pagina-home">
      <div className="flex-column">
        {/* Header recebe produtosReservados para mostrar quantidade no carrinho */}
        <Header produtosReservados={produtosReservados} />
        
        {/* Componentes que formam as diferentes seções da página */}
        <Queridinhos />     {/* Mostra os produtos mais populares */}
        <NossaMarca />      {/* Seção com informações sobre a marca */}
        <Produtos onReservar={onReservar}/> {/* Lista de produtos com botão de reserva */}
        <Foter />           {/* Rodapé com informações de contato */}
      </div>
    </div>
  );
}