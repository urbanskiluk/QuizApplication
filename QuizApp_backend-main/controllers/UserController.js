const { response } = require('express')
const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registration = (req, resp, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPassword){
        if(err)
        {
            // resp.json({
            //     error: err
            // })
        }

        let user = new User({
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword
        })

        console.log('Adding user ' + user.login + ' ' + hashedPassword + ' to database')
    
        user.save()
        .then(user => {
            resp.json({
                message: 'User added successfully!'
            })
        })
        .catch(error => {
            resp.json({
                message: 'An error occured durinng user registration'
            })
        })
    })
}

const login = (req, resp, next) => {
    let reqLogin = req.body.login
    let reqPassword = req.body.password
    console.log('User logging')
    User.findOne({login: reqLogin})
    .then(user => {
        if(user){
            console.log('User login found ' + reqLogin + ' ' + reqPassword + ' ' + user.password)
            bcrypt.compare(reqPassword, user.password, function(err, result) {
                if(err)
                {
                    // resp.json({
                    //     error: err
                    // })
                }
                if(result)
                {
                    console.log('User login found --> preparing token')
                    let token = jwt.sign({name: user.name}, 'kll.k(()(d;;', {expiresIn: '1h'})
                    let refreshToken = jwt.sign({name: user.name}, 'klcwwxxx', {expiresIn: '24h'})
                    resp.json({
                        message: 'Login successfully',
                        token,
                        refreshToken
                    })
                }
                else{
                    resp.json({
                        message: 'Password does not match!'
                    })
                }
            })
        }
        else{
            console.log('User not found')
            resp.json({
                message: 'User not found!'
            })
           
        }
    })
}

const refreshToken = (req, resp, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify('klcwwxxx', refreshToken, function(err, decode) {
        if(err){
            resp.status(400).json({
                err
            })
        }
        else{
            let token = jwt.sign({name: decode.name}, 'kll.k(()(d;;', {expiresIn: '1h'})
            let refreshToken = req.body.refreshToken
            resp.status(200).json({
                message: 'Token refreshed'
            })
        }
    })
}



// show all of users
const index = (req, resp, next) => {
    User.find().then(response => {
        resp.status(200).json({
            response
        })
    })
    .catch(error => {
        resp.status(400).json({
            messsage: 'An error occured!'
        })
    })
}


//show sinngle user
const  show = (req, resp, next) => {
    let userId = req.body.userId
    User.findById(userId)
    .then(response => {
        resp.json({
            response
        })
    })
    .catch(error => {
        response.json({
            message: 'User not found'
        })
    })
}


//store new user into database
const store = (req, resp, next) => {

    console.log('Make store user' + req.body.login)
    let user = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    .then(respose => {
        console.log('then' + req.body.login)
        resp.json({
            message: 'User added successfully'
        })
    })
    .catch(error => {
        console.log('catch error' + req.body.login)
        resp.json({
            message: 'User was not addedd!'
        })
    })

    console.log('Make store user' + req.body.login)
}

//updae user in database
const updateUser = (req, resp, next) => {
    let userId = req.body.userId

    let updateData = {
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    }

    User.findByIdAndUpdate(userId, {$set: updateData})
    .then(() => {
        resp.json({
            message: 'User udated successfully'
        })

    })
    .catch(error => {
        resp.json({
            message: 'An error occured durin updating uer data'
        })
    })
}

//delete user from databasae
const deleteUser = (req, resp, next) => {
    let userId = req.body.userId
    User.findByIdAndRemove(userId)
    .then(() => {
        resp.json({
            message: 'User removed successfully'
        })

    })
    .catch(error => {
        message: 'Deletion of user unsuccessful!'
    })
}

//export functions
module.exports = {
    index, show, store, updateUser, deleteUser, registration, login, refreshToken
}