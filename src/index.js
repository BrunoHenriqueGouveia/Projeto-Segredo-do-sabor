// Importações necessárias do React e React Router
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importações dos estilos do carrossel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';

// Importações das páginas da aplicação
import Home from './pages/home';
import NotFound from './pages/notfound';
import Reserva from './pages/reserva';
import Login from './pages/login';
import ReservaFinalizada from './pages/reservaFinalizada';
import Gerenciamento from './pages/gerenciamentos';

// Criação do root da aplicação
const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
    // Estado para controlar os produtos que foram reservados
    const [produtosReservados, setProdutosReservados] = useState([]);

    // Função que adiciona um novo produto à lista de reservas
    // É chamada quando usuário clica em "Reservar" na página Home
    const adicionarProdutoNaReserva = (produto) => {
        setProdutosReservados((prevProdutos) => [...prevProdutos, produto]);
    };

    // Função que remove um produto específico da lista de reservas
    // É chamada quando usuário clica em "Excluir" na página de Reserva
    const excluirProduto = (id) => {
        const novosProdutos = produtosReservados.filter((produto) => produto.id !== id);
        setProdutosReservados(novosProdutos);
    };

    // Função que limpa toda a lista de produtos reservados
    // É chamada após finalizar uma reserva com sucesso
    const limparProdutosReservados = () => setProdutosReservados([]);

    return (
        // Configuração das rotas da aplicação usando React Router
        <BrowserRouter>
            <Routes>
                {/* Rota da página inicial */}
                <Route
                    path="/"
                    element={<Home 
                        onReservar={adicionarProdutoNaReserva} 
                        produtosReservados={produtosReservados} 
                    />}
                />
                {/* Rota da página de reserva */}
                <Route
                    path="/reserva"
                    element={<Reserva 
                        produtosReservados={produtosReservados} 
                        excluirProduto={excluirProduto}
                        limparProdutosReservados={limparProdutosReservados} 
                    />}
                />
                {/* Outras rotas da aplicação */}
                <Route path="/login" element={<Login />} />
                <Route path="/reservaFinalizada" element={<ReservaFinalizada />} />
                <Route path="/gerenciamentos" element={<Gerenciamento />} />
                <Route path="*" element={<NotFound />} /> {/* Rota para páginas não encontradas */}
            </Routes>
        </BrowserRouter>
    );
}

// Renderização do App com StrictMode para destacar possíveis problemas
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);