// Importações necessárias
import React, { Component } from "react";
import Slider from "react-slick";  // Biblioteca para criar o carrossel
import "./index.scss";

// Componente SwipeToSlide - Carrossel com navegação por swipe
function SwipeToSlide() {
  // Configurações do slider
  const settings = {
    className: "center",        // Classe CSS para centralização
    infinite: true,            // Loop infinito
    centerPadding: "60px",     // Padding nas laterais do slide central
    slidesToShow: 1,           // Mostra uma imagem por vez
    swipeToSlide: true,        // Permite navegação por swipe
    afterChange: function(index) {  // Callback após mudança de slide
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
  };

  // Renderização do componente
  return (
    <div className="slider-container2">
      {/* Componente Slider com as configurações definidas */}
      <Slider {...settings}>
        {/* Imagens do carrossel */}
        <img src="/imgs/cone ilustre 2.jpg" alt="img-principal" />
        <img src="/imgs/kinder bueno.jpg" alt="img-principal" />
      </Slider>
    </div>
  );
}

export default SwipeToSlide;