import express  from "express";
import serverRouter from './routers/test.route.js'
import taskRouter from './routers/task.route.js'
import cors from 'cors'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(cors({
    origin: '*'
}))


app.use('/api/v1/server',serverRouter)
app.use('/api/v1/task',taskRouter)


export default app;