// import av dotenv to hide all the sensetive keys
import * as dotenv from 'dotenv'

// implement dotenv

dotenv.config()
// import express

import express, { request, response } from 'express'

// import cors to handle different request http package
import cors from 'cors'




// import client package so the communication between serevr and database works
import pkg from 'pg'
const { Client } = pkg
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
import path from 'path'
app.use (express.static(path.join(path.resolve(), 'public')))


// connect the database
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})


//Errorfunction
// if database is not connected console this an error message

db.connect(function (err) {
    if (err) throw err
    console.log('Database Connected')
})


//Routes
//Get anrop

app.get('/', (req,res)=> {
    res.json('hello Sara')
})



// Get request to get all books from the table
app.get('/books', async(req,res)=>{
    try {
        const allBooks = await db.query('SELECT * FROM books')
        res.json(allBooks.rows);
    }catch(err){
        console.log(err.message)
    }

})

// Post request so we can create books
app.post('/books', async(req,res)=>{
    const{title,cover,price,about} = req.body
    const values = [title,cover,price,about]
    await db.query('INSERT INTO books(title, cover, price, about) VALUES ($1,$2,$3,$4)',
    values
    )

    res.send('BOOK ADDED')
})



// Delete book
app.delete('/books/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const deleteBook = await db.query('DELETE FROM books WHERE id = $1', [
          id
        ])
        res.json({message:"Book Deleted"})

    } catch(err){
        console.log(err.message)
    }
})


//Put book, to edit or change the book


app.put('/books/:id', async (req,res)=> {
    const id = req.params.id
    const {title, cover, price,about} = req.body
    const values = [title,cover,price,about,id]
    await db.query('UPDATE books SET title = $1, cover = $2, price = $3, about = $4 WHERE id = $5',
    values)
    res.send("Book is changed")
})

// So the server can listen and communicate
app.listen(8800, ()=> {
    console.log('Server is running')
})
