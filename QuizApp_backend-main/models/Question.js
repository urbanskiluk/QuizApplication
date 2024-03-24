const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    id: {
        type: Number
    },
    domain: {
        type: String
    },
    question: {
        type: String
    },
    answerA: {
        type: String
    },
    answerB: {
        type: String
    },
    answerC: {
        type: String
    },
    answerD: {
        type: String
    },
    correctAnswer: {
        type: String
    }
}, {timestamps: true})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question