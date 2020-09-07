/* === Dependencias === */
const mongoose = require('mongoose')

const { DB_HOST, DB_NAME, DB_PORT } = process.env
const uriDB = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

async function connectDB () {

   try {
      await mongoose.connect(uriDB, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      })
   } catch (error) {
      console.log(error)
      throw error = {
         status: 'error',
         message: 'ERROR!!! Falló la conexión con la base de datos'
      }
   }

}

mongoose.connection.once('open', () => {
   console.log(`DB => ${process.env.DB_NAME}`)
})

module.exports = connectDB
