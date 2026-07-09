import { produtos } from "./produtos.js";

const section_cards = document.querySelector('#cards')

const listarProdutos = ()=>{
    section_cards.innerHTML = ''

    produtos.forEach((elem,i) =>{
        const divCard = document.createElement('div')
        divCard.setAttribute('class','card')

        const imgProduto = document.createElement('img')
        imgProduto.setAttribute('src',elem.caminho_da_imagem)
        imgProduto.setAttribute('alt', elem.descricao_produto)
        imgProduto.setAttribute('class', 'img_card')

        const h2Titulo = document.createElement('h2')
        h2Titulo.innerHTML = elem.descricao_produto

        const h3Valor = document.createElement('h3')
        h3Valor.setAttribute('class', 'valor_card')
        h3Valor.innerHTML = `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace
        ('.','.')}`

        const btnCard = document.createElement('button')    
        btnCard.setAttribute('class', 'btn_card')
        btnCard.innerHTML = 'Adicionar'    

            divCard.appendChild(imgProduto)
            divCard.appendChild(h2Titulo)
            divCard.appendChild(h3Valor) 
            divCard.appendChild(btnCard)
            
            section_cards.appendChild(divCard)
    })

}

listarProdutos()

//FILTRANDO AS SEÇÕES COM A COLEÇÃO map
const listarSecoes = () => {

    //CRIANDO A COLEÇÃO MAP
    const secoesFiltrada = new Map()
  
    //PERCORRENDO O  ARRAY PRODUTOS E FILTRANDO AS SEÇÕES
    produtos.forEach((elem, i) => {
      secoesFiltrada.set(elem.id_secao, elem)
    })
  
    //CONVERTENDO O MAP EM ARRAY
    const secoesMenu = Array.from(secoesFiltrada.values())
  
    //RETORNANDO  O ARRAY CONVERTIDO
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
        
      //CRIANDO O ELEMENTO
      const aSecao = document.createElement('a')
      aSecao.setAttribute('href', '#')
      aSecao.setAttribute('class', 'lnk-secao')
      aSecao.innerHTML = elem.nome_secao
  
      aSecao.addEventListener('click', () => {
        //PARA TESTE
        console.log(elem.id_secao)
  
      })
  
      liSecao.appendChild(aSecao)
  
      ulMenu.appendChild(liSecao)
    })
  
  }
  
  montarSecoes()
  
  