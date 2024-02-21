import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

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