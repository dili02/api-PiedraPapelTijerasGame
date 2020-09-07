const { Schema, model } = require('mongoose')

const userModel = new Schema({
	nickname: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		trim: true
	}
}, {
	timestamps: true
})

module.exports = model("user", userModel)