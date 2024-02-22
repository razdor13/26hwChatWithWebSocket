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

server.listen({port : 5500},)
.then(() => {
    console.log(`http://localhost:5500/`)
})

//websocket

const wss = new WebSocketServer({port : 5555})

wss.on('connection',client => { // event if client connection to server
    client.on('message', (data)=> {
        console.log('i got something', data.toString())
        wss.clients.forEach(c => {
            if (c !== client) {
                c.send('other client sent ' + data)
            }
        })
    })
})


