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

    fetch('/push',{
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

/* buscar apenas tarefas high priority */
        const resHigh = await fetch('/high')
        const dadosHigh = await resHigh.json()

        const container = document.getElementById('container')
        container.innerHTML = ''

        dadosHigh.forEach(dado=>{
            const item = document.createElement('div')
            item.classList.add('container-item')

            item.innerHTML = `
                <div class="container-item-parte1">
                <p class="container-item-parte1-titulo">${dado.title}</p>
                <div class="container-item-parte1-tag tag-high"><p>${dado.priority}</p></div>
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

/* buscar apenas tarefas medium priority */
        const resMedium = await fetch('/medium')
        const dadosMedium = await resMedium.json()
        
        dadosMedium.forEach(dado=>{
            const item = document.createElement('div')
            item.classList.add('container-item')

            item.innerHTML = `
                <div class="container-item-parte1">
                <p class="container-item-parte1-titulo">${dado.title}</p>
                <div class="container-item-parte1-tag tag-medium"><p>${dado.priority}</p></div>
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

/* buscar apenas tarefas low priority */
        const resLow = await fetch('/low')
        const dadosLow = await resLow.json()
        
        dadosLow.forEach(dado=>{
            const item = document.createElement('div')
            item.classList.add('container-item')

            item.innerHTML = `
                <div class="container-item-parte1">
                <p class="container-item-parte1-titulo">${dado.title}</p>
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