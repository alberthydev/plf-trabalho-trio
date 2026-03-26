# Trabalho Programação Lógica Funcional

Esse repositório possuí o trabalho desenvolvido em trio, com os alunos, Hygor Marques, Isadora Cozendey e Julia Luzzi.

---

## Aula 1 - Funções de Transformação

### Entenda o problema antes de escrever o código

**1.** Quais campos cada objeto de venda tem? O que cada um representa?

Cada objeto de venda possui 6 campos, sendo eles: 
 - **id:** Identificador único do produto;
 - **produto:** O nome do produto;
 - **valor:** O valor atribuído ao produto;
 - **categoria:** Nicho do produto;
 - **data:** Data em que a venda foi efetuada;
 - **vendedor:** Nome do vendedor responsável pela venda do item.

**2.** Que perguntas de negócio poderíamos responder com esses dados?

- Qual o valor total de venda de um vendedor?
- Em que data houve a maior venda?
- Qual item vendeu mais?
- Qual categoria possui mais vendas?
- Qual o valor médio das vendas totais?

**3.** Se fossem resolver isso com um loop for, como seria?

Como exemplo a pergunta de negócio de valor médio, uma possível solução seria a seguinte:

```
PARA variavel DE 0 ATE MENOR QUE lista.tamanho FAÇA variavel++ {
  vlr_total += lista.valor[variavel];
  media = vlr_total/lista.tamanho;
}
```

**4.**  Quais problemas esse código imperativo teria — testabilidade, reaproveitamento, clareza?

A clareza do código imperativo é impactada pela descrição dos passos, enquanto no funcional você tem a definição do que a função faz de forma direta para facilitar a linguagem humana. Em questão de testabilidade na programação imperativa, dependendo da forma como ela é utilizada, um for pode alterar um array global e isso pode interferir na integridade de outras funções que dependem do valor, diferente da programação funcional que utiliza "funções puras", mantendo o array imutável e apenas dentro do seu escopo. Além disso, a forma como as funções na programação funcional são construídas de forma genérica, facilita o reaproveitamento de código. A mesma coisa não ocorre na programação imperativa, onde as funções são focadas em resolver um problema específico.

---

### Funções de Filtragem
```javascript
const filtrarVlrMin = (min) => {
    return (vendas) => vendas.filter(minimos => minimos.valor >= min);
};

const filtrarCategoria = (categoria) => {
    return (vendas) => vendas.filter(venda => venda.categoria  === categoria);
};
```

Resposta 1: A programação funcional utiliza métodos que replicam a variável global para poder realizar modificações internas garantindo imutabilidade, pois não impactam na integridade do código.

Resposta 2: Ele retorna uma lista vazia, pois ela faz uma cópia do que foi passado (vazio) e com o filter ele percorre a lista.

### Transformação e Agregação
```javascript
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
```

Resposta 1:

Método sort() muda o array original, diferente do toSorted(), que retorna um novo array ordenado.

Resposta 2:

Sim, foram estruturadas para receberem uma lista de itens para poder ser reutilizada em lugares diferentes, isso garante que funções possam usar o mesmo parâmetro para listas diferentes. Ex:

```javascript
// Define um valor de filtro
const filtrarVendasGrandes = filtrarVlrMin(1000);

// Aqui o mesmo valor de filtro é usado em listas diferentes
const resultado = filtrarVendasGrandes(dadosDaEmpresaA);
const resultado2 = filtrarVendasGrandes(dadosDaEmpresaB);
```

### Testes

Testando as funções com o console.assert

#### Funções filtrarVlrMin e filtrarCategoria
```javascript
const resultadoValor = filtrarVlrMin(1000)(vendas);
console.assert(
    resultadoValor.length >= 1, 
    'Nenhuma venda identificada com base no filtro'
);

const resultadoCat = filtrarCategoria('tech')(vendasTeste);
console.assert(
    resultadoCat.length >= 1, 
    'Nao existem itens nessa categoria'
);
```

#### Funções Resumir, totalCategoria e ordemValor
```javascript
const resultadoResumo = resumir(vendas);
console.assert(
    Object.keys(resultadoResumo[0]).length === 3 && !resultadoResumo[0].vendedor,
    'O item possui mais ou menos atributos'
);

const resultadoTotal = totalCategoria(vendas);
console.assert(
    resultadoTotal.tech == 11400,
    'O cálculo por categoria está incorreto'
);

const resultadoOrdem = ordemValor(vendas);
console.log(resultadoOrdem);
console.assert(
    resultadoOrdem[0].valor === 150,
    'A ordenação não seguiu o critério de valor crescente'
);
```

###

---

## Aula 2 - Composição e Pipeline

### Pesquise: o que é composição de funções? 

Resposa 1:

A composição de funções consiste em combinar duas ou mais funções, de modo mais direto, pois o resultado de uma é passado diretamente como argumento da outra.
Em alguns casos são eliminados códigos desnecessários, passos intermediários e variáveis temporárias para armazenar dados. 

Resposta 2:

A principal diferença é a ordem de execução das funções. Pipe executa as funções na ordem em que aparecem, da esquerda para a direita. De modo mais natural ao modo de leitura do ocidente. Já o compose, seguindo a ordem matemática, realiza as funções da direita para a esquerda. Onde a última função listada é resolvida primeiro, e seu resultado é passado para a penúltima.

Resposta 3: 

As funções utilizadas como *filter* e *map*, precisam de alguns argumentos; Estes também devem ser passados para as próximas. Isso é possível pelo uso do currying, que permite também o uso de funções genéricas para usos mais específicos, mantendo o código limpo, definindo as regras de negócio previamente e mantendo os dados para o momento de execução. 

### Implementação do Pipe

```javascript
const pipe = (...funcoes) => (vendas) => {
    return funcoes.reduce((vendas, funcao) => {
        return funcao(vendas);
    }, vendas);
};

const minhaAnalise = pipe(
    filtrarCategoria('tech'),
    filtrarVlrMin(500),
    totalCategoria);
```

Resposta 1:

Ela é pura, pois segue duas regras importantes, a primeira sendo a imutabilidade do objeto passado e a outra é o determinismo, sempre que você passar a mesma entrada, receberá a mesma saída.

Resposta 2:

Entre as funções de filtro, não há diferenças, já na função de totalCategoria possuí uma saída diferente do que a próxima função aceita, dando erro. 

### Pipeline de Análise

Pipeline 1 - Questão de Análise 1
> Qual o valor total de venda de um vendedor?
```javascript

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

```

Pipeline 2 - Questão de Análise 2
> Qual o valor médio das vendas totais?
```javascript

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
```

### Falha de Estágio

```javascript
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
```

Resposta: 

Por meio do uso do  *"Maybe monad javascript"*, o código permanece limpo e  com um fluxo contínuo. O pipeline continua executando a sua sequência e o resultado torna-se previsível. 
Por conceito, o Maybe monad possui dois estados:
 * None/Nothing: Valor nulo ou inconsistência, erro.
 * Just/Some: Valor real.
 
Estes estados são como um pacote, onde passa um cabeçalho para a próxima função. Se houver um valor “normal”, será executado com o valor em seu interior. Se o dado for anômalo, a função será ignorada, o estado transmitido ao restante do pipeline que “desliga” o seu processamento.

