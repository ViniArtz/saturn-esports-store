import { inicializarCarrinho, adicionarAoCarrinho, } from './carrinho.js';
// import { carregarTemaSalvo } from './script.js';

const params = new URLSearchParams(window.location.search);
const produtoId = params.get('id');

async function fetchProdutoDetalhes() {
  try {
    const response = await fetch(`https://fakestoreapi.in/api/products/${produtoId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do produto');
    }
    const produto = await response.json();
    return produto; // Retorna o objeto que contém 'product'
  } catch (error) {
    console.error('Erro:', error);
    return null; // Retorna null em caso de erro
  }
}

async function listarProduto() {
  const produtoClicado = document.querySelector('.produto-clicado');
  const produto = await fetchProdutoDetalhes();
  const detalhesProduto = produto.product;
  const tituloPagina = document.querySelector('title')
  tituloPagina.innerText = `${detalhesProduto.title}`

  if (!produto) {
    produtoClicado.innerHTML = '<p>Erro ao carregar produto.</p>';
    return;
  }
  const brl = detalhesProduto.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  let div = `
  <div class="produto-content">
    <figure class="produto-imagem">
      <img src="${detalhesProduto.image}" alt="item"/>
    </figure>
    <div class="produto-info">
      <h2 class="produto-titulo">${detalhesProduto.title}</h2>
      <p class="produto-marca"><strong>Marca:</strong> ${detalhesProduto.brand}</p>
      <hr>
      <h2 class="produto-preco">${brl}</h2>
      <p class="produto-desconto">10% de desconto para pagamento no pix</p>
      <div class="btn-action">
        <button class="botao-add-detalhes" data-id="${detalhesProduto.id}">Adicionar ao Carrinho</button>
      </div>
      <hr>
      <div class="produto-descricao">
        <h3>Descrição do Produto</h3>
        <p>${detalhesProduto.description}</p>
      </div>
    </div>
  </div>`;

  produtoClicado.innerHTML = div;

  configurarBotoesAdicionarDetalhes(detalhesProduto);
}

function configurarBotoesAdicionarDetalhes(produto) {
  const btnAdicionar = document.querySelectorAll('.botao-add-detalhes');
  btnAdicionar.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const produtoId = e.target.getAttribute('data-id');
      // Verifique se o id corresponde
      if (produto.id.toString() === produtoId) {
        adicionarAoCarrinho(produto);
      }
    });
  });
}

// Configurações de tema
const btnMudarTema = document.getElementById('mudar-tema');
const stylesheet = document.getElementById('theme-stylesheet');

btnMudarTema.addEventListener('click', () => {
  // Verifica o caminho atual do CSS
  const currentTheme = stylesheet.getAttribute('href');

  // Alterna entre os temas claro e escuro
  if (currentTheme === './src/css/temaEscuro.css') {
    stylesheet.setAttribute('href', './src/css/temaClaro.css');
    localStorage.setItem('theme', './src/css/temaClaro.css');
  } else {
    stylesheet.setAttribute('href', './src/css/temaEscuro.css');
    localStorage.setItem('theme', './src/css/temaEscuro.css');
  }
});

function carregarTemaSalvoDetalhes() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    stylesheet.setAttribute('href', savedTheme);
  } else {
    stylesheet.setAttribute('href', './src/css/temaEscuro.css');
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  carregarTemaSalvoDetalhes()
  inicializarCarrinho();
  listarProduto();
});