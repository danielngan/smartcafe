import {Table} from "../domain/Table";
import { Request } from "./Request";

export interface GetAllTables extends Request<Table[]> {

}