const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const passport = require('passport')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')

const app = express()

// Connexion à la base de donnée
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotici'
})

db.connect((err) => {
    if(err) { throw err}
    console.log('Connecté à la base de donnée de Spotici')
})
global.db = db

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())
app.use(cors())

app.use(passport.initialize())

require('./config/passport')(passport)

// Routes
const userRoutes = require('./routes/userRoutes')
const spotRoutes = require('./routes/spotRoutes')
const paysRoutes = require('./routes/paysRoutes')
const comentRoute = require('./routes/comentsRoutes')


app.use('/api/users', userRoutes)
app.use('/api/spots', spotRoutes)
app.use('/api/countries', paysRoutes)
app.use('/api/coments', comentRoute)

// Connexion au dossier client
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`)
    
})