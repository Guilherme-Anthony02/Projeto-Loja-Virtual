//PEGANDO O INPUT CEP DO DOM
const inputCep = document.querySelector('#cep')
const formPessoa = document.querySelector('#form-pessoa')

//CAPTURANDO O EVENTO AO PERDER O FOCO
inputCep.addEventListener('change', (evt) => {
    //PEGANDO OS NÚMEROS DO INPUT NÃO PERMITINDO OUTRO TIPO DE DADOS QUE NÃO SEJA DÍGITO
    const numCep = evt.target.value.replace(/\D/g, '')

    //VERIFICA SE SÃO 8(OITO) DÍGITOS
    if (numCep.length !== 8) {
        alert('CEP INVÁLIDO !!!')
        return
    }

    //CHAMA A FUNÇÃO buscaDadosCep
    buscaDadosCep(numCep)
})

//BUSCAR OS DADOS DOS CEP NO VIACEP
const buscaDadosCep = async (cep) => {
    //TENTA BUSCAS OS DADOS NO VIACEP
    try {

        //BUSCA OS DADOS NO VIA CEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        //CONVERTE OS DADOS NO FORMATO json
        const dadosEndereco = await response.json()

        //CHAMA A FUNÇÃO exibeDados
        exibeDados(dadosEndereco)
        //CASO HAJA ALGUM ERRO É CAPTURADO PELO catch
    } catch (erro) {
        console.log('ERRO APRESENTADO ', erro.message)
    }

}

//OBJETO LITERAL CAMPOS QUE CADA CHAVE REPRESENTA OS INPUTS DO DOM
const campos = {
    logradouro: document.querySelector('#logradouro'),
    bairro: document.querySelector('#bairro'),
    localidade: document.querySelector('#localidade'),
    uf: document.querySelector('#uf'),
}

//FUNÇÃO EXIBE DADOS
const exibeDados = (objDados) => {
    //PEGA A DIV PAI DOS ELEMENTOS DO ENDEREÇO
    const divEndereco = document.querySelector('#div-dados-endereco')
    //REMOVE DA DIV O CLASS OCULTO
    divEndereco.classList.remove('oculto')

    //PERCORRE O OBJETO, NO FORMATO JSON, DO VIDA CEP
    for (let chave in campos) {
        //ATRIBUI O VALOR AO INPUT
        campos[chave].value = objDados[chave]

        //BLOQUEIA OS INPUTS. NÃO PERMITE QUE O USUÁRIO APAGUE OS VALORES 
        campos[chave].disabled = objDados[chave]
    }

    document.querySelector('#num-residencia').focus()
}


formPessoa.addEventListener('reset', () => {
    //PEGA A DIV PAI DOS ELEMENTOS DO ENDEREÇO
    const divEndereco = document.querySelector('#div-dados-endereco')
    //REMOVE DA DIV O CLASS OCULTO
    divEndereco.classList.add('oculto')
})