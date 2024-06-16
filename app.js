import express  from "express";
import serverRouter from './routers/test.route.js'
import taskRouter from './routers/task.route.js'
import fileUpload from 'express-fileupload';

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))


app.use((req,res,next) =>{
    console.log('s', req.body)
    next()
})
app.use('/api/v1/server',serverRouter)
app.use('/api/v1/task',taskRouter)


export default app;