// Footer.js - Componente de rodapé da aplicação
import React from 'react';
import './index.scss'

// Componente Footer - Exibe informações de contato e links importantes
const Footer = () => (
  // Container principal do footer com ID para navegação
  <div id='contatos' className="footer-background">
    {/* Primeira linha - Logo e títulos das seções */}
    <div className="flex-row-b">
      {/* Logo da empresa */}
      <div className="logo-b">
        <img src="/imgs/wmremove-transformed-fotor-bg-remover-20250331213313.png" alt="Logo Segredo do Sabor" />
      </div>
      {/* Títulos das seções */}
      <span className="links">Links</span>
      <span className="contact">Contato</span>
    </div>

    {/* Segunda linha - Redes sociais, endereço e links */}
    <div className="flex-row-e">
      {/* Ícone do Facebook */}
      <div className="facebook-icon" />
      {/* Handle do Instagram */}
      <span className="instagram-handle">@segredosabor.confeitaria</span>
      {/* Endereço físico */}
      <span className="address">
        Avenida Engenheiro Eusébio Stevaux, 600 - Santo Amaro, 04696-000
        <br />
      </span>
      {/* Link para produtos */}
      <span className="products">Produtos</span>
      {/* Ícone do Instagram */}
      <div className="instagram-icon" />
      {/* Handle do Instagram (repetido) */}
      <span className="segredo-sabor-confeitaria">
        @segredosabor.confeitaria
      </span>
      {/* Link para contato */}
      <span className="contato-c">Contato</span>
    </div>

    {/* Informações de telefone */}
    <span className="telefones">Telefones: (11) 99766 - 1964</span>

    {/* Seção WhatsApp */}
    <div className="flex-row-cc">
      {/* Ícone do WhatsApp */}
      <div className="ic-sharp-whatsapp" />
      {/* Número do WhatsApp */}
      <span className="telefones-d">(11) 99766 - 1964</span>
    </div>

    {/* Link para seção sobre a marca */}
    <span className="nossa-marca-e">Nossa Marca</span>
  </div>
);

export default Footer;