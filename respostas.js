// Carregando arquivo
const fs = require('fs');

const dadosRaw = fs.readFileSync('produtos.json');
const dados = JSON.parse(dadosRaw);

// Questão 2 - Filtros

const filtrarVlrMin = (min) => {
    return (vendas) => vendas.filter(minimos => minimos.valor >= min);
};

const filtrarCategoria = (categoria) => {
    return (vendas) => vendas.filter(venda => venda.categoria  === categoria);
};

//console.log("Questão 2 - Filtros\n");

//console.log(filtrarVlrMin(500)(dados));
//console.assert(filtrarVlrMin(500)(dados)+"\n", "Falha");

//console.log(filtrarCategoria('tech')(vendas));
//console.assert(filtrarCategoria('tech')(vendas)+"\n", "Falha");

// Questão 3 - 

const resumir = [...vendas].map(venda => ({
        produto: venda.produto,
        valor: venda.valor,
        categoria: venda.categoria
    }));

const totalCategoria = vendas.reduce((acumulador, venda) => ({
    ...acumulador,
    [venda.categoria]: Number(((acumulador[venda.categoria] || 0) + venda.valor))
}), {});

const ordemValor = [...vendas].sort((a, b) => b.valor - a.valor)

console.log("Questão 3 - Filtros\n");

// console.log(resumir);
// console.assert(resumir, "Falha");

// console.log(totalCategoria);
// console.assert(totalCategoria, "Falha");

//console.log(ordemValor);
//console.assert(ordemValor, "Falha");


