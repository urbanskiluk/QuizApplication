const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rankingShema = new Schema({
    login: {
        type: String
    },
    correctAnswers: {
        type: Number
    },
    time: {
        type: String
    },
    totalQuestions: {
        type: Number
    },
    domain: {
        type: String
    }
}, {timestamps: true})

const Ranking = mongoose.model('Ranking', rankingShema)
module.exports = Ranking;