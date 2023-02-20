const express = require('express')


const dotenv = require('dotenv').config()
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const exphbs = require('express-handlebars')
const port = 3000
const mysql = require('mysql')
//const path = require('path')
//const basePath = path.join(__dirname, 'templates')
//const userRoutes = require('./users')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

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
app.use(express.static('public'))

// usando módulo externo de rotas
//app.use('/users', userRoutes)

app.get('/', (req, res) => {
    //res.send('olá mundo!')
    //res.sendFile(`${basePath}/index.html`)
    res.render('home')
})


const conn = mysql.createConnection({
    host: 'localhost',
    user: DB_USER,
    password: DB_PASS,
    dabatase: 'node-mysql0'
})


conn.connect(function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('conectou ao mysql!')
    }

    app.listen(port, () => {
        console.log(`listening to port ${port}`)
    })
})


app.use(function (req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})
