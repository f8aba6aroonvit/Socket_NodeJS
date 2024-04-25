
import path from 'path'
import { fileURLToPath } from 'url';
import {createServer} from 'node:http'
import express from 'express'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import 'dotenv/config'
import  chadModel  from './models/chad.js'
import { chadRoute } from './routes/chad.js'
import cors from 'cors';


const { DB_HOST, DB_PORT, DB_NAME } = process.env


mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
.then(()=>{
  console.log('connect success')
  console.log(DB_NAME)
}).catch((err)=>{
  console.log(err.message)
})


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();

const server = createServer(app)
const io = new Server(server)
app.use(cors())



io.on('connection', (socket)=>{
    console.log('user connected!')
    socket.on('chat:message',async (msg)=>{
        const chad = new chadModel({
            username: msg.username,
            message: msg.message
        })
        await chad.save()
        console.log('recieved',JSON.stringify(msg))
        io.emit('c_chat:message', msg)
    })
})


//URL ของ Chat Socket
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
}) 


/*o.on('connection'),(socket)=>{
    console.log('a client connected')
}*/

app.use(cors())
app.use('/mes',chadRoute);


server.listen(3000,()=>{
    console.log('ผู้เล่นเข้ามาสำเร็จ http://localhost:3000')
})
