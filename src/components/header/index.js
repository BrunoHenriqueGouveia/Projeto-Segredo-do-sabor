// Importações necessárias
import './index.scss';
import React from 'react';
import { Link } from 'react-router-dom';  // Para navegação entre páginas
import Logo from '../logo';               // Componente do logo

// Componente Menu - Barra de navegação principal
// Props:
// - produtosReservados: array com produtos no carrinho
const Menu = ({ produtosReservados }) => {
    // Verifica se existem produtos no carrinho
    const possuiProdutos = produtosReservados.length > 0;

    // Handler para clique no link de reservas
    const aoClicarEmReserva = (e) => {
        if (!possuiProdutos) {
            e.preventDefault(); // Impede a navegação se não houver produtos
            alert("Adicione pelo menos um produto ao carrinho antes de acessar a página de reservas!");
        }
    };

    // Renderização do componente
    return (
        <div className="menu">
            {/* Logo da empresa */}
            <Logo />

            {/* Link para página de login */}
            <Link to='/login'>
                <div className="gg-profile" />
                <span className="login">Login</span>
            </Link>

            {/* Link para página de reservas (com validação) */}
            <Link to='/reserva' onClick={aoClicarEmReserva}>
                <div className="group" />
                <span className="reservas">Reservas</span>
            </Link>

            {/* Links para seções da página (navegação interna) */}
            <a href="#nossaMarca" className="nossa-marca">Nossa Marca</a>
            <a href='#produtos' className="produtos">Produtos</a>
            <a href='#contatos' className="contato">Contato</a>
            <a href='#home' className="home">Home</a>
        </div>
    );
};

export default Menu;