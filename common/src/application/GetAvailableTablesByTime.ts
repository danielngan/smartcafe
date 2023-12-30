import {Table} from "../domain/Table";
import { Request } from "./Request";

export interface GetAvailableTablesByTime extends Request<Table[]> {
    readonly date: string
    readonly startTime: string
    readonly endTime: string
}