import { inicializarCarrinho, botaoAdicionar } from './carrinho.js';
const btnMudarTema = document.getElementById('mudar-tema');
const stylesheet = document.getElementById('theme-stylesheet');
const btnPrevious = document.querySelector('.previous-page') //Funcao ainda nao concluida
const btnNextPage = document.querySelector('.next-page')  //Funcao ainda nao concluida

//Rota Produtos

async function apiFetchProdutos() {
    const response = await fetch(`https://fakestoreapi.in/api/products?page=1&limit=28`);
    const produtos = await response.json();
    return produtos;
}

// Lista de Produtos
async function listaProdutos() {
    const docLista = document.querySelector('.lista-produtos');
    const produtos = await apiFetchProdutos();



    docLista.innerHTML = '<p>Carregando Produtos...</p>';
    let div = '';

    const produto = produtos.products

    produto.forEach(produto => {
        const brl = produto.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const tituloLimitado = produto.title.slice(0, 30) + '...';
        div += `
            <li class="produto">
                <a data-id="${produto.id}" class="img-click" href="detalhes.html?id=${produto.id}">
                    <img src="${produto.image}" loading="lazy" fetchpriority="high" alt="">
                </a>
                <div class="brand">
                    <h2 title="${produto.title}">${tituloLimitado}</h2>
                    <p class="marca-produto"><b>Marca:</b> ${produto.brand}</p>
                    <h4 class="valor-produto">${brl}</h4>
                    <span class="desconto">10% de desconto para pagamento no pix</span>
                    <button class="botao-adicionar" data-id="${produto.id}">Adicionar ao Carrinho</button>
                </div>
            </li>
        `;
    });

    docLista.innerHTML = div;
    botaoAdicionar(produto);
}
// Configuracoes de tema

btnMudarTema.addEventListener('click', () => {
    const currentTheme = stylesheet.getAttribute('href');

    if (currentTheme === './src/css/temaEscuro.css') {
        stylesheet.setAttribute('href', './src/css/temaClaro.css');
        localStorage.setItem('theme', './src/css/temaClaro.css');
    } else {
        stylesheet.setAttribute('href', './src/css/temaEscuro.css');
        localStorage.setItem('theme', './src/css/temaEscuro.css');
    }
});

function carregarTemaSalvo() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        stylesheet.setAttribute('href', savedTheme);
    } else {
        stylesheet.setAttribute('href', './src/css/temaEscuro.css');
    }
}



// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    carregarTemaSalvo()
    inicializarCarrinho();
    listaProdutos();
});