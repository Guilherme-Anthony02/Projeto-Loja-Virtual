//CRIANDO O ARRAY DE ITENS DO CARRINHO
const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []

//FUNÇÃO PARA ADICIONAR O ITEM NO ARRAY
const addItem = (objItem) => {
    itensCarrinho.push(objItem)

    localStorage.setItem('itensSessao', itensCarrinho)
}

//LISTAR ITENS DO CARRINHO
const listItens = () => {
    const itensSelecionados = JSON.stringify(localStorage.getItem('itensSessao'))
    return itensSelecionados
}

//MONTANDO A TELA CARRINHO
const montaTelaCarrinho = () => {
    //PEGANDO ELEMENTOS DO DOM
    const sectionItensCarrinho = document.querySelector('#itens-carrinho')

    listItens().forEach((elem, i) => {


    const sectionItem = document.createElement('section')
    sectionItem.setAttribute('class', 'item')
    sectionItem.innerHTML = `<img src='${elem.caminho_da_imagem}' alt=${elem.descricao_produto}/> <p class=''descricao'>${elem.descricao_produto}</p> <p class='descricao'>${elem.descricao_produto}</p> <p class='vlr-unitario'>${elem.valor_unitario}</p> <input type="number" name='quant${i}' id='quant${i}' class="imput-item" value=${1}> <p class="tot-item">${elem.valor_unitario * 1}</p><img src="../imagens/icones/remover.png" alt="" class = "img-remover">`
});

}

export { addItem }