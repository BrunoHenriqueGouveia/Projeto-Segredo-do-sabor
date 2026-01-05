// Importações necessárias para o componente
import React, { useState } from "react"; // Hook useState para gerenciar estados
import "./index.scss";                   // Estilos do componente
import Logo from '../../components/logo'  // Componente do logo
import { Link, useNavigate } from 'react-router-dom' // Hooks de navegação
import axios from 'axios';               // Cliente HTTP para requisições

export default function Login() {
  // Estados para controlar os campos do formulário
  const [email, setEmail] = useState('');       // Estado para o campo de email
  const [senha, setSenha] = useState('');       // Estado para o campo de senha
  const [erro, setErro] = useState('');         // Estado para mensagens de erro
  const navigate = useNavigate();               // Hook para navegação programática

  // Função assíncrona que realiza o processo de login
  async function fazerLogin() {
    setErro(''); // Limpa mensagens de erro anteriores
    try {
      // Faz requisição POST para a API de login
      const resp = await axios.post('http://localhost:5015/login', {
        email: email,
        senha: senha
      });

      alert('Login realizado com sucesso!');
      navigate('/gerenciamentos'); // Redireciona para área administrativa
    } catch (err) {
      // Em caso de erro, exibe mensagem para o usuário
      setErro('Usuário ou senha inválidos');
    }
  }

  return (
    <div className="pagina-login">
      <header>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo />
        </Link>

      </header>

      <main>
        <span className="enter-kitchen-chef">Entre na Cozinha Chefe!</span>

        <div className="divEmail">
          <span className="email-cpf" >E-mail ou CPF</span>
          <input
            className="inputEmail"
            type="text"
            placeholder="Digite E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="divSenha">
          <span className="passwordSpan">Senha</span>
          <input
            className="inputSenha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
        </div>

        {erro && <span style={{ color: 'red' }}>{erro}</span>}

        <button className="botaoEntrar" onClick={fazerLogin}>
          <span className="entrarSpan">Entrar</span>
        </button>

        <div className="divAcesso">
          <div className="acesso-restrito">
            <span className="acesso">Acesso </span>
            <Link to="/gerenciamentos" style={{ textDecoration: "none" }}>
              <span className="restrito">Restrito!</span>
            </Link>
          </div>
          <span className="apenas-chefes">
            Apenas os chefes tem acesso a nossa cozinha, desculpe.
            <br />
            Estava querendo desvendar nosso segredo né ?!
          </span>
        </div>

      </main>

      <footer>

        <div className="divLogo">

          <img className="wmremove-transformed-4" src="imgs/wmremove-transformed (1).png" />
          <span className="avenida-engenheiro-stevaux">
            Avenida Engenheiro Eusébio Stevaux, 600 - Santo Amaro, 04696-000
          </span>
          <span className="telefones">Telefones: (11) 99766 - 1964</span>

        </div>


        <div className="divLinks">

          <span className="links">Links</span>
          <span className="nossa-marca">Nossa Marca</span>
          <span className="produtos">Produtos</span>
          <span className="contato-6">Contato</span>

        </div>


        <div className="divContatos">
          <span className="contato">Contato</span>

          <div className="flex-row-whats">
            <div className="ic-sharp-whatsapp" />
            <span className="phone-number">(11) 99766 - 1964</span>
          </div>

          <div className="flex-row-face">
            <div className="ic-baseline-facebook" />
            <span className="segredo-sabor-confeitaria">
              @segredosabor.confeitaria
            </span>
          </div>


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
