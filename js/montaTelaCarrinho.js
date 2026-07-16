import { listItens, removeItem, atualizarQuantidade } from "./carrinho.js";

const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

const atualizarResumoCarrinho = () => {
    const itens = listItens()
    const txtSubtotal = document.querySelector('#subtotal')
    const txtTotal = document.querySelector('#total')
    const taxaFrete = 15

    const subtotal = itens.reduce((acumulador, item) => {
        return acumulador + (item.valor_unitario * item.quantidade)
    }, 0)

    txtSubtotal.textContent = formatarMoeda(subtotal)
    txtTotal.textContent = formatarMoeda(subtotal + taxaFrete)
}

//MONTANDO A TELA CARRINHO
const montaTelaCarrinho = () => {
    //PEGANDO ELEMENTOS DO DOM
    const sectionItensCarrinho = document.querySelector('#itens-carrinho')

    sectionItensCarrinho.innerHTML = ''

    listItens().forEach((elem, i) => {
        const sectionItem = document.createElement('section')
        sectionItem.setAttribute('class', 'item')
        sectionItem.innerHTML = 
        `<img src='${elem.caminho_da_imagem}' alt=${elem.descricao_produto}/> 
        <p class='descricao'>${elem.descricao_produto}</p> 
        <p class='vlr-unitario'>${elem.valor_unitario}</p> 
        <input type="number" min="1" name='quant${i}' id='quant${i}' class="input-item" value=${elem.quantidade}/> 
        <p class="tot-item">${formatarMoeda(elem.valor_unitario * elem.quantidade)}</p>`

        const inputQuantidade = sectionItem.querySelector('.input-item')
        inputQuantidade.addEventListener('change', (evt) => {
            const novaQuantidade = Number(evt.target.value)

            if (novaQuantidade >= 1) {
                atualizarQuantidade(i, novaQuantidade)
                montaTelaCarrinho()
            } else {
                evt.target.value = elem.quantidade
            }
        })

        const imgRemover = document.createElement('img')
        imgRemover.setAttribute('src', '../imagens/icones/remover.png')
        imgRemover.setAttribute('alt', 'Remover')
        imgRemover.setAttribute('class', 'img-remover')

        imgRemover.addEventListener('click',()=>{
            if(confirm(`Deseja remover ${elem.descricao_produto} da sua lista? `)){
                removerItemCarrinho(i)
            }
        })

        sectionItem.appendChild(imgRemover)

        sectionItensCarrinho.appendChild(sectionItem)
    });

    atualizarResumoCarrinho()
}

const removerItemCarrinho = (pos)=>{
    removeItem(pos)

    montaTelaCarrinho() 
}

montaTelaCarrinho() 
