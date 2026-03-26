// Carregando arquivo
const fs = require('fs');

const dadosRaw = fs.readFileSync('produtos.json');
const vendas = JSON.parse(dadosRaw);

// Aula 1 - Questão 2 - Filtros

const filtrarVlrMin = (min) => {
    return (vendas) => vendas.filter(minimos => minimos.valor >= min);
};

const filtrarCategoria = (categoria) => {
    return (vendas) => vendas.filter(venda => venda.categoria  === categoria);
};

//const resultadoValor = filtrarVlrMin(1000)(vendas);
//console.assert(
//    resultadoValor.length >= 1, 
//    'Nenhuma venda identificada com base no filtro'
//);

//const resultadoCat = filtrarCategoria('tech')(vendas);
//console.assert(
//    resultadoCat.length >= 1, 
//    'Nao existem itens nessa categoria'
//);

// Aula 1 - Questão 3 - Transformação e Agregação

const resumir = (vendas) => vendas.map(venda => ({
        produto: venda.produto,
        valor: venda.valor,
        categoria: venda.categoria
    }));

const totalCategoria = (vendas) => vendas.reduce((acumulador, venda) => ({
    ...acumulador,
    [venda.categoria]: Number(((acumulador[venda.categoria] || 0) + venda.valor))
}), {});

const ordemValor = (vendas) =>  vendas.toSorted((a, b) => a.valor - b.valor);

//const resultadoResumo = resumir(vendas);
//console.assert(
//    Object.keys(resultadoResumo[0]).length === 3 && !resultadoResumo[0].vendedor,
//    'O item possui mais ou menos atributos'
//);

//const resultadoTotal = totalCategoria(vendas);
//console.assert(
//    resultadoTotal.tech == 11400,
//   'O cálculo por categoria está incorreto'
//);

//const resultadoOrdem = ordemValor(vendas);
//console.log(resultadoOrdem);
//console.assert(
//    resultadoOrdem[0].valor === 150,
//    'A ordenação não seguiu o critério de valor crescente'
//);

// Aula 2 - Questão 2 - Implementação do Pipe

const pipe = (...funcoes) => (vendas) => {
    return funcoes.reduce((vendas, funcao) => {
        return funcao(vendas);
    }, vendas);
};

const minhaAnalise = pipe(
    filtrarCategoria('tech'),
    filtrarVlrMin(500),
    totalCategoria);

// Aula 2 - Questão 3 - Pipeline de Análise 1 

const filtrarVendedor = (vendedor) => {
    return (vendas) => vendas.filter(venda => venda.vendedor  === vendedor);
};

const somarVendas = (vendas) => 
    vendas.reduce((acc, v) => acc + v.valor, 0);

const formatarMoeda = (moeda) => (valor) =>
    `${moeda} ${valor.toFixed(2)}`;


const vendasVendedor = (...funcoes) => (vendas) => {
    return funcoes.reduce((vendas, funcao) => {
        return funcao(vendas);
    }, vendas);
};

const analiseVendedor = vendasVendedor(
    filtrarVendedor('Ana'),
    somarVendas,
    formatarMoeda('R$'));

// Aula 2 - Questão 3 - Pipeline de Análise 2

const totalVendas = (vendas) => 
    vendas.reduce((acc, venda) => acc + venda.valor, 0);

const calcularMedia = (listaOriginal) => (valorTotal) => 
    valorTotal / listaOriginal.length;

const formatarMoeda = (moeda) => (valor) =>
    `${moeda} ${valor.toFixed(2)}`;

const pipe = (...funcoes) => (valorInicial) => 
    funcoes.reduce((acc, fn) => fn(acc), valorInicial);

const analiseMedia = pipe(
    totalVendas,
    calcularMedia(vendas),
    formatarMoeda('R$'));
);

// Aula 2 - Questão 4 - Falha de Estágio

const Maybe = (valor) => ({
    map: (fn) => (valor == null || (Array.isArray(valor) && valor.length === 0))
        ? Maybe(null)
        : Maybe(fn(valor)),

    getOrElse: (defaultValue) =>
        (valor == null || (Array.isArray(valor) && valor.length === 0))
            ? defaultValue
            : valor
});

const pipeMaybe = (...funcoes) => (valorInicial) =>
    funcoes.reduce(
        (acc, fn) => acc.map(fn),
        Maybe(valorInicial)
    );

const filtrarCategoria = (categoria) => (vendas) => {
    return vendas.filter(v => v.categoria === categoria);
};

const filtrarVlrMin = (min) => (vendas) => {
    return vendas.filter(v => v.valor >= min);
}
    
const totalCategoria = (vendas) => {
    return vendas.reduce((acc, v) => acc + v.valor, 0);
}

const minhaAnalise = pipeMaybe(
    filtrarCategoria('tech'),
    filtrarVlrMin(500),
    totalCategoria
);

const resultado = minhaAnalise(vendas);

console.log(
    resultado.getOrElse('Nenhuma venda encontrada')
);

