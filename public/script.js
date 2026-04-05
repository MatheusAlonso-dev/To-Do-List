window.onload = function(){
    getTarefas()
}
const formulario = document.getElementById('formulario-tarefa')

function fecharModal(){
    document.getElementById("modal").classList.remove('modal-ativo')
    formulario.reset()
}

function abrirModal(){
    document.getElementById("modal").classList.add('modal-ativo')    
}

formulario.addEventListener('submit', function(event){
    const dados = new FormData(formulario)
    const dadosObj = Object.fromEntries(dados.entries())

    for(let [campo, valor] of dados.entries()){
        if(valor.trim() === ''){
            alert(`O campo ${campo} esta vazio!`)
            return
        }
    }
    console.log('Tudo preenchido!')

    fetch('/home',{
        method: 'POST',
        body: JSON.stringify(dadosObj),
        headers: {
            'content-type':'application/json'
        }
    })
    
    fecharModal()
})

async function getTarefas(){
    try{
        const res = await fetch('/todos')
        const dados = await res.json()

        const container = document.getElementById('container')
        container.innerHTML = ''

        dados.forEach(dado=>{
            const item = document.createElement('div')
            item.classList.add('container-item')

            item.innerHTML = `
                <div class="container-item-parte1">
                <p class="container-item-parte1-titulo">${dado.title}</p>
                <div class="container-item-parte1-tag"><p>${dado.priority}</p></div>
            </div>
            <div class="container-item-parte2">
                <p class="container-item-parte2-descricao">${dado.description}</p>
            </div>
            <div class="container-item-parte3">
                <div class="container-item-parte3-deletar">x</div>
                <div class="container-item-parte3-editar">Editar</div>
            </div>
            `

            container.appendChild(item)
        })

        console.log(dados)
    }catch (erro) {
        console.log(erro)
    }
}