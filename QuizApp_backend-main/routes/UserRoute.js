const express = require('express')
const { models } = require('mongoose')
const router = express.Router()

const UserController = require('../controllers/UserController')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, UserController.index)
router.post('/show', UserController.show)
router.post('/update', UserController.updateUser)
router.post('/store', UserController.store)
router.post('/delete', UserController.deleteUser)

module.exports = router