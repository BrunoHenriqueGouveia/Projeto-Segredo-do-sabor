// Importações necessárias
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';  // Biblioteca para criar o carrossel
import axios from 'axios';         // Cliente HTTP para requisições
import Card from '../card';        // Componente de card de produto
import './index.scss';

// Componente Carrossel - Exibe produtos em um slider
// Props:
// - onReservar: função chamada quando um produto é reservado
const Carrossel = ({ onReservar }) => {
    // Estado para armazenar a lista de produtos
    const [produtos, setProdutos] = useState([]);

    // Configurações do carrossel
    const configuracoes = {
        dots: true,              // Mostra pontos de navegação
        infinite: true,          // Permite scroll infinito
        speed: 500,             // Velocidade da animação
        slidesToShow: 4,        // Quantidade de slides visíveis
        slidesToScroll: 1,      // Quantidade de slides por scroll
        // Configurações responsivas
        responsive: [
            {
                breakpoint: 1024,  // Telas até 1024px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,   // Telas até 600px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Função para buscar os dados do backend
    const buscarProdutos = async () => {
        try {
            const resposta = await axios.get('http://localhost:5015/produto'); 
            setProdutos(resposta.data);
        } catch (erro) {
            console.error('Erro ao buscar os produtos:', erro);
        }
    };

    // useEffect para buscar os dados ao carregar o componente
    useEffect(() => {
        buscarProdutos();
    }, []);

    // Renderização do componente
    return (
        <div className="carrosel">
            <Slider {...configuracoes}>
                {/* Mapeia os produtos para cards dentro do carrossel */}
                {produtos.map((produto, indice) => (
                    <Card
                        key={indice}
                        imgSrc={`http://localhost:5015/storage/${produto.caminhoImagem}`}
                        descricao={produto.descricao}
                        valor={`R$ ${produto.preco}`}
                        nomeProduto={produto.nome}
                        onReservar={() => onReservar(produto)}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default Carrossel;