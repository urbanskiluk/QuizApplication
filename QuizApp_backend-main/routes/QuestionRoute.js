const express = require('express')
const { models } = require('mongoose')
const router = express.Router()

const QuestionController = require('../controllers/QuestionController')

router.get('/geography', QuestionController.randomQuestionGeography)
router.get('/math', QuestionController.randomQuestionMath)
router.get('/physics', QuestionController.randomQuestionPhysics)

module.exports = router