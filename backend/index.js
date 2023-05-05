// import av dotenv to hide all the sensetive keys
import * as dotenv from 'dotenv'

// implement dotenv

dotenv.config()
// import express

import express, { request, response } from 'express'

// import cors to handle different request http package
import cors from 'cors'

//import posgress sql

import pg from 'pg'
// import client package so the communication between serevr and database works
import  {Client} from 'pg'

// import body-parser ( its a middleware that can handle different request methids that support many forms)
import bodyParser from 'body-parser'

/* Implement express together with the "app*/
const app = express()

/* put in middlewares */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//Cors

app.use(cors())

//express
app.use(express.json())

// To improve cors communication

app.use((request,response,next)=> {
    response.header('Access-Control-Allow-Origin', '*')
    response.header ('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// Use path to have access to our static files, in this case the files in our public folder
app.use (express.static(path.join(path.resolve(), 'public')))

