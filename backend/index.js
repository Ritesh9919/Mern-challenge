import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import {connectDB} from './db/index.js'

import transactionRouter from './routes/transaction.route.js'


const app = express()



app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/', (req, res)=> {
    res.send('Hello World');
})


app.use('/transaction', transactionRouter);


connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running on port:${process.env.PORT}`);
    })
})
.catch((err)=> {
    console.log('MongoDB connection failed', err);
})


