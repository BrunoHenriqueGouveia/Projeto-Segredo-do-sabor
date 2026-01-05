// Importações necessárias
import "./index.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Financas() {
  // Estados para gerenciar dados financeiros
  const [receitaTotal, setReceitaTotal] = useState(null);           // Receita total
  const [totalPedidos, setTotalPedidos] = useState(null);          // Número total de pedidos
  const [vendasPorPeriodo, setVendasPorPeriodo] = useState({ manha: 0, tarde: 0, noite: 0 }); // Vendas por período do dia
  const [tiposPagamentos, setTiposPagamentos] = useState([]);      // Métodos de pagamento utilizados
  const [obterTotalPedidos, setObterTotalPedidos] = useState(null); // Total de produtos vendidos
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]); // Ranking de produtos
  const [loading, setLoading] = useState(true);                    // Controle de carregamento
  const [error, setError] = useState(null);                        // Controle de erros

  // Constantes para cálculos financeiros
  const custoPorProduto = 4;        // Custo unitário de produção
  const precoVendaPorProduto = 12;  // Preço unitário de venda

  // Cálculos financeiros
  const custoTotal = obterTotalPedidos !== null ? obterTotalPedidos * custoPorProduto : 0;
  const lucroLiquido = obterTotalPedidos !== null ? obterTotalPedidos * precoVendaPorProduto - custoTotal : 0;

  // Effect para buscar dados ao montar o componente
  useEffect(() => {
    const buscarDados = async () => {
      try {
        // Busca dados financeiros da API
        const receitaResponse = await axios.get("http://localhost:5015/relatorio/receita-total");
        setReceitaTotal(receitaResponse.data.receitaTotal);

        const pedidosResponse = await axios.get("http://localhost:5015/relatorio/total-pedidos");
        setTotalPedidos(pedidosResponse.data.totalPedidos);

        const vendasResponse = await axios.get("http://localhost:5015/relatorio/vendas-por-periodo");
        const vendas = vendasResponse.data;

        const pedidosUnitariosResponse = await axios.get("http://localhost:5015/relatorio/total-vendidos");
        setObterTotalPedidos(pedidosUnitariosResponse.data.totalProdutosVendidos);

        // Formata dados de vendas por período
        const vendasPorPeriodoFormatado = vendas.reduce((acc, venda) => {
          if (venda.periodo === "Manhã") acc.manha = venda.totalVendas;
          if (venda.periodo === "Tarde") acc.tarde = venda.totalVendas;
          if (venda.periodo === "Noite") acc.noite = venda.totalVendas;
          return acc;
        }, { manha: 0, tarde: 0, noite: 0 });

        setVendasPorPeriodo(vendasPorPeriodoFormatado);

        // Busca e formata dados de pagamentos
        const pagamentosResponse = await axios.get("http://localhost:5015/relatorio/tipos-pagamento");
        const pagamentos = pagamentosResponse.data.map((pagamento) => ({
          tipo: pagamento.pagamento,
          porcentagem: parseFloat(pagamento.porcentagem).toFixed(0),
        }));

        // Busca produtos mais vendidos
        const produtosResponse = await axios.get("http://localhost:5015/relatorio/produtos-mais-vendidos");
        setProdutosMaisVendidos(produtosResponse.data);

        console.log(pagamentos);
        setTiposPagamentos(pagamentos);

        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  // Renderização condicional para loading e erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="Financas">


      <div className="flex-row-c">
        <span className="financeiro-1">Financeiro</span>
      </div>


      <button className="rectangle3">
        <span className="detalhamento-financeiro">
          Detalhamento Financeiro
        </span>
      </button>


      <div className="flex-row-ae">
        <div className="rectangle-a">
          <div className="flex-row-fde">
            <div className="cash-register" />
            <span className="text-receita-total">Receita Total </span>
          </div>
          <span className="text-r-4-464-00">{receitaTotal !== null ? `R$ ${receitaTotal.toFixed(2)}` : "Carregando..."}</span>
        </div>
        <div className="rectangle-b">
          <div className="cash-remove" />
          <div className="flex-column-cab">
            <span className="text-custo-total">Custo Total </span>
            <span className="text-r-1-216-44"> {custoTotal !== null ? `R$ ${custoTotal.toFixed(2)}` : "Carregando..."}</span>
          </div>
        </div>
        <div className="rectangle-c">
          <div className="flex-row-ca">
            <div className="tabler-cash-plus" />
            <span className="lucro-liquido">Lucro Liquido</span>
          </div>
          <span className="r-3-247-56">{lucroLiquido !== null ? `R$ ${lucroLiquido.toFixed(2)}` : "Carregando..."}</span>
        </div>
        <div className="rectangle-d">
          <div className="flex-row-e">
            <div className="tabler-paper-bag-f" />
            <span className="total-pedidos">Total Pedidos</span>
          </div>
          <span className="text-11">
            {totalPedidos !== null ? totalPedidos : "Carregando..."}
          </span>
        </div>
      </div>
      <div className="flex-row-10">
        <div className="rectangle-11">
          <div className="flex-column-ec">
            <div className="mdi-podium" />
            <span className="produtos-mais-vendidos">Produtos Mais Vendidos</span>
          </div>
          {produtosMaisVendidos.map((produto, index) => (
            <div key={index} className="produto-item">
              <span className="produto-nome">{produto.produto}</span>
              <span className="produto-quantidade">{produto.quantidadeVendida} </span>
            </div>
          ))}

        </div>
        <div className="rectangle-12">
          <div className="sun-moon-stars" />
          <span className="vendas-por-periodo">Vendas por Periodo</span>
          <div className="flex-column-e">
            <span className="manha">Manhã</span>
            <span className="tarde">Tarde</span>
            <span className="noite">Noite</span>
          </div>
          <div className="flex-column-aa">
            <span className="empty">{vendasPorPeriodo.manha}</span>
            <span className="empty-13">{vendasPorPeriodo.tarde}</span>
            <span className="empty-14">{vendasPorPeriodo.noite}</span>
          </div>
        </div>
      </div>
      <div className="rectangle-15">
        <span className="tipos-de-pagamentos">Tipos De Pagamentos </span>
        {tiposPagamentos.map((pagamento, index) => (
          <span key={index} className="pagamento-item">
            {pagamento.tipo}: {pagamento.porcentagem}%
          </span>
        ))}

      </div>
    </div >
  );
}

export default Financas;