const formulario = document.getElementById('formulario-tarefa')

function fecharModal(){
    document.getElementById("modal").classList.remove('modal-ativo')
    formulario.reset()
}

function abrirModal(){
    document.getElementById("modal").classList.add('modal-ativo')    
}


formulario.addEventListener('submit', function(event){
    event.preventDefault()
    const dados = new FormData(formulario)
    const dadosObj = Object.fromEntries(dados.entries())

    fetch('/home',{
        method: 'POST',
        body: JSON.stringify(dadosObj),
        headers: {
            'content-type':'application/json'
        }
    })
    
    fecharModal()
})
