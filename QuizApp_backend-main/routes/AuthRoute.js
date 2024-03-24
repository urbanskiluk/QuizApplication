const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')


router.post('/register', userController.registration)
router.post('/login', userController.login)
router.post('/refresh-token', userController.refreshToken)

module.exports = router