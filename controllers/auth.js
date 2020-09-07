/* === Dependencias === */
const bcrypt = require('bcrypt')
const joi = require('joi')
const jwt = require('jsonwebtoken')

/* === Modelos === */
const User = require('../models/user')

// CONTROLADOR REGISTRAR NUEVOS USUSARIOS
const registerUser = async (req, res) => {

	try {

		const { nickname, password, passwordCheck } = req.body

		const schema = joi.object({
			nickname: joi.string()
				.alphanum()
				.required(),
			password: joi.string()
				.alphanum()
				.required()
				.min(6),
			passwordCheck: joi.string()
				.alphanum()
				.required()
				.min(6)
		})
		const validation = schema.validate({nickname, password, passwordCheck})
		if (validation.error) return res.status(400).json({
			status: "error",
			message: validation.error.message
		})

		if (password !== passwordCheck) return res.status(400).json({
			status: "error",
			message: "Ingrese la misma contraseña dos veces para la verificación"
		})

		const user = await User.findOne({ nickname })
		if (user) return res.status(403).json({
			status: "error",
			message: "Lo Siento ese nickname ya esta en uso"
		})

		const salt = await bcrypt.genSalt(2)
		const passwordHash = await bcrypt.hash(password, salt)

		const newUser = new User({
			nickname,
			password: passwordHash
		})
		await newUser.save()

		return res.status(201).json({
			status: "success",
			message: "Usuario creado satisfactoriamente"
		})

	} catch (error) {

		return res.status(500).json({
			status: "error",
			message: "No se pudo registrar al usuario"
		})

	}

}

// CONTROLADOR QUE PERMITE AL USUARIO INGRESAR AL SISTEMA
const loginUser = async (req, res) => {

	try {

		const { nickname, password } = req.body

		const schema = joi.object({
			nickname: joi.string()
				.alphanum()
				.required(),
			password: joi.string()
				.alphanum()
				.required()
				.min(6)
		})
		const validation = schema.validate({ nickname, password })
		if (validation.error) return res.status(400).json({
			status: "error",
			message: validation.error.message
		})

		const user = await User.findOne({ nickname })
		if (!user) return res.status(401).json({
			status: "error",
			message: "nickname o contraseña incorrectos"
		})

		const matchPassword = await bcrypt.compare(password, user.password)
		if (!matchPassword) return res.status(401).json({
			status: "error",
			message: "nickname o contraseña incorrectos"
		})

		/* const userWithoutPassword = user.toObject()
		delete userWithoutPassword.password */

		const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)
		res.status(200).json({
			token,
			user: {
				id: user._id,
				nickname
			}
		})

	} catch (error) {

		return res.status(500).json({
			status: "error",
			message: error.message
		})

	}

}

module.exports = {
	registerUser,
	loginUser
}
