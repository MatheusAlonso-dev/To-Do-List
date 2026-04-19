window.onload = function(){
    setFiltros()
}
const formulario = document.getElementById('formulario-tarefa')
let filtro = document.getElementById("select-filtro")
let editarTarefa = false
let idEditar


let filtroLow = false
let filtroMedium = false
let filtroHigh = false
let filtroConcluidos = false


function fecharModal(){
    document.getElementById("modal").classList.remove('modal-ativo')
    document.body.style.overflow = 'auto'
    formulario.reset()
    editarTarefa = false
    document.getElementById('titulo-modal').textContent = 'Adicionar tarefa'
}

function abrirModal(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    document.getElementById("modal").classList.add('modal-ativo')
    document.body.style.overflow = 'hidden'  
}

function atualizarTarefa(){
    document.getElementById('titulo-modal').textContent = 'Atualizar tarefa'

    fetch(`/getTaskId/${idEditar}`)
    .then(res => res.json())
    .then(data => {
        
        const tarefa = data[0]
        document.getElementById('titulo-formulario').value = tarefa.title
        document.getElementById('descricao-formulario').value = tarefa.description
        document.getElementById('prioridade-formulario').value = tarefa.priority

        abrirModal()
        editarTarefa = true
    });    


}

function setFiltros(){    
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

filtro.addEventListener('change', async function(){
    setFiltros()
})

formulario.addEventListener('submit', function(event){

    event.preventDefault();
    const dados = new FormData(formulario)

    for(let [campo, valor] of dados.entries()){
        if(valor.trim() === ''){
            alert(`O campo ${campo} esta vazio!`)
            return
        }
    }

    console.log('Tudo preenchido!')

    if(editarTarefa === true){
        if(confirm('Tem certeza que deseja atualizar tarefa?')){
            dados.append('idAtualizar', idEditar)
            const dadosObj = Object.fromEntries(dados.entries())
            fetch('/update',{
                method: 'PUT',
                body: JSON.stringify(dadosObj),
                headers: {
                    'content-type':'application/json'
                }
            })
            .then(res => res.text())
            .then(data => console.log(data));
            fecharModal()
            getTarefas()            
        }
    }else{
        if(confirm('Tem certeza que deseja adicionar tarefa?')){
            const dadosObj = Object.fromEntries(dados.entries())
            fetch('/push',{
                method: 'POST',
                body: JSON.stringify(dadosObj),
                headers: {
                    'content-type':'application/json'
                }
            })
            .then(res => res.text())
            .then(data => console.log(data));
            fecharModal()
            getTarefas()
        }
    }    
    
    
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
                    <div class="container-item-parte1-tag tag-completed"><p>${dado.status}</p></div>
                </div>
                <div class="container-item-parte2">
                    <p class="container-item-parte2-descricao">${dado.description}</p>
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
        
        idEditar = classeId.replace('task-id-','')
        atualizarTarefa()

        console.log('editar: ', idEditar)
    }

    if(event.target.classList.contains('concluir-item')){
        const task = event.target.closest(".container-item")

        const classeId = [...task.classList]
            .find(c => c.startsWith("task-id-"));
        
        const id = classeId.replace('task-id-','')

        console.log('concluir: ', id)

        if(confirm("Tem certeza que deseja concluir?")){
            fetch('/completed',{
                method: 'PUT',
                body: JSON.stringify({id: id}),
                headers: {
                    'content-type':'application/json'
                }
            })
            .then(res => res.text())
            .then(data => console.log(data));
        }

        setFiltros()       
        
    }
})