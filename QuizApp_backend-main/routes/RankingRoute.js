const express = require('express')
const { models } = require('mongoose')
const router = express.Router()

const RankingController = require('../controllers/RankingController')
//const authenticate = require('../middleware/authenticate')

router.get('/geografia', RankingController.getRankingGeography)
router.get('/fizyka', RankingController.getRankingPhysics)
router.get('/matematyka', RankingController.getRankingMath)
//router.post('/show', UserController.show)
//router.post('/update', UserController.updateUser)
router.post('/storeNewRankingEntry', RankingController.storeNewRankingEntry)
//router.post('/delete', UserController.deleteUser)

module.exports = router