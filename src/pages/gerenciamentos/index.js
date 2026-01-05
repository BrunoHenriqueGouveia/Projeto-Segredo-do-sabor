// Importações necessárias
import React from "react";
import "./index.scss";
import Logo from '../../components/logo'
import { useState } from "react";
// Importação dos componentes de cada seção
import Financas from "../../components/financas";
import Estoque from "../../components/estoque";
import Reservas from "../../components/reservasAndamentos";
import FiltroReservas from "../../components/filtroReserva";
import { Link } from "react-router-dom";

export default function Login() {
    // Estado para controlar qual página/componente está sendo exibido
    const [paginaAtual, setPaginaAtual] = useState("reservas"); // Começa com Reservas

    return (
        <div className="pagina-gerenciamento">
            {/* Cabeçalho com logo e menu de navegação */}
            <header>
                <Logo />
                {/* Menu de navegação com links para diferentes seções */}
                <nav className="navGerenciamentos">
                    <a onClick={() => setPaginaAtual("reservas")}>Reservas</a>
                    <a onClick={() => setPaginaAtual("estoque")}>Estoque</a>
                    <a onClick={() => setPaginaAtual("financas")}>Finanças</a>       
                    <a onClick={() => setPaginaAtual("filtroReservas")}>Detalhamento Reservas</a>
                    <Link to="/login">Sair</Link>
                </nav>
            </header>

            {/* Conteúdo principal - renderiza o componente conforme a página selecionada */}
            <main>
                {/* Renderização condicional dos componentes baseada no estado paginaAtual */}
                {paginaAtual === "financas" && <Financas />}
                {paginaAtual === "estoque" && <Estoque />}
                {paginaAtual === "reservas" && <Reservas />}
                {paginaAtual === "filtroReservas" && <FiltroReservas />}
            </main>

            {/* Rodapé com informações de contato e links */}
            <footer>
                {/* Seção do logo e endereço */}
                <div className="divLogo">
                    <img className="wmremove-transformed-4" src="imgs/wmremove-transformed (1).png" />
                    <span className="avenida-engenheiro-stevaux">
                        Avenida Engenheiro Eusébio Stevaux, 600 - Santo Amaro, 04696-000
                    </span>
                    <span className="telefones">Telefones: (11) 99766 - 1964</span>
                </div>

                {/* Seção de links úteis */}
                <div className="divLinks">
                    <span className="links">Links</span>
                    <span className="nossa-marca">Nossa Marca</span>
                    <span className="produtos">Produtos</span>
                    <span className="contato-6">Contato</span>
                </div>

                {/* Seção de informações de contato e redes sociais */}
                <div className="divContatos">
                    <span className="contato">Contato</span>
                    {/* WhatsApp */}
                    <div className="flex-row-whats">
                        <div className="ic-sharp-whatsapp" />
                        <span className="phone-number">(11) 99766 - 1964</span>
                    </div>
                    {/* Facebook */}
                    <div className="flex-row-face">
                        <div className="ic-baseline-facebook" />
                        <span className="segredo-sabor-confeitaria">
                            @segredosabor.confeitaria
                        </span>
                    </div>
                    {/* Instagram */}
                    <div className="flex-row-insta">
                        <div className="mdi-instagram" />
                        <span className="segredo-sabor-confeitaria-5">
                            @segredosabor.confeitaria
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}