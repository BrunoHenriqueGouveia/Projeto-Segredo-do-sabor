// Importações necessárias
import React, { useState } from "react";
import axios from "axios";
import './index.scss';

// Componente CardEstoque - Gerencia a exibição e edição de produtos no estoque
// Props:
// - id: identificador único do produto
// - imagem: caminho da imagem do produto
// - nome: nome do produto
// - descricao: descrição do produto
// - quantidade: quantidade em estoque
// - preco: preço unitário
// - aoAtualizar: callback chamado após atualização
// - aoDeletar: callback chamado após deleção
function CardEstoque({ id, imagem, nome, descricao, quantidade, preco, aoAtualizar, aoDeletar }) {
    // Estados para controle de edição e dados do produto
    const [estaEditando, setEstaEditando] = useState(false);
    const [produtoEditado, setProdutoEditado] = useState({ nome, descricao, quantidade, preco, imagem });

    // Função para iniciar modo de edição
    const aoClicarEditar = () => {
        setEstaEditando(true);
    };

    // Função que gerencia alterações nos inputs
    const aoAlterarInput = (e) => {
        const { name, value, files } = e.target;

        if (name === "imagem") {
            setProdutoEditado((produtoAnterior) => ({
                ...produtoAnterior,
                imagem: files[0], // Atualiza o arquivo da imagem
            }));
        } else {
            setProdutoEditado((produtoAnterior) => ({
                ...produtoAnterior,
                [name]: value, // Atualiza os outros campos
            }));
        }
    };

    // Função para salvar alterações no produto
    const aoClicarSalvar = async () => {
        try {
            // Prepara os dados para envio
            const formData = new FormData();
            formData.append("nome", produtoEditado.nome);
            formData.append("descricao", produtoEditado.descricao);
            formData.append("quantidade", produtoEditado.quantidade);
            formData.append("preco", produtoEditado.preco);

            // Verifica se uma nova imagem foi selecionada
            if (produtoEditado.imagem instanceof File) {
                formData.append("imagem", produtoEditado.imagem);
            } else {
                formData.append("caminhoImagem", produtoEditado.imagem);
            }

            // Debug do FormData
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

            // Envia requisição PUT para atualizar o produto
            await axios.put(`http://localhost:5015/produto/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Busca dados atualizados do produto
            const produtoAtualizado = await axios.get(`http://localhost:5015/produto/${id}`);
            console.log("Produto atualizado com sucesso!", produtoAtualizado.data);
            aoAtualizar(produtoAtualizado.data);
            setEstaEditando(false);
        } catch (erro) {
            console.error("Erro ao atualizar o produto:", erro);
        }
    };

    // Função para cancelar edição
    const aoClicarCancelar = () => {
        setProdutoEditado({ nome, descricao, quantidade, preco, imagem });
        setEstaEditando(false);
    };

    // Função para deletar produto
    const aoClicarDeletar = async () => {
        console.log("Tentando deletar o produto com ID:", id);
        try {
            await axios.delete(`http://localhost:5015/produto/${id}`);
            console.log("Produto deletado com sucesso!");
            aoDeletar(id);
        } catch (erro) {
            console.error("Erro ao deletar o produto:", erro);
        }
    };

    return (
        <div className="cardEstoque">
            <div className="flex-row-e">
                {estaEditando ? (
                    <>
                        <div className="formAtualizado">
                            <div className="custom-file-input-card">
                                <input
                                    type="file"
                                    name="imagem"
                                    onChange={aoAlterarInput}
                                />
                            </div>
                            <input
                                type="text"
                                name="nome"
                                className="inputNomeCard"
                                value={produtoEditado.nome}
                                onChange={aoAlterarInput}
                            />
                            <input
                                type="text"
                                name="descricao"
                                className="inputDescricaoCard"
                                value={produtoEditado.descricao}
                                onChange={aoAlterarInput}
                            />
                            <input
                                type="number"
                                name="quantidade"
                                className="inputQtdCard"
                                min={0}
                                value={produtoEditado.quantidade}
                                onChange={aoAlterarInput}
                            />
                            <input
                                type="text"
                                name="preco"
                                className="inputPrecoCard"
                                value={produtoEditado.preco}
                                onChange={aoAlterarInput}
                            />
                            <div className="botoesCard">
                                <button className="btnAdicionarProdutoCard" onClick={aoClicarSalvar}>Salvar</button>
                                <button className="btnCancelarProdutoCard" onClick={aoClicarCancelar}>Cancelar</button>
                                <button className="btnDeletarProdutoCard" onClick={aoClicarDeletar}>Deletar</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>


                        <img className="img" src={`http://localhost:5015/storage/${imagem}`} alt={nome} />
                        <span className="nomeProduto">{nome}</span>
                        <span className="descricao">{descricao}</span>
                        <span className="quantidade">{quantidade} un</span>
                        <div className="div-rs-un">
                            <span className="span-rs">R$</span>
                            <span className="span-12-00">{preco}</span>
                            <span className="span-slash"> /</span>
                            <span className="span-un-6">un</span>
                        </div>
                        <div className="divEditar" onClick={aoClicarEditar}>
                            <div className="div-icon-park-edit" />
                            <span className="span-editar">Editar</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CardEstoque;