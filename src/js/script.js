const limitProducts = '/products?limit=10'
const btnCarrinho = document.querySelector('.btn')
let value = localStorage
console.log(value);
let carrinho = []

btnCarrinho.addEventListener('click', exibirCarrinhoAoClicar)

//Rota Produtos
async function apiFetchProdutos() {
  const response = await fetch(`https://fakestoreapi.in/api/products`)
  const produtos = await response.json()
  // console.log(produtos);

  return produtos
}

// Lista de Produtos

async function listaProdutos() {
  const docLista = document.querySelector('.lista-produtos')
  const produtos = await apiFetchProdutos()

  let div = ''

  docLista.innerHTML = '<p>Carregando Produtos...</p>'

  produtos.products.forEach(produto => {
    const brl = produto.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    const tituloLimitado = produto.title.length > 30 ? produto.title.substring(0, 30) + '...' : produto.title
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
        `
  })

  docLista.innerHTML = div;

  // Botões de adicionar ao carrinho

  const btnAdicionar = document.querySelectorAll('.botao-adicionar')
  btnAdicionar.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carrinhoEl = document.querySelector('.carrinho')
      const produtoId = e.target.getAttribute('data-id')
      const produtoSelecionado = produtos.products.find(produto => produto.id == produtoId)
      adicionarAoCarrinho(produtoSelecionado)
      if (carrinhoEl.style.display === 'none') {
        exibirCarrinhoAoClicar()
      } else { }
    })
  })

}


// Funcao diminuir quantidade

function diminuirQuantidade(produtoId) {
  const produtoExistente = carrinho.find(item => item.id === produtoId)

  if (produtoExistente) {
    if (produtoExistente.quantidade > 1) {
      produtoExistente.quantidade -= 1

    } else {
      // Se a quantidade for 1, remove o item do carrinho
      removerDoCarrinho(produtoId)
    }
  }

  // Atualiza a exibição do carrinho
  exibirCarrinho()
  salvarCarrinho()
}

// funcao Armazenar Carrinho 

function salvarCarrinho() {
  if (carrinho.length > 0) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
  } else {
    localStorage.removeItem('carrinho') // Remove do localStorage se estiver vazio
  }
}

// Funcao que chama os itens do local storage

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem('carrinho')
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo) // Converte de volta para array de objetos
    exibirCarrinho() // Exibe o carrinho recuperado
  }
}

window.onload = carregarCarrinho


// Funcao Mostrar/Ocultar Carrinho

function exibirCarrinhoAoClicar() {
  const docCarrinho = document.querySelector('.carrinho')

  if (!docCarrinho) {
    criarCarrinho()
  } else {
    docCarrinho.style.display = 'block'
  }

  exibirCarrinho()
}

function ocultarCarrinho() {
  const carrinhoEl = document.querySelector('.carrinho')
  carrinhoEl.style.display = 'none'
}

// Funcao de Remover do Carrinho

function removerDoCarrinho(produtoId) {
  carrinho = carrinho.filter(produto => produto.id !== produtoId)
}

//Somar carrinho

function somaCarrinho() {
  const total = carrinho.reduce((soma, produto) => {
    return soma + (produto.price * produto.quantidade)
  }, 0)
  return total
}

//Adicionar Produto ao Carrinho

function adicionarAoCarrinho(produto) {
  const carrinhoEl = document.querySelector('.carrinho')
  if (!carrinhoEl) {
    criarCarrinho()
  }

  const produtoSelecionado = carrinho.find(item => item.id === produto.id)

  if (produtoSelecionado) {
    produtoSelecionado.quantidade += 1
  } else {
    carrinho.push({ ...produto, quantidade: 1 })
  }
  exibirCarrinho()
  salvarCarrinho()
}

// Funcao de Remover do Carrinho

function removerDoCarrinho(produtoId) {
  carrinho = carrinho.filter(produto => produto.id !== produtoId)
}

// Função de criar o elemento carrinho

function criarCarrinho() {
  const containerEl = document.querySelector('.container')
  const divCarrinho = document.createElement('ul')
  divCarrinho.classList.add('carrinho')
  divCarrinho.style.display = 'block';

  containerEl.appendChild(divCarrinho)
}

// Exibir Carrinho
function exibirCarrinho() {
  const docCarrinho = document.querySelector('.carrinho')
  let carrinhoHTML = '<h2>Carrinho de Compras</h2><button class="fechar">x</button>'

  if (carrinho.length === 0) {

    carrinhoHTML += '<p>O carrinho está vazio</p>'

  } else {
    carrinho.forEach(produto => {
      const brl = produto.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      const tituloLimitado = produto.title.length > 20 ? produto.title.substring(0, 20) + '...' : produto.title
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
      `
    })
  }
  const totalCarrinho = somaCarrinho().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  carrinhoHTML += `<h3 class="total">Total: ${totalCarrinho}</h3>
  <button class="continuar">Continuar comprando</button>
  <button class="finalizar">Finalizar Compras</button>
  `

  docCarrinho.innerHTML = carrinhoHTML

  const btnRemover = document.querySelectorAll('.remover-item')
  btnRemover.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const produtoId = e.target.getAttribute('data-id')
      diminuirQuantidade(Number(produtoId)) // Remove o item do carrinho
    })
  })

  const btnFechar = document.querySelector('.fechar')
  btnFechar.addEventListener('click', ocultarCarrinho)
}


listaProdutos()
