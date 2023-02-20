const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const basePath = path.join(__dirname, 'templates')

const userRoutes = require('./users')


//criando um middleware
// middleware possui função anônima com 3 params
const checkAuth = function(req, res, next) {
    req.authStatus = true

    if (req.authStatus) {
        console.log('está logado!')
        next()
    } else {
        console.log('não está logado!')
        next()
    }
}

//ler o body da requisição
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// arquivos estáticos
app.use(express.static('public'))

// usando módulo externo de rotas
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    //res.send('olá mundo!')
    res.sendFile(`${basePath}/index.html`)
})

app.use(function (req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

