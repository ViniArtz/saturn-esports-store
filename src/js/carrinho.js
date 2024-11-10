// Variável global do carrinho
let carrinho = [];

// Elementos do DOM
const getElementos = () => ({
    btnCarrinho: document.querySelector('.btn-menu'),
    btnFlutuante: document.querySelector('.btn-flutuante')
});

// Inicialização do carrinho
function inicializarCarrinho() {
    const elementos = getElementos();

    if (elementos.btnCarrinho) {
        elementos.btnCarrinho.addEventListener('click', exibirCarrinhoAoClicar);
    }

    if (elementos.btnFlutuante) {
        elementos.btnFlutuante.addEventListener('click', exibirCarrinhoAoClicar);
    }

    carregarCarrinho();
}


function exibirCarrinhoAoClicar() {
    const docCarrinho = document.querySelector('.carrinho');
    docCarrinho.style.display = 'block';
    exibirCarrinho();
}

function ocultarCarrinho() {
    const carrinhoEl = document.querySelector('.carrinho');
    if (carrinhoEl) {
        carrinhoEl.style.display = 'none';
    }
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
                     <button class="finalizar">Finalizar Compras</button>
                      <button class="limpar">Limpar Carrinho</button>`;


    docCarrinho.innerHTML = carrinhoHTML;
    configurarBotoesRemover();
    configurarBotoesLimpar()
}

// Funções de manipulação do carrinho
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

function limparCarrinho() {
    const carrinhoLen = (carrinho.length = 0)
    exibirCarrinho()
}

// Funções de eventos
function configurarBotoesRemover() {
    const btnRemover = document.querySelectorAll('.remover-item');
    btnRemover.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const produtoId = e.target.getAttribute('data-id');
            diminuirQuantidade(Number(produtoId));
        });
    });

    const btnFechar = document.querySelector('.fechar');
    if (btnFechar) {
        btnFechar.addEventListener('click', ocultarCarrinho);
    }
}

function configurarBotoesLimpar() {
    const btnLimpar = document.querySelector('.limpar');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparCarrinho);
    }
    salvarCarrinho()
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

// Funções de armazenamento
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

// Funções auxiliares
function somaCarrinho() {
    return carrinho.reduce((soma, produto) => {
        return soma + (produto.price * produto.quantidade);
    }, 0);
}

// Exportar funções que serão usadas em outros arquivos
export {
    inicializarCarrinho,
    adicionarAoCarrinho,
    configurarBotoesAdicionar,
    exibirCarrinho,
    carregarCarrinho,
    salvarCarrinho
};