const { response } = require('express')
const Question = require('../models/Question')

let questionIdForGeography = 1;
let questionIdForMath = 100;
let questionIdForPhysics = 200;

//show single question
const randomQuestionGeography = (req, resp, next) => {

    //questionId = 1;
    console.log("Go into randomQuestionGeography questionId: ", questionIdForGeography)

    let questionsArray = []

    console.log("Go into randomQuestion")

    Question.find({domain: "geografia"}).limit(5).then(question => {
        console.log("Znaleziono liczbe pytan : " + question[0].question);
        resp.json({
                message: "Everything OK with geography read",
                question
            })
    })
}

const randomQuestionMath = (req, resp, next) => {

    console.log("Go into randomQuestionMath")
    Question.find({domain: "matematyka"}).limit(5).then(question => {
        console.log("Znaleziono liczbe pytan : " + question[0].question);
        resp.json({
                message: "Everything OK with math read",
                question
            })
    })
}

const randomQuestionPhysics = (req, resp, next) => {

    
    console.log("Go into randomQuestionPhysics")


    Question.find({domain: "fizyka"}).limit(5).then(question => {
        console.log("Znaleziono liczbe pytan : " + question[0].question);
        resp.json({
                message: "Everything OK with physics read",
                question
            })
    })
}


module.exports = {
    randomQuestionGeography, randomQuestionMath, randomQuestionPhysics
}