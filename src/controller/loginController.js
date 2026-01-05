import { Router } from "express";
import { autenticarLogin } from "../repository/loginRepository.js";

const endpoints = Router();

endpoints.post('/login', async (req, resp) => {
    const { email, senha } = req.body;
    try {
        const usuario = await autenticarLogin(email, senha);
        if (!usuario) {
            return resp.status(401).send({ erro: "Usuário ou senha inválidos" });
        }
        resp.send(usuario);
    } catch (err) {
        console.error("Erro no login:", err);
        resp.status(500).send({ erro: "Erro ao realizar login" });
    }
});

export default endpoints;