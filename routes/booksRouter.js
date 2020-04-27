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
            if(!req.body){
                data = {
                    code: 404,
                    msg: 'object empty'
                }
            }else{
                try{
                    const libros = new books(req.body)//nos crea el modelo pero no lo guarda
                    await libros.save()
    
                    data = {
                        code: 201,
                        msg: 'correct'
                    }
    
                }catch(err){
                    data = {
                        code: 400,
                        msg: err
                    }
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

                    if(respon){
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


    booksRouter.use('/book/:bookId', async (req, res, next) => {

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
                    req.book = respon
                    return next();
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
    booksRouter.route('/book/:bookId')
        .get( (req, res) => {

            const respon = req.book;

            const data ={code: 200,msg: respon}

            return res.status(data['code']).json(data)
            
        })
        .put(async (req, res) => {

            const param = req.book
            let data;
            try {
                param.title = req.body.title
                param.genre = req.body.genre
                param.author = req.body.author

                await param.save()

                data = {
                    code: 200,
                    msg: 'object updated'
                }
            } catch (errs) {
                data = {
                    code: 404,
                    msg: `object not found ${errs}`
                }
            }
            
            return res.status(data['code']).json(data)
    
        })
        .patch( async (req, res) => {

            const {book} = req;
            if (req.body._id || req.body.id){
                delete req.body._id || req.body.id
            }

            let paramsToUpdate = Object.entries(req.body)
            
            paramsToUpdate.forEach(element => {
                const [key, value] = element;
                book[key] = value
            });
            
            await book.save()
            
            const data = {code: 200, msg: 'correct patch '}
            return res.status(data['code']).send(data)

        })
        .delete((req, res) => {

            const { book } = req
            book.remove((err) => {
                let data; 

                if(err){
                    data = {
                        code: 400,
                        msg: err
                    }
                }else{
                    data = {
                        code: 200,
                        msg: 'deleted'
                    }
                }

                return res.status(data['code']).json(data)
            })

        })

    return booksRouter    
}

module.exports = routersBooks
