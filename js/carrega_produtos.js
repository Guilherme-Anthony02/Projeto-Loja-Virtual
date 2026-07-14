//IMPORTANDO O ARRAY DOS PRODUTOS
import { produtos } from "./produtos.js";
//IMPORTANDO  O ARROW FUNCTION addItem
import { addItem } from "./carrinho.js";


const section_cards = document.querySelector('#cards')

const listarProdutos = () => {
    section_cards.innerHTML = ''
}

listarProdutos()

//FILTRANDO AS SEÇÕES COM A COLEÇÃO map
const listarSecoes = () => {

    //CRIANDO A COLEÇÃO MAP
    const secoesFiltrada = new Map()

    //PERCORRENDO O  ARRAY PRODUTOS E FILTRANDO AS SEÇÕES
    produtos.forEach((elem, i) => {
        secoesFiltrada.set(elem.id_secao, elem)

        //CRIANDO A CHAVE E O VALOR DA COLEÇÃO MAP A PARTIR DO ID DA SEÇÃO DA LISTA DE PRODUTOS
        secoesFiltrada.set(elem.id_secao, elem)
    })

    //CONVERTENDO O MAP EM ARRAY
    const secoesMenu = Array.from(secoesFiltrada.values())

    //ADICIONANDO A SEÇÃO TODOS
    secoesMenu.unshift({
        id_secao: 'todos',
        nome_secao: 'TODOS'
    })

    //RETORNANDO O ARRAY CONVERTIDO
    return secoesMenu
}

//MONTANDO OS LINKS SEÇÕES
const montarSecoes = () => {
    //PEGANDO O ELEMENTO DO DOM
    const ulMenu = document.querySelector('#menu-secoes')

    //LIMPANDO O ELEMENTO ulMenu
    ulMenu.innerHTML = ''

    //PERCORRENDO O ARRAY DAS SEÇÕES FILTRADA
    listarSecoes().forEach((elem, i) => {

        //CRIANDO O ELEMENTO li  
        const liSecao = document.createElement('li')

        //CRIANDO O ELEMENTO a
        const aSecao = document.createElement('a')
        aSecao.setAttribute('href', '#')
        aSecao.setAttribute('class', 'lnk-secao')
        aSecao.innerHTML = elem.nome_secao


        //CAPTURANDO O CLICK DOS LINKS
        aSecao.addEventListener('click', () => {

            if (elem.id_secao === 'todos') {
                montandoCards(produtos)
            } else {
                montandoCards(produtosFiltrados(elem.id_secao))
            }

        })

        //ADICIONANDO O ELEMENTO FILHO a NO ELEMENTO li
        liSecao.appendChild(aSecao)

        //ADICIONANDO O ELEMENTO FILHO li no ELEMENTO DO DOM ul
        ulMenu.appendChild(liSecao)
    })

}

montarSecoes()


//FILTRANDO PRODUTOS
const produtosFiltrados = (idSecao) => {
    return produtos.filter(elem => elem.id_secao === idSecao)
}

//MONTANDO CARDS
const montandoCards = (objProdutos) => {
    section_cards.innerHTML = ''

    objProdutos.forEach((elem, i) => {
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        const imgProduto = document.createElement('img')
        imgProduto.setAttribute('src', elem.caminho_da_imagem)
        imgProduto.setAttribute('alt', elem.descricao_produto)
        imgProduto.setAttribute('class', 'img_card')

        const h2Titulo = document.createElement('h2')
        h2Titulo.innerHTML = elem.descricao_produto

        const h3Valor = document.createElement('h3')
        h3Valor.setAttribute('class', 'valor_card')
        h3Valor.innerHTML = `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace
            ('.', '.')}`

        const btnCard = document.createElement('button')
        btnCard.setAttribute('class', 'btn_card')
        btnCard.innerHTML = 'Adicionar'

        btnCard.addEventListener('click',()=>{
            //ADICIONANDO UM OBJETO NO CARRINHO
            addItem(elem)
            
            //REDIRECIONA PARA PÁGINA carrinho.html
            window.location.href = "/paginas/carrinho.html"
        })

        divCard.appendChild(imgProduto)
        divCard.appendChild(h2Titulo)
        divCard.appendChild(h3Valor)
        divCard.appendChild(btnCard)

        section_cards.appendChild(divCard)


    })

}

// ==== PESQUISA ====

const campoPesquisa = document.querySelector('#txtPesquisa')

campoPesquisa.addEventListener('keyup', () => {

    const textoDigitado = campoPesquisa.value.toLowerCase().trim()

    if (textoDigitado === '') {
        montandoCards(produtos)
        return
    }

    const resultadoPesquisa = produtos.filter(produto =>
        produto.descricao_produto
            .toLowerCase()
            .includes(textoDigitado)
    )

    montandoCards(resultadoPesquisa)
})

