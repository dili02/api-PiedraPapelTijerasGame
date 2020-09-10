/* === Dependencias === */
//const bcrypt = require('bcrypt')
//const joi = require('joi')
//const jwt = require('jsonwebtoken')

/* === Modelos === */
const User = require('../models/user')

// CONTROLADOR OBTENER TODOS LOS USUARIOS
const getUsers = async (req, res) => {

   try {

      const usersBD = await User.find()

      const users = usersBD.map(user => {
         let userWithoutPassword = user.toObject()
         delete userWithoutPassword.password
         return userWithoutPassword
      })

      res.status(200).json(users)

   } catch (error) {

      res.status(500).json({
         status: "error",
			message: "Error al obtener los usuarios"
      })

   }

}

// CONTROLADOR OBTENER UN USUARIO POR NICKNAME
const getUser = async (req, res) => {

   try {

      const { nickname } = req.params

      const user = await User.findOne({ nickname })

      const userWithoutPassword = user.toObject()
		delete userWithoutPassword.password

      res.status(200).json(userWithoutPassword)

   } catch (error) {

      res.status(500).json({
         status: "error",
			message: "Error al obtener el usuario"
      })

   }

}

module.exports = {
   getUsers,
   getUser
}