import { inicializarCarrinho, } from './carrinho.js';
const params = new URLSearchParams(window.location.search);
const produtoId = params.get('id');

async function fetchProdutoDetalhes() {
  const response = await fetch(`https://fakestoreapi.in/api/products/${produtoId}`)
  const produto = response.json()
  return produto
}

async function listarProduto() {
  const produtoClicado = document.querySelector('.produto-clicado');
  const produto = await fetchProdutoDetalhes();  // Supondo que isso retorna os detalhes do produto

  produtoClicado.innerHTML = '<p>Carregando Produto</p>';
  const brl = produto.product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  let div = `
  <div class="produto-content">
    <figure class="produto-imagem">
      <img src="${produto.product.image}" alt="item"/>
    </figure>
  <div class="produto-info">
      <h2 class="produto-titulo">${produto.product.title}</h2>
      <p class="produto-marca"><strong>Marca:</strong> ${produto.product.brand}</p>
      <hr>
      <h2 class="produto-preco">${brl}</h2>
      <p class="produto-desconto">10% de desconto para pagamento no pix</p>
      <div class="btn-action">
      <button class="botao-add-detalhes" data-id="${produto.product.id}">Adicionar ao Carrinho</button>
      <button class="botao-comprar" data-id="${produto.product.id}">Comprar Agora</button>
    </div>
    <hr>
      <div class="produto-descricao">
        <h3>Descrição do Produto</h3>
        <p>${produto.product.description}</p>
    </div>
  </div>
  </div> `;

  produtoClicado.innerHTML = div;

  // Passar o ID do produto corretamente
  configurarBotoesAdicionarDoDetalhes(produto.product.id);
}


// async function carregarDetalhesProduto() {

//     const produtoDetalhes = document.getElementById('produto-detalhes');

//     if (!produtoId) {
//         produtoDetalhes.innerHTML = '<p>Produto não encontrado</p>';
//         return;
//     }

//     try {
//         const response = await fetch(`https://fakestoreapi.in/api/products/${produtoId}`);
//         const produto = await response.json();
//         let detalhesHTML = '';

//         // Acessando o array de produtos e usando forEach
//         produto.product.forEach(produto => {
// const brl = produto.price.toLocaleString('pt-br', {
//     style: 'currency',
//     currency: 'BRL'
// });

//             // Criando elementos do produto
//             detalhesHTML += `
// <div class="produto-imagem">
//     <img src="${produto.image}" alt="${produto.title}">
// </div>
// <div class="produto-info">
//     <h1 class="produto-titulo">${produto.title}</h1>
//     <div class="produto-detalhes">
//         <p class="produto-categoria">
//             <strong>Categoria:</strong> ${produto.category}
//         </p>
//         <p class="produto-marca">
//             <strong>Marca:</strong> ${produto.brand}
//         </p>
//     </div>
//     <div class="produto-preco-container">
//         <h2 class="produto-preco">${brl}</h2>
//         <p class="produto-desconto">10% de desconto para pagamento no pix</p>
//         <p class="produto-preco-pix">
//             ${(brl * 0.9)} no pix
//         </p>
//     </div>
//     <div class="produto-descricao">
//         <h3>Descrição do Produto</h3>
//         <p>${produto.description}</p>
//     </div>
//     <div class="produto-acoes">
//         <button class="botao-adicionar" data-id="${produto.id}">
//             Adicionar ao Carrinho
//         </button>
//         <button class="botao-comprar" data-id="${produto.id}">
//             Comprar Agora
//         </button>
//     </div>
// </div>
//         `;

//         // Configurando os botões após renderizar o HTML
//         produtoDetalhes.innerHTML = detalhesHTML;

//         // Configurar eventos dos botões
//     const btns = document.querySelectorAll('.botao-adicionar, .botao-comprar');
//     btns.forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             if (e.target.classList.contains('botao-adicionar')) {
//                 adicionarAoCarrinho(produto);
//             } else if (e.target.classList.contains('botao-comprar')) {
//                 adicionarAoCarrinho(produto);
//                 window.location.href = '/checkout.html';
//             }
//         });
//     });
// });

// } catch (erro) {
//     console.error('Erro ao carregar detalhes do produto:', erro);
//     produtoDetalhes.innerHTML = `
//         <div class="erro-container">
//             <h2>Ops! Algo deu errado</h2>
//             <p>Não foi possível carregar os detalhes do produto.</p>
//             <p>Erro: ${erro.message}</p>
//             <button onclick="window.location.reload()">Tentar Novamente</button>
//         </div>
//         `;
//     }
// }

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrinho();
  listarProduto()
});