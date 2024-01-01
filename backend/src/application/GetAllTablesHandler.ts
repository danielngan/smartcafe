import {RequestHandler} from "./RequestHandler";
import {GetAllTables} from "smartcafe-common/dist/application/GetAllTables";
import {Table} from "smartcafe-common/dist/domain/Table";
import {Repository} from "../repository/Repository";

export class GetAllTablesHandler extends RequestHandler<GetAllTables, Table[]>{
    constructor (repository: Repository) {
        super(repository)
    }

    override async execute(request: GetAllTables): Promise<Table[]> {
        return this.repository.getAllTables()
    }

}