import {runRepositoryTests} from "../repository/Repository.test";
import {MemoryRepository} from "./MemoryRepository";
import {MongoDBRepository} from "./MongoDBRepository";

describe('MongoDBRepository', () => {
    runRepositoryTests(() => new MongoDBRepository("", {}));
});
