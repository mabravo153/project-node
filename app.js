const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/booksAPI',{useNewUrlParser: true})

const server = express();
const Books = require('./models/booksModel');
const booksRouter = require('./routes/booksRouter')(Books);


server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
const port = 9000;


server.use('/api', booksRouter)
server.listen(port, () => {
    console.log("Server Run in port 9000")
})