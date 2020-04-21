const express = require("express");
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/booksAPI',{useNewUrlParser: true})

const server = express();
const booksRouter = express.Router();


const books = require('./models/booksModel');
const port = 9000;



booksRouter.route('/books')
    .get(async (req, res) => {
       await books.find((err, respon) => {
            let data
            if(err){
                data = {
                    code: 404,
                    msg: err
                }
            }else{
                data = {
                    code: 200,
                    msg: respon
                }
            }
            return res.json(data)
        })
    })
    

booksRouter.route('/book')
    .get(async (req, res) => {
        const { query } = req
        await books.find(query, (err, respon) => {
            let data
            if(err){
                data = {
                    code: 400,
                    msg: err
                }
            }else{

                if(respon.length > 0){
                    data = {
                        code: 200,
                        msg: respon
                    }
                }else{
                    data = {
                        code: 404,
                        msg: 'not found'
                    }
                }
            }
            return res.json(data)

        })
    })


booksRouter.route('/book/:bookId')
    .get(async (req, res) => {
        
        let _id = req.params.bookId

        await books.findById(_id, (err, respon) => {
            let data
            if(err){
                data = {
                    code: 400,
                    msg: err
                }
            }else{

                if(respon){
                    data = {
                        code: 200,
                        msg: respon
                    }

                    res.statusCode = 200
                }else{
                    data = {
                        code: 404,
                        msg: 'object not found'
                    }
                    res.statusCode = 404
                }
            }
            return res.json(data)
        })
    })

 


server.use('/api', booksRouter)
server.listen(port, () => {
    console.log("Server Run in port 9000")
})