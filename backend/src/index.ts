import express from "express";
import {Repository} from "./repository/Repository";
import {MemoryRepository} from "./infrastructure/MemoryRepository";
import {HandlerCollection} from "./application/HandlerCollection";
import {MongoDBRepository} from "./infrastructure/MongoDBRepository";

const app = express()

const repository: Repository = new MongoDBRepository(
    "mongodb://root:goodExample@192.168.2.155:27017/?authMechanism=DEFAULT",
    {dbName: "smartcafe"}
)
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