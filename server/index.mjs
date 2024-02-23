import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

//fastify


const server = fastify()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

server.register(fastifyStatic,{
    root: path.join(__dirname, '../dist')
})


const port = process.env.PORT ||  5555
const host = process.env.HOST  || 'localhost'

server.listen({port,host},)
.then(() => {
    console.log(`http://localhost:5500/`)
})

//websocket

const wss = new WebSocketServer({port : 5555})

wss.on('connection',client => { // event if client connection to server
    client.on('message', (data)=> {
        const parsedData = JSON.parse(data);
        wss.clients.forEach(c => {
            c.send(JSON.stringify({ received: true, data: parsedData }))
            // if (c !== client) {
                
            // }

        })
    })
})


