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


app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/home',(req,res)=>{
    console.log(req.body.titulo)
    console.log(req.body.descricao)
    console.log(req.body.prioridade)

    res.send('dados recebidos')

    const sql = 'INSERT INTO tasks (title, description, priority) values(?, ?, ?)'

    conexao.query(sql,[req.body.titulo, req.body.descricao, req.body.prioridade])
})