import express from 'express'
const app = express()

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
    console.log(req.body)
    res.send('dados recebidos')
})