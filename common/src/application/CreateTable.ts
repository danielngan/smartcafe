import {Request} from "./Request";
import {Table} from "../domain/Table";

export interface CreateTable extends Request<void> {
    readonly table: Table
}