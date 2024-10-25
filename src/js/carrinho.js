// // Funcao diminuir quantidade

// export function diminuirQuantidade(produtoId) {
//     const produtoExistente = carrinho.find(item => item.id === produtoId)
  
//     if (produtoExistente) {
//       if (produtoExistente.quantidade > 1) {
//         produtoExistente.quantidade -= 1
  
//       } else {
//         // Se a quantidade for 1, remove o item do carrinho
//         removerDoCarrinho(produtoId)
//       }
//     }
  
//     // Atualiza a exibição do carrinho
//     exibirCarrinho()
//     salvarCarrinho()
//   }
  
//   // funcao Armazenar Carrinho 
  
//   export function salvarCarrinho() {
//     if (carrinho.length > 0) {
//       localStorage.setItem('carrinho', JSON.stringify(carrinho))
//     } else {
//       localStorage.removeItem('carrinho') // Remove do localStorage se estiver vazio
//     }
//   }
  
  
//   // Funcao Mostrar/Ocultar Carrinho
  
//   export function exibirCarrinhoAoClicar() {
//     const docCarrinho = document.querySelector('.carrinho')
  
//     if (!docCarrinho) {
//       criarCarrinho()
//     } else {
//       docCarrinho.style.display = 'block'
//     }
  
//     exibirCarrinho()
//   }
  
//   export function ocultarCarrinho() {
//     const carrinhoEl = document.querySelector('.carrinho')
//     carrinhoEl.style.display = 'none'
//   }
  
//   //Somar carrinho
  
//   export function somaCarrinho() {
//     const total = carrinho.reduce((soma, produto) => {
//       return soma + (produto.price * produto.quantidade)
//     }, 0)
//     return total
//   }