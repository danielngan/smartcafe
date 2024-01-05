import {runRepositoryTests} from "../repository/Repository.test";
import {MemoryRepository} from "./MemoryRepository";
import {MongoDBRepository} from "./MongoDBRepository";

describe('MongoDBRepository', () => {
    runRepositoryTests(async () => {
            return new MongoDBRepository("mongodb://root:goodExample@192.168.2.155:27017/?authMechanism=DEFAULT", {
                dbName: "smartcafe"
            })
        },
        async (repository) => {
            await (repository as MongoDBRepository).deleteAll()
            console.log("Deleted all")
        });
});
