import {RequestHandler} from "./RequestHandler";
import {Table} from "smartcafe-common/dist/domain/Table";
import {Repository} from "../repository/Repository";
import {GetAvailableTablesByTime} from "smartcafe-common/dist/application/GetAvailableTablesByTime";

export class GetAvailableTablesByTimeHandler extends RequestHandler<GetAvailableTablesByTime, Table[]>{
    constructor (repository: Repository) {
        super(repository)
    }

    override async execute(request: GetAvailableTablesByTime): Promise<Table[]> {
        return this.repository.getAvailableTables(request.date, request.startTime, request.endTime);
    }

}