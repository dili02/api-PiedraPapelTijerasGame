/* === Variables de Entorno === */
require('dotenv').config()

/* === Inicializaciones === */
const app = require('./app')
const connectDB = require('./database')

async function main () {

   try {
      app.listen(app.get('port'))
      console.log(`Port => ${app.get('port')}`)
      await connectDB()
   } catch (error) {
      res.status(500).json({
         status: "error",
         message: error.message
      })
   }

}

main()