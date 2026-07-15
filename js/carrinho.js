//localStorage.removeItem("itensSessao");
//localStorage.clear()

//CRIANDO O ARRAY DE ITENS DO CARRINHO
const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []

//const itensCarrinho = JSON.parse(sessionStorage.getItem('itensSessao')) || []


//FUNÇÃO PARA ADICIONAR O ITEM NO ARRAY E NÃO ADICIONAR ITENS REPETIDOS
const addItem = (objItem) => {

    let itemExistente = ''

    itensCarrinho.forEach(item => {
        if(item.id_produto === objItem.id_produto){
            itemExistente = item
        }
    })

    if(itemExistente){
        itemExistente.quantidade++
    }else{
        objItem.quantidade = 1
        itensCarrinho.push(objItem)
    }

    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))
}

//LISTAR ITENS DO CARRINHO
const listItens = () => {

    const itensSelecionados = JSON.parse(localStorage.getItem('itensSessao')) || []

    //const itensSelecionados = JSON.parse(sessionStorage.getItem('itensSessao')) || []

    return itensSelecionados
}

//REMOVER ELEMENTO
const removeItem = (pos)=>{
    itensCarrinho.splice(pos, 1)

    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))

}


export { addItem, listItens, removeItem }