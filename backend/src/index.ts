import express from "express";
import {Repository} from "./repository/Repository";
import {MemoryRepository} from "./infrastructure/MemoryRepository";
import {HandlerCollection} from "./application/HandlerCollection";

const app = express()

const repository: Repository = new MemoryRepository()
const handlerCollection: HandlerCollection = new HandlerCollection(repository)

app.use(express.json())

for (const [name, handler] of handlerCollection) {
    console.log(`Register path: ${name} with handler`)
    app.post("/" + name, async (req, res, next) => {
        const request = req.body
        const result = (await handler.execute(request))
        res.contentType("application/json").json(result).end()
    })
}

app.listen(3000, () => {
    console.log("Server listening on port: 3000")
})