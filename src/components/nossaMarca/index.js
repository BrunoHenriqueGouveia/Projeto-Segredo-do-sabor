// Marca.js
import React from 'react';
import './index.scss';
import CarrosselNossaMarca from '../carrosselNossaMarca'

const Marca = () => (
  <div id='nossaMarca' className="fundo-nossa-marca">
    <div className="bi-wind" />
    <div className="cone-ilustre">
      <CarrosselNossaMarca/>
    </div>
    <span className="nossa-marca-1">Nossa Marca</span>
    <span className="texto-sobre-marca">
      Segredo do Sabor nasceu em 2023 com uma missão clara: transformar a
      experiência dos amantes de cones em algo verdadeiramente inesquecível.
      Especializados na criação e vendas de cones que unem sabor e inovação,
      nossa marca é um convite para explorar um mundo de possibilidades
      gastronômicas.
      <br />
      Guiados pela visão criativa de João, nosso idealizador, cada detalhe é
      pensado com cuidado, desde os ingredientes selecionados até a
      apresentação única. Combinamos tradição e modernidade, trazendo sabores
      que encantam e surpresas que conquistam a cada mordida.
    </span>
    <div className="rectangle-2" />
    <div className="rectangle-3" />
    <div className="missao">
      <span className="empty"> </span>
      <span className="missao-4">
        Missão
        <br />
      </span>
      <span className="empty-5">
        <br />
      </span>
      <span className="surpreender-conectar-saborear">
        Surpreender e conectar pessoas por meio de criações únicas que celebram
        o prazer de saborear.
      </span>
      <span className="empty-6">
        . <br />
      </span>
    </div>
    <div className="vissao">
      <span className="empty-7"> </span>
      <span className="visao">
        Visão
        <br />
      </span>
      <span className="empty-8">
        <br />
      </span>
      <span className="redefinir-cones-experiencias">
        Redefinir o conceito de cones, transformando-os em experiências
        culinárias refinadas e inesquecíveis.
      </span>
    </div>
    <div className="rectangle-9" />
    <div className="valores">
      <span className="empty-space"> </span>
      <span className="valores-a">
        Valores
        <br />
      </span>
      <span className="line-break">
        <br />
      </span>
      <span className="values-text">Excelência Inovação Paixão</span>
    </div>
  </div>
);

export default Marca;
