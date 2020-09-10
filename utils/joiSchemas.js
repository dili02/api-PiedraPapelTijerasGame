/* === Dependencias === */
const joi = require('joi')

const createUserSchema = joi.object({
   nickname: joi.string()
      .alphanum()
      .max(12)
      .min(2)
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

const loginUserSchema = joi.object({
   nickname: joi.string()
      .alphanum()
      .max(12)
      .min(2)
		.required(),
	password: joi.string()
		.alphanum()
		.required()
		.min(6)
})

module.exports = {
   createUserSchema,
   loginUserSchema
}