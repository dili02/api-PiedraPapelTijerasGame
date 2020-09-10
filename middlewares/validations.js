// MIDDLEWARE VALIDAR SCHEMA JOI DE CREACION DE USUARIOS
const validateCreateUser = (schema) => {

	return async (req, res, next) => {

		try {

			const validation = await schema.validate(req.body)
			if (validation.error) return res.status(400).json({
				status: "error",
				message: validation.error.message
			})
			next()

		} catch (error) {

			res.json(error.message)

		}

	}

}

// MIDDLEWARE VALIDAR SCHEMA JOI LOGIN DE USUARIOS AL SISTEMA
const validateLoginUser = (schema) => {

	return async (req, res, next) => {

		try {
			const validation = await schema.validate(req.body)
			if (validation.error) return res.status(400).json({
				status: "error",
				message: validation.error.message
			})
			next()
		} catch (error) {

			return res.json(error.message)

		}

	}
}

module.exports = {
	validateCreateUser,
	validateLoginUser
}



