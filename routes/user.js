/* === Dependencias === */
const { Router } = require('express')

/* === Inicializaciones === */
const router = Router()

/* === Controladores === */
const { registerUser, loginUser } = require('../controllers/auth')
const { getUsers, getUser } = require('../controllers/users')

/* === Middlewares === */
const { validateCreateUser, validateLoginUser } = require('../middlewares/validations')

/* === Utils === */
const { createUserSchema, loginUserSchema } = require('../utils/joiSchemas')

/* === Rutas === */
router.post("/auth/register", validateCreateUser(createUserSchema), registerUser)
router.post("/auth/login", validateLoginUser(loginUserSchema), loginUser)
router.get("/", getUsers)
router.get("/:nickname", getUser)

module.exports = router