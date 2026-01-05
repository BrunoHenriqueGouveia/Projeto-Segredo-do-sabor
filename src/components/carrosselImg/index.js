// Importações necessárias
import React, { Component } from "react";
import Slider from "react-slick";  // Biblioteca para criar o carrossel
import "./index.scss";

// Componente PauseOnHover - Carrossel de imagens com pausa ao passar o mouse
function PauseOnHover() {
    // Configurações do slider
    var settings = {
        dots: false,            // Oculta pontos de navegação
        arrows: false,          // Oculta setas de navegação
        infinite: true,         // Loop infinito
        slidesToShow: 1,        // Mostra uma imagem por vez
        slidesToScroll: 1,      // Avança uma imagem por vez
        autoplay: true,         // Reprodução automática
        autoplaySpeed: 5000,    // 5 segundos por slide
        pauseOnHover: true      // Pausa ao passar o mouse
    };

    // Renderização do componente
    return (
        <div className="slider-container">
            {/* Componente Slider com as configurações definidas */}
            <Slider {...settings}>
                {/* Imagens do carrossel */}
                <img src="/imgs/cones 3.jpg" alt="img-principal" />

                <img src="/imgs/cones.jpg" alt="img-principal" />


                <img src="/imgs/limão chocolate.jpg" alt="img-principal" />


                <img src="/imgs/cones 2.jpg" alt="img-principal" />


            </Slider>
        </div>
    );
}

export default PauseOnHover;