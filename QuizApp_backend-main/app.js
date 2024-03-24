const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');

const  UserRouter = require('./routes/UserRoute')
const  AuthRouter = require('./routes/AuthRoute');
const  QuestionRouter = require('./routes/QuestionRoute');
const  RankingRouter = require('./routes/RankingRoute')


mongoose.connect('mongodb://127.0.0.1:27017/klasa', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
    
}

const db = mongoose.connection

db.on('error', (err) => {
    console.log('Connection errored')
    console.log(err)
})

db.on('open', () => {
    console.log('Database conection estabished')
})


const app = express()

app.use(morgan())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors(corsOptions));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log('Application is running on port' + PORT)
})

app.use('/api/user', UserRouter)
app.use('/api', AuthRouter)
app.use('/api/db/ranking', RankingRouter)
app.use('/api/db', QuestionRouter)





