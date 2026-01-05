import connection from './connection.js';

export async function obterReceitaTotal() {
    const comando = `
        SELECT SUM(valor_total) AS receitaTotal
        FROM reserva
        WHERE status = 'Confirmado';
    `;
    const [resultado] = await connection.query(comando);
    return resultado[0].receitaTotal || 0;
}

export async function obterCustoTotal() {
    const comando = `
        SELECT SUM(
            JSON_EXTRACT(r.qtdReserva, '$[*].quantidade') * 4
        ) AS custoTotal
        FROM reserva r
        WHERE r.status = 'Confirmado';
    `;
    const [resultado] = await connection.query(comando);
    return resultado[0].custoTotal || 0;
}


export async function obterLucroLiquido() {
    const receitaTotal = await obterReceitaTotal();
    const custoTotal = await obterCustoTotal();
    return receitaTotal - custoTotal;
}


export async function obterTotalPedidos() {
    const comando = `
        SELECT COUNT(*) AS totalPedidos
        FROM reserva
        WHERE status = 'Confirmado';
    `;
    const [resultado] = await connection.query(comando);
    return resultado[0].totalPedidos || 0;
}


export async function obterVendasPorPeriodo() {
    const comando = `
        SELECT 
            turno AS periodo,
            COUNT(*) AS totalVendas,
            SUM(valor_total) AS receita
        FROM reserva
        WHERE status = 'Confirmado'
        GROUP BY turno
        ORDER BY FIELD(turno, 'Manha', 'Tarde', 'Noite', 'Madrugada');
    `;
    const [resultado] = await connection.query(comando);
    return resultado;
}


export async function obterProdutosMaisVendidos() {
    const comando = `
        SELECT 
            p.nome AS produto,
            SUM(j.quantidade) AS quantidadeVendida
        FROM reserva r,
        JSON_TABLE(
            r.qtdReserva,
            '$[*]' COLUMNS (
                id INT PATH '$.id',
                quantidade INT PATH '$.quantidade'
            )
        ) AS j
        JOIN produto p ON p.idproduto = j.id
        WHERE r.status = 'Confirmado'
        GROUP BY p.nome
        ORDER BY quantidadeVendida DESC
        LIMIT 3;
    `;
    const [resultado] = await connection.query(comando);
    return resultado;
}

export async function obterTiposPagamento() {
    const comando = `
        SELECT 
            pagamento,
            COUNT(*) * 100 / (SELECT COUNT(*) FROM reserva WHERE status = 'Confirmado') AS porcentagem
        FROM reserva
        WHERE status = 'Confirmado'
        GROUP BY pagamento
        ORDER BY porcentagem DESC;
    `;
    const [resultado] = await connection.query(comando);
    return resultado;
}

export async function obterTotalProdutosVendidos() {
    const comando = `
        SELECT 
            SUM(j.quantidade) AS totalProdutosVendidos
        FROM reserva r,
        JSON_TABLE(
            r.qtdReserva,
            '$[*]' COLUMNS (
                id INT PATH '$.id',
                quantidade INT PATH '$.quantidade'
            )
        ) AS j
        WHERE r.status = 'Confirmado';
    `;
    const [resultado] = await connection.query(comando);
    return resultado[0].totalProdutosVendidos || 0;
}