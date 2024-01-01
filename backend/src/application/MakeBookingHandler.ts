import {RequestHandler} from "./RequestHandler";
import {GetAllTables} from "smartcafe-common/dist/application/GetAllTables";
import {Table} from "smartcafe-common/dist/domain/Table";
import {Repository} from "../repository/Repository";
import {GetAvailableTablesByTime} from "smartcafe-common/dist/application/GetAvailableTablesByTime";
import {GetBookingsByCustomer} from "smartcafe-common/dist/application/GetBookingsByCustomer";
import {Booking} from "smartcafe-common/dist/domain/Booking";
import {MakeBooking, MakeBookingResponse} from "smartcafe-common/dist/application/MakeBooking";

export class MakeBookingHandler extends RequestHandler<MakeBooking, MakeBookingResponse>{
    constructor (repository: Repository) {
        super(repository)
    }

    override async execute(request: MakeBooking): Promise<MakeBookingResponse> {
        /*
            tablesFound = []
            get available tables with time matching the request.
            Loop For each available table
                if table.seats >= request.seats
                    and request.tableType != undefined
                    and request.tableType = table.type, then
                    add table to tablesFound
                end if
            end loop
            if tablesFound.length == 0, then
                return table as undefined
            else
                return the table with the fewest seats of tablesFound
            end if
         */
        // let tablesFound : Table[] = [];
        //  // @ts-ignore
        // (await this.repository.getAvailableTables()).forEach((table) => {
        //      if (table.seats >= request.seats && (request.tableType === undefined || request.tableType === table.type)) {
        //          tablesFound.push(table)
        //      }
        // })

        let tablesFound = (await this.repository.getAvailableTables(request.date, request.startTime, request.endTime))
            .filter((table) => table.seats >= request.seats && (request.tableType === undefined || request.tableType === table.type))

        if (tablesFound.length == 0) {
            return {
                tableId: undefined
            }
        } else {
            tablesFound.sort((a, b) => (a.seats - b.seats))
            return {
                tableId: tablesFound[0].id
            }
        }
    }

}