/* === Dependencias === */
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

/* === Inicializaciones === */
const app = express()

/* === Configuraciones === */
app.set('port', process.env.PORT || 4000)

/* === Middlewares === */
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

/* === Rutas === */
app.use('/users', require('./routes/user'))

module.exports = app