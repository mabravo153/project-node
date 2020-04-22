const express = require('express'); 



const routersBooks = books => {

    const booksRouter = express.Router();

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
                return res.status(data['code']).json(data)
            })
        })
        .post( async (req, res) => {
            let data;
            try{
                const libros = new books(req.body)//nos crea el modelo pero no lo guarda
                await libros.save()

                data = {
                    code: 200,
                    msg: 'correct'
                }

            }catch(err){
                data = {
                    code: 400,
                    msg: err
                }
            }
            return res.status(data['code']).json(data)
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
                return res.status(data['code']).json(data)

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
                    }else{
                        data = {
                            code: 404,
                            msg: 'object not found'
                        }
                    }
                }
                return res.status(data['code']).json(data)
            })
        })


    return booksRouter    
}

module.exports = routersBooks