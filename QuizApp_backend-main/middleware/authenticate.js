const jwt = require('jsonwebtoken')

const autheticate = (req, resp, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'kll.k(()(d;;')

        req.user = decode
        next()
    }
    catch(error){
        if(error.name == "TokenExpireError")
        {
            resp.status(401).json({
                message: 'Token expired'
            })
        }
        resp.json({
            message: 'Authentication failed!'
        })
    }
}

module.exports = autheticate