const { response } = require('express')
const Ranking = require('../models/Ranking')


const storeNewRankingEntry = (req, resp, next) => {

    let checkIfAddingUserNeeded = 0;

    const filter = { login: req.body.login, domain: req.body.domain };

    const updateDocumentWhenCorrectAnswersBetter = {
        $set: {
            correctAnswers: req.body.correctAnswers,
            time: req.body.time
        },
    };

    const noUpdate = {
        $set: {
        },
    };

    console.log("New user for ranking: login ", req.body.login, "domain", req.body.domain)

    Ranking.findOne({ login: req.body.login, domain: req.body.domain }).then((user) => {
        if (user) {
            console.log("user with login ", req.body.login, " exists in ranking");
            if (user.correctAnswers < req.body.correctAnswers) {
                console.log("User updated in ranking due to better correctAnswers = ", req.body.correctAnswers);
                const result = Ranking.updateOne(filter, updateDocumentWhenCorrectAnswersBetter).then(respose => {
                    console.log('then ' + req.body.login)
                    resp.json({
                        message: 'Ranking updated by better correctAnswers successfully'
                    })
                })
                    .catch(error => {
                        console.log('catch error' + req.body.login)
                        resp.json({
                            message: 'New ranking entry was not updated!'
                        })
                    })
            }
            else if (user.correctAnswers == req.body.correctAnswers && user.time > req.body.time) {
                console.log("User updated in ranking due to better time = ", req.body.time);
                const result = Ranking.updateOne(filter, updateDocumentWhenCorrectAnswersBetter).then(respose => {
                    console.log('then' + req.body.login)
                    resp.json({
                        message: 'Ranking updated by better time successfully'
                    })
                })
                    .catch(error => {
                        console.log('catch error' + req.body.login)
                        resp.json({
                            message: 'New ranking entry was not updated!'
                        })
                    });
            }
            else {
                console.log("User with login", user.login, " exists in ranking and update is not needed!")
                const result = Ranking.updateOne(filter, noUpdate).then(respose => {
                    console.log('then' + req.body.login)
                    resp.json({
                        message: 'Ranking updated by better time successfully'
                    })
                })
                    .catch(error => {
                        console.log('catch error' + req.body.login)
                        resp.json({
                            message: 'New ranking entry was not updated!'
                        })
                    });
            }
        }
        else {
            checkIfAddingUserNeeded = 1;
            console.log("user with login ", req.body.login, " does not exist in ranking -> will be added");
            //ad user to ranking

            console.log('Make store user in ranking' + req.body.login)
            let newRankingEntry = new Ranking({
                login: req.body.login,
                correctAnswers: req.body.correctAnswers,
                time: req.body.time,
                totalQuestions: req.body.totalQuestions,
                domain: req.body.domain
            })
            newRankingEntry.save()
                .then(respose => {
                    console.log('then' + req.body.login)
                    resp.json({
                        message: 'New ranking entry added successfully'
                    })
                })
                .catch(error => {
                    console.log('catch error' + req.body.login)
                    resp.json({
                        message: 'New ranking entry was not added!'
                    })
                })

            console.log('New ranking entry: ' + req.body.login, " correct answers ", req.body.correctAnswers, " time ", req.body.time, " domain ", req.body.doamin);
        }
    });

    if (checkIfAddingUserNeeded === 1) {

    }
}

const getRankingGeography = (req, resp, next) => {
    const domain = req.body;
    console.log("Ranking geography read in progress  for domain: ", req.params);
    Ranking.find({ domain: "geografia" })
        .sort({ correctAnswers: -1 })
        .sort({ time: 1 })
        .limit(10)
        .then(response => {
            resp.status(200).json({
                response
            })
            console.log("Ranking read: " + resp.data)
        })
        .catch(error => {
            resp.status(400).json({
                messsage: 'An error occured!'
            })
        })
}

const getRankingPhysics = (req, resp, next) => {
    console.log("Ranking physics read in progress");
    Ranking.find({ domain: "fizyka" })
        .sort({ correctAnswers: -1 })
        .sort({ time: 1 })
        .limit(10)
        .then(response => {
            resp.status(200).json({
                response
            })

        })
        .catch(error => {
            resp.status(400).json({
                messsage: 'An error occured when physics ranking read!'
            })
        })
}

const getRankingMath = (req, resp, next) => {
    console.log("Ranking math read in progress");
    Ranking.find({ domain: "matematyka" })
        .sort({ correctAnswers: -1 })
        .sort({ time: 1 })
        .limit(10)
        .then(response => {
            resp.status(200).json({
                response
            })
            console.log("Ranking read: " + resp.data)
        })
        .catch(error => {
            resp.status(400).json({
                messsage: 'An error occured!'
            })
        })
}

module.exports = {
    storeNewRankingEntry, getRankingGeography, getRankingPhysics, getRankingMath
}