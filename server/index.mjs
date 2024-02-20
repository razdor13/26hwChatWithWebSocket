import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

function getUniqWordsInMap(input) {
    // рядок перетворюємо до масива
    const separeteInArrey = input.toLowerCase().split(" ").filter(Boolean);

    // проходимось по масиву та складаємо в new map
    return separeteInArrey.reduce((prev, word) => {

            // перевіряємо чи в new map є ключ (слово) у випадку якщо нема створюємо його
            // та додаємо йому значення 1 , у випадку якщо є таке вже , то збільшуємо value на 1.
            const count = prev.has(word) ? prev.get(word) + 1 : 1;

            // новоутворений map зберігається у змінній objOfUniqQuntityWords
            return prev.set(word, count);  
            }, new Map())
}




const server = fastify()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

server.register(fastifyStatic,{
    root: path.join(__dirname, '../client')
})



server.listen({port : 5500},)
.then(() => {
    console.log(`http://localhost:5500/`)
})