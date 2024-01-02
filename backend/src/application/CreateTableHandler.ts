import {RequestHandler} from "./RequestHandler";
import {CreateTable} from "smartcafe-common/dist/application/CreateTable";
import {Repository} from "../repository/Repository";

export class CreateTableHandler extends RequestHandler<CreateTable, void> {

    constructor(repository: Repository) {
        super(repository);
    }

    override async execute(request: CreateTable): Promise<void> {
        await this.repository.createTable(request.table)
    }
}