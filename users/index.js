const express = require('express')
const router = express.Router()
const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userForm.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)

    const { name, age } = req.body
    console.log(`o nome enviado foi: ${name} e a idade foi: ${age}`)

    res.send('Posted.')
})

router.get('/:id', (req, res) => {
    // acessando os parâmetros da URL
    const id = req.params.id

    //leitura da tabela users, resgatar um usuário
    console.log(`buscando usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

module.exports = router