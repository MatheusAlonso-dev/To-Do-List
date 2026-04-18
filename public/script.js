window.onload = function(){
    setFiltros()
}
const formulario = document.getElementById('formulario-tarefa')


let filtroLow = false
let filtroMedium = false
let filtroHigh = false
let filtroConcluidos = false


function fecharModal(){
    document.getElementById("modal").classList.remove('modal-ativo')
    document.body.style.overflow = 'auto'
    formulario.reset()
}

function abrirModal(){
    document.getElementById("modal").classList.add('modal-ativo')
    document.body.style.overflow = 'hidden'  
}

function setFiltros(){
    filtro = document.getElementById("filtro")
    valor = filtro.value

    switch(valor){
        case "pendentes":
            filtroLow = true
            filtroMedium = true
            filtroHigh = true
            filtroConcluidos = false            
        break

        case "baixa":
            filtroLow = true
            filtroMedium = false
            filtroHigh = false
            filtroConcluidos = false    
        break

        case "media":
            filtroLow = false
            filtroMedium = true
            filtroHigh = false
            filtroConcluidos = false
        break

        case "alta":
            filtroLow = false
            filtroMedium = false
            filtroHigh = true
            filtroConcluidos = false
        break

        case "concluidas":
            filtroLow = false
            filtroMedium = false
            filtroHigh = false
            filtroConcluidos = true
        break

        default:
            filtroLow = true
            filtroMedium = true
            filtroHigh = true
            filtroConcluidos = false
        break
    }

    getTarefas()

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

        const container = document.getElementById('container')
        container.innerHTML = ''

/* buscar apenas tarefas high priority */
        if(filtroHigh === true){
            const resHigh = await fetch('/high')
            const dadosHigh = await resHigh.json()
            dadosHigh.forEach(dado=>{
                const idTarefa = dado.id
                console.log(idTarefa)
                
                const item = document.createElement('div')
                item.classList.add('container-item')
                item.classList.add(`task-id-${idTarefa}`)

                item.innerHTML = `
                    <div class="container-item-parte1">
                    <p class="container-item-parte1-titulo">${dado.title}</p>
                    <div class="container-item-parte1-tag tag-high"><p>${dado.priority}</p></div>
                </div>
                <div class="container-item-parte2">
                    <p class="container-item-parte2-descricao">${dado.description}</p>
                </div>
                <div class="container-item-parte3">
                    <div class="container-item-parte3-botao excluir-item">x</div>
                    <div class="container-item-parte3-botao editar-item">Editar</div>
                    <div class="container-item-parte3-botao concluir-item">Concluir<br>✔</div>
                </div>
                `

                container.appendChild(item)
            })

        }

        

/* buscar apenas tarefas medium priority */
        if(filtroMedium === true){
            const resMedium = await fetch('/medium')
            const dadosMedium = await resMedium.json()
            
            dadosMedium.forEach(dado=>{
                const idTarefa = dado.id
                console.log(idTarefa)

                const item = document.createElement('div')
                item.classList.add('container-item')
                item.classList.add(`task-id-${idTarefa}`)

                item.innerHTML = `
                    <div class="container-item-parte1">
                    <p class="container-item-parte1-titulo">${dado.title}</p>
                    <div class="container-item-parte1-tag tag-medium"><p>${dado.priority}</p></div>
                </div>
                <div class="container-item-parte2">
                    <p class="container-item-parte2-descricao">${dado.description}</p>
                </div>
                <div class="container-item-parte3">
                    <div class="container-item-parte3-botao excluir-item">x</div>
                    <div class="container-item-parte3-botao editar-item">Editar</div>
                    <div class="container-item-parte3-botao concluir-item">Concluir<br>✔</div>
                </div>
                `

                container.appendChild(item)
            })

        }

        

/* buscar apenas tarefas low priority */
        if(filtroLow === true){
            const resLow = await fetch('/low')
            const dadosLow = await resLow.json()
            
            dadosLow.forEach(dado=>{
                const idTarefa = dado.id
                console.log(idTarefa)

                const item = document.createElement('div')
                item.classList.add('container-item')
                item.classList.add(`task-id-${idTarefa}`)

                item.innerHTML = `
                    <div class="container-item-parte1">
                    <p class="container-item-parte1-titulo">${dado.title}</p>
                </div>
                <div class="container-item-parte2">
                    <p class="container-item-parte2-descricao">${dado.description}</p>
                </div>
                <div class="container-item-parte3">
                    <div class="container-item-parte3-botao excluir-item">x</div>
                    <div class="container-item-parte3-botao editar-item">Editar</div>
                    <div class="container-item-parte3-botao concluir-item">Concluir<br>✔</div>
                </div>
                `
                container.appendChild(item)
            })
        }

/* buscar apenas tarefas concluidas */
        if(filtroConcluidos === true){
            const resCompleted = await fetch('/completed')
            const dadosCompleted = await resCompleted.json()

            dadosCompleted.forEach(dado=>{
                const idTarefa = dado.id
                console.log(idTarefa)

                const item = document.createElement('div')
                item.classList.add('container-item')
                item.classList.add(`task-id-${idTarefa}`)

                item.innerHTML = `
                    <div class="container-item-parte1">
                    <p class="container-item-parte1-titulo">${dado.title}</p>
                </div>
                <div class="container-item-parte2">
                    <p class="container-item-parte2-descricao">${dado.description}</p>
                </div>
                <div class="container-item-parte3">
                    <div class="container-item-parte3-botao excluir-item">x</div>
                    <div class="container-item-parte3-botao editar-item">Editar</div>
                    <div class="container-item-parte3-botao concluir-item">Concluir<br>✔</div>
                </div>
                `
                container.appendChild(item)

            })
        }
        

    }catch (erro) {
        console.log(erro)
    }
}

document.addEventListener('click', function(event){
    if(event.target.classList.contains('excluir-item')){
        const task = event.target.closest(".container-item")

        const classeId = [...task.classList]
            .find(c => c.startsWith("task-id-"));
        
        const id = classeId.replace('task-id-','')

        console.log('excluir: ', id)
    }

    if(event.target.classList.contains('editar-item')){
        const task = event.target.closest(".container-item")

        const classeId = [...task.classList]
            .find(c => c.startsWith("task-id-"));
        
        const id = classeId.replace('task-id-','')

        console.log('editar: ', id)
    }

    if(event.target.classList.contains('concluir-item')){
        const task = event.target.closest(".container-item")

        const classeId = [...task.classList]
            .find(c => c.startsWith("task-id-"));
        
        const id = classeId.replace('task-id-','')

        console.log('concluir: ', id)
    }
})