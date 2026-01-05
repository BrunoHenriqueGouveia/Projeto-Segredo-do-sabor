// Importações necessárias
import React, { useState, useEffect } from "react";
import './index.scss';
import CardEstoque from "../cardEstoque";
import axios from "axios";

function Estoque() {
    // Estados para gerenciar produtos e formulário
    const [listaProdutos, setListaProdutos] = useState([]); // Lista de todos os produtos
    const [mostrarFormularioCadastro, setMostrarFormularioCadastro] = useState(false); // Controla visibilidade do formulário
    const [novoProduto, setNovoProduto] = useState({ nome: "", descricao: "", quantidade: 0, preco: "", imagem: null }); // Dados do novo produto

    // Função para mostrar/ocultar formulário de cadastro
    const alternarFormularioCadastro = () => {
        setMostrarFormularioCadastro(!mostrarFormularioCadastro);
    };

    // Função para atualizar dados do novo produto
    const atualizarNovoProduto = (evento) => {
        const { name, value, files } = evento.target;

        if (name === "imagem") {
            setNovoProduto((produtoAnterior) => ({
                ...produtoAnterior,
                imagem: files[0], // Armazena o arquivo da imagem
            }));
        } else {
            setNovoProduto((produtoAnterior) => ({
                ...produtoAnterior,
                [name]: value,
            }));
        }
    };

    // Função para atualizar produto na lista
    const atualizarProduto = (produtoAtualizado) => {
        setListaProdutos((produtos) =>
            produtos.map((produto) =>
                produto.id === produtoAtualizado.id ? produtoAtualizado : produto
            )
        );
    };

    // Função para carregar produtos do backend
    const carregarProdutos = async () => {
        try {
            const response = await axios.get('http://localhost:5015/produto/listar');
            setListaProdutos(response.data);
            console.log(response.data);
            console.log("Produtos carregados com sucesso!");
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    };

    // Função para cadastrar novo produto
    const cadastrarNovoProduto = async (evento) => {
        evento.preventDefault();

        try {
            // Prepara dados para envio com FormData (permite envio de arquivos)
            const formData = new FormData();
            formData.append("imagem", novoProduto.imagem);
            formData.append("nome", novoProduto.nome);
            formData.append("descricao", novoProduto.descricao);
            formData.append("quantidade", novoProduto.quantidade);
            formData.append("preco", novoProduto.preco);

            // Envia dados para API
            const response = await axios.post('http://localhost:5015/produto/inserir', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Produto retornado pela API:", response.data);

            // Atualiza lista local com novo produto
            setListaProdutos([...listaProdutos, response.data]);

            console.log("Produto salvo com sucesso!");

            // Limpa formulário e fecha
            setNovoProduto({ nome: "", descricao: "", quantidade: 0, preco: "", imagem: null });
            setMostrarFormularioCadastro(false);
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
        }
    };

    // Função para deletar produto
    const deletarProduto = async (id) => {
        try {
            setListaProdutos((produtos) => produtos.filter((produto) => produto.id !== id));
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    // Carrega produtos ao montar componente
    useEffect(() => {
        carregarProdutos();
    }, []);

    return (
        <div className="estoque">
            <div className="flex-columin">
                <div className="flex-row">
                    <span className="estoque-1">
                        {mostrarFormularioCadastro ? "Cadastrar novo Produto" : "Estoque"}
                    </span>
                    <button className="btnCadastrar" onClick={alternarFormularioCadastro}>
                        <span className="cadastrar-novo-produto">
                            {mostrarFormularioCadastro ? "Fechar Cadastro" : "Cadastrar novo Produto"}
                        </span>
                    </button>
                </div>

                <div className="rectangle1">
                    <span className="imagem-produto">Imagem<br />Produto</span>
                    <span className="produto">Produto</span>
                    <span className="descricao-produto">Descrição Produto</span>
                    <span className="quantidade">Quantidade</span>
                    <span className="preco">Preço</span>
                </div>

                {!mostrarFormularioCadastro && (
                    <>
                        {listaProdutos.map((produto, index) => (
                            <CardEstoque
                                key={produto.id}
                                id={produto.id}
                                imagem={produto.caminhoImagem}
                                nome={produto.nome}
                                descricao={produto.descricao}
                                quantidade={produto.quantidade}
                                preco={produto.preco}
                                aoAtualizar={atualizarProduto}
                                aoDeletar={deletarProduto}
                            />
                        ))}
                    </>
                )}

                {mostrarFormularioCadastro && (
                    <>
                        <form className="formularioCadastro" onSubmit={cadastrarNovoProduto}>
                            <div className="custom-file-input">
                                <input type="file" name="imagem" onChange={atualizarNovoProduto} required />
                            </div>
                            <input
                                className="inputNome"
                                type="text"
                                name="nome"
                                placeholder="Nome do Produto"
                                value={novoProduto.nome}
                                onChange={atualizarNovoProduto}
                                required
                            />
                            <input
                                className="inputDescricao"
                                type="text"
                                name="descricao"
                                placeholder="Descrição"
                                value={novoProduto.descricao}
                                onChange={atualizarNovoProduto}
                                required
                            />
                            <input
                                className="inputQtd"
                                type="number"
                                name="quantidade"
                                placeholder="Quantidade"
                                value={novoProduto.quantidade}
                                onChange={atualizarNovoProduto}
                                required
                            />
                            <input
                                className="inputPreco"
                                type="text"
                                name="preco"
                                placeholder="Preço"
                                value={novoProduto.preco}
                                onChange={atualizarNovoProduto}
                                required
                            />
                            <div className="botoesForm">
                                <button className="btnAdicionarProduto" type="submit">Adicionar</button>
                                <button className="btnCancelarProduto" type="button" onClick={alternarFormularioCadastro}>Cancelar</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Estoque;