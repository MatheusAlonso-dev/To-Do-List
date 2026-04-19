import express from 'express'
import mysql from 'mysql2'

const app = express()

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_to_do_list'
})

conexao.connect((erro)=>{
    if(erro){
        console.log('Erro ao conectar com banco de dados, erro: ', erro)
    }else{
        console.log('Conectado ao banco de dados MySql')
    }
})

import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.static('public'))

app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000")
})

// exibir pagina inicial
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// buscar todas as tarefas
app.get('/all',(req,res)=>{
    const sql = 'select * from tasks'

    conexao.query(sql, (erro, resultado)=>{
        if(erro){
            res.status(500).send(erro)
        }else{
            res.json(resultado)
        }
    })
})

// buscar apenas tarefas low priority
app.get('/low',(req,res)=>{
    const sql = "select * from tasks where priority = 'low' AND status = 'pending'"

    conexao.query(sql,(erro,resultado)=>{
        if(erro){
            res.status(500).send(erro)
        }else{
            res.json(resultado)
        }
    })
})

// buscar apenas tarefas medium priority
app.get('/medium',(req,res)=>{
    const sql = "select * from tasks where priority = 'medium' AND status = 'pending'"

    conexao.query(sql,(erro,resultado)=>{
        if(erro){
            res.status(500).send(erro)
        }else{
            res.json(resultado)
        }
    })
})

// buscar apenas tarefas high priority
app.get('/high',(req,res)=>{
    const sql = "select * from tasks where priority = 'high' AND status = 'pending'"

    conexao.query(sql,(erro,resultado)=>{
        if(erro){
            res.status(500).send(erro)
        }else{
            res.json(resultado)
        }
    })
})

// buscar apenas tarefas completed
app.get('/completed',(req,res)=>{
    const sql = "select * from tasks where status = 'completed'"

    conexao.query(sql,(erro,resultado)=>{
        if(erro){
            res.status(500).send(erro)
        }else{
            res.json(resultado)
        }
    })
})

// adicionar tarefa
app.post('/push',(req,res)=>{
    console.log(req.body.titulo)
    console.log(req.body.descricao)
    console.log(req.body.prioridade)

    res.send('dados recebidos')

    const sql = 'INSERT INTO tasks (title, description, priority) values(?, ?, ?)'

    conexao.query(sql,[req.body.titulo, req.body.descricao, req.body.prioridade])
})

app.put('/completed',(req,res)=>{

    res.send('dados recebidos para concluir')

    const sql = "UPDATE tasks SET status = ? WHERE id = ?"

    conexao.query(sql,['completed',req.body.id])
})

app.put('/update',(req,res)=>{
    console.log(req.body);
    const sql = "UPDATE tasks SET title = ?, description = ?, priority = ? WHERE id = ?"
    conexao.query(sql, [req.body.titulo, req.body.descricao, req.body.prioridade, req.body.idAtualizar])
    res.send('Atualizado com sucesso!')
})

app.get('/getTaskId/:id',(req,res)=>{
    const sql = 'SELECT * FROM tasks WHERE id = ?'

    conexao.query(sql,[req.params.id],(erro,resultado)=>{
        if(erro){
            res.status(500).send(erro)
        }else{
            res.json(resultado)
        }
    })

})