/* === Dependencias === */
const { Router } = require('express')

/* === Inicializaciones === */
const router = Router()

/* === Controladores === */
const { registerUser, loginUser } = require('../controllers/auth')

/* === Rutas === */
router.post("/auth/register", registerUser)
router.post("/auth/login", loginUser)

module.exports = router