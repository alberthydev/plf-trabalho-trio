# Trabalho Programação Lógica Funcional

Esse repositório possuí o trabalho desenvolvido em trio, com os alunos, Hygor Marques, Isadora Cozendey e Julia Luzzi.

---

## Entenda o problema antes de escrever o código

**1.** Quais campos cada objeto de venda tem? O que cada um representa?

Cada objeto de venda possui 6 campos, sendo eles: 
 - **id:** Identificador único do produto;
 - **produto:** O nome do produto;
 - **valor:** O valor atribuído ao produto;
 - **categoria:** Nicho do produto;
 - **data:** Data em que a venda foi efetuada;
 - **vendedor:** Nome do vendedor responsável pela venda do item.

**2.** Que perguntas de negócio poderíamos responder com esses dados?

- Qual vendedor realizou cada venda?
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

## Funções de Filtragem
```
const filtrarVlrMin = (min) => {
    return (vendas) => vendas.filter(minimos => minimos.valor >= min);
};

const filtrarCategoria = (categoria) => {
    return (vendas) => vendas.filter(venda => venda.categoria  === categoria);
};
```

Resposta 1: A programação funcional utiliza métodos que replicam a variável global para poder realizar modificações internas garantindo imutabilidade, pois não impactam na integridade do código.

Resposta 2: Ele retorna uma lista vazia, pois ela faz uma cópia do que foi passado (vazio) e com o filter ele percorre a lista.

## Transformção e Agregação
```
const resumir = [...vendas].map(venda => ({
        produto: venda.produto,
        valor: venda.valor,
        categoria: venda.categoria
    }));


```

Resposta 1:
Resposta 2:
