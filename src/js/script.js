import { inicializarCarrinho, configurarBotoesAdicionar} from './carrinho.js';

//Rota Produtos
async function apiFetchProdutos() {
    const response = await fetch(`https://fakestoreapi.in/api/products`);
    const produtos = await response.json();
    return produtos;
}

// Lista de Produtos
async function listaProdutos() {
    const docLista = document.querySelector('.lista-produtos');
    const produtos = await apiFetchProdutos();

    docLista.innerHTML = '<p>Carregando Produtos...</p>';
    let div = '';

    produtos.products.forEach(produto => {
        const brl = produto.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const tituloLimitado = produto.title.length > 30 ? produto.title.substring(0, 30) + '...' : produto.title;
        div += `
            <li class="produto">
                <a data-id="${produto.id}" class="img-click" href="detalhes.html?id=${produto.id}">
                    <img src="${produto.image}" alt="">
                </a>
                <div class="brand">
                    <h2>${tituloLimitado}</h2>
                    <p class="marca-produto"><b>Marca:</b> ${produto.brand}</p>
                    <h4 class="valor-produto">${brl}</h4>
                    <span class="desconto">10% de desconto para pagamento no pix</span>
                    <button class="botao-adicionar" data-id="${produto.id}">Adicionar ao Carrinho</button>
                </div>
            </li>
        `;
    });

    docLista.innerHTML = div;
    configurarBotoesAdicionar(produtos.products);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrinho();
    listaProdutos();
});