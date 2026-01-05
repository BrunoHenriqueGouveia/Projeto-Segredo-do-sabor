import boasVindas from './controller/boasVindasController.js'
import cliente from './controller/clienteController.js'
import produto from './controller/produtoController.js'
import reserva from './controller/reservaController.js'
import relatorioController from './controller/relatorioController.js';
import login from './controller/loginController.js'
import express from 'express'


export default function adicionarRotas(servidor) {
    servidor.use(boasVindas);
    servidor.use(cliente);
    servidor.use(produto);
    servidor.use(reserva);
    servidor.use(relatorioController);
    servidor.use(login);
    servidor.use('/storage', express.static('./storage'));
}