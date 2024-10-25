const limitProducts = '/products?limit=10';
const btnCarrinho = document.querySelector('.btn');
const btnFlutuante = document.querySelector('.btn-flutuante');
let carrinho = [];

btnCarrinho.addEventListener('click', exibirCarrinhoAoClicar);
btnFlutuante.addEventListener('click', exibirCarrinhoAoClicar);
window.onload = carregarCarrinho;

// Rota Produtos
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
        <a href="#"><img src="${produto.image}" alt=""></a>
        <div class="brand">
          <h2>${tituloLimitado}</h2>
          <span class="categoria-produto"><b>Categoria:</b> ${produto.category}</span>
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

function configurarBotoesAdicionar(produtos) {
  const btnAdicionar = document.querySelectorAll('.botao-adicionar');
  btnAdicionar.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const produtoId = e.target.getAttribute('data-id');
      const produtoSelecionado = produtos.find(produto => produto.id == produtoId);
      adicionarAoCarrinho(produtoSelecionado);
    });
  });
}

// Funções do Carrinho
function exibirCarrinhoAoClicar() {
  const docCarrinho = document.querySelector('.carrinho');
  if (!docCarrinho) {
    criarCarrinho();
  } else {
    docCarrinho.style.display = 'block';
  }
  exibirCarrinho();
}

function ocultarCarrinho() {
  const carrinhoEl = document.querySelector('.carrinho');
  carrinhoEl.style.display = 'none';
}

function exibirCarrinho() {
  const docCarrinho = document.querySelector('.carrinho');
  let carrinhoHTML = '<h2>Carrinho de Compras</h2><button class="fechar">x</button>';

  if (carrinho.length === 0) {
    carrinhoHTML += '<p>O carrinho está vazio</p>';
  } else {
    carrinho.forEach(produto => {
      const brl = produto.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      const tituloLimitado = produto.title.length > 20 ? produto.title.substring(0, 20) + '...' : produto.title;
      carrinhoHTML += `
        <div class="item-carrinho">
          <img src="${produto.image}" alt="">
          <div class="info">
            <h5>${tituloLimitado}</h5>
            <p>${produto.quantidade}x</p>
            <p class="valor">${brl}</p>
            <button class="remover-item" data-id="${produto.id}">Excluir</button>
          </div>
        </div>
      `;
    });
  }

  const totalCarrinho = somaCarrinho().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  carrinhoHTML += `<h3 class="total">Total: ${totalCarrinho}</h3>
                   <button class="continuar">Continuar comprando</button>
                   <button class="finalizar">Finalizar Compras</button>`;

  docCarrinho.innerHTML = carrinhoHTML;
  configurarBotoesRemover();
}

function configurarBotoesRemover() {
  const btnRemover = document.querySelectorAll('.remover-item');
  btnRemover.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const produtoId = e.target.getAttribute('data-id');
      diminuirQuantidade(Number(produtoId));
    });
  });

  const btnFechar = document.querySelector('.fechar');
  btnFechar.addEventListener('click', ocultarCarrinho);
}

// Funções do Carrinho (Adicionar, Remover, Diminuir)
function adicionarAoCarrinho(produto) {
  const produtoSelecionado = carrinho.find(item => item.id === produto.id);
  if (produtoSelecionado) {
    produtoSelecionado.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }
  exibirCarrinho();
  salvarCarrinho();
}

function diminuirQuantidade(produtoId) {
  const produtoExistente = carrinho.find(item => item.id === produtoId);
  if (produtoExistente) {
    if (produtoExistente.quantidade > 1) {
      produtoExistente.quantidade -= 1;
    } else {
      removerDoCarrinho(produtoId);
    }
  }
  exibirCarrinho();
  salvarCarrinho();
}

function removerDoCarrinho(produtoId) {
  carrinho = carrinho.filter(produto => produto.id !== produtoId);
}

// Funções de Armazenamento
function salvarCarrinho() {
  if (carrinho.length > 0) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  } else {
    localStorage.removeItem('carrinho');
  }
}

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
    exibirCarrinho();
  }
}

// Funções Auxiliares
function somaCarrinho() {
  return carrinho.reduce((soma, produto) => {
    return soma + (produto.price * produto.quantidade);
  }, 0);
}

// Função de Criar o Elemento Carrinho
function criarCarrinho() {
  const containerEl = document.querySelector('.container');
  const divCarrinho = document.createElement('ul');
  divCarrinho.classList.add('carrinho');
  divCarrinho.style.display = 'block';
  containerEl.appendChild(divCarrinho);
}

// Iniciar a Lista de Produtos
listaProdutos();
