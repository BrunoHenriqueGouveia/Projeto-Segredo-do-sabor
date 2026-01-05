
// Queridinhos.js
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import Carroselimg from '../carrosselImg';


const Queridinhos = () => (
    <div id='home' className="fundo-queridinhos">
        <div className="img-principal" >
            <Carroselimg />
        </div>
        <span className="nossos-queridinhos">
            Nossos Queridinhos
            <br /> Estão de volta!
        </span>
        <span className="paragrafo">
            Os deliciosos e amados cones estão de volta
            <br />
            agora com uma releitura de apresentação,
            <br />
            mas o mesmo intrigante sabor!
        </span>

        <a href='#produtos'>
            <button className="button">
                <span>Reserve o Seu !</span>
            </button>
        </a>
    </div>
);

export default Queridinhos;
