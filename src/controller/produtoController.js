import { listarProdutos, inserirProduto, alterarProduto, removerProduto, listarProdutoPorId,listarProdutosDisponiveis } from '../repository/produtoRepository.js';
import { Router } from "express";
import multer from 'multer';
import path from 'path';

const endpoints = Router();

// Configuração do multer para salvar arquivos com a extensão correta
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage'); // Diretório onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Obtém a extensão do arquivo original
        cb(null, `${uniqueSuffix}${ext}`); // Salva o arquivo com um nome único e a extensão
    }
});

const upload = multer({ storage });

endpoints.get('/produto/listar', async (req, resp) => {
    let registros = await listarProdutos();
    resp.send(registros);
});

endpoints.get('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let produto = await listarProdutoPorId(id);

        if (!produto) {
            resp.status(404).send({ erro: "Produto não encontrado" });
        } else {
            resp.send(produto);
        }
    } catch (err) {
        resp.status(500).send({ erro: "Erro ao buscar produto" });
    }
});

endpoints.post("/produto/inserir", upload.single('imagem'), async (req, resp) => {
    try {
        const produto = req.body;
        produto.caminhoImagem = req.file.filename; // Adiciona o caminho completo da imagem

        let id = await inserirProduto(produto);
        resp.status(201).send({ id });
    } catch (err) {
        resp.status(500).send({ erro: "Erro ao inserir produto" });
    }
});

endpoints.put('/produto/:id', upload.single('imagem'), async (req, res) => {
  try {
      const id = req.params.id;
      const produto = req.body;

      // Verifica se um novo arquivo foi enviado
      if (req.file) {
          produto.caminhoImagem = req.file.filename; // Atualiza o caminho da nova imagem
      }

      // Atualiza o produto no banco de dados
      const linhasAfetadas = await alterarProduto(id, produto);

      if (linhasAfetadas === 0) {
          return res.status(404).send({ erro: 'Produto não encontrado' });
      }

      res.send({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      res.status(500).send({ erro: 'Erro ao atualizar produto' });
  }
});

endpoints.delete("/produto/:id", async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await removerProduto(id);

    if (linhasAfetadas == 0) {
        resp.status(404).end();
    } else {
        resp.end();
    }
});


endpoints.get('/produto', async (req, resp) => {
    try {
        let produtos = await listarProdutosDisponiveis(); // Chama a função do repositório
        resp.send(produtos);
    } catch (err) {
        console.error("Erro ao listar produtos disponíveis:", err);
        resp.status(500).send({ erro: "Erro ao listar produtos disponíveis" });
    }
});

export default endpoints;