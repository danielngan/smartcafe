import {RequestHandler} from "./RequestHandler";
import {Repository} from "../repository/Repository";
import {Booking} from "smartcafe-common/dist/domain/Booking";
import {MakeBooking} from "smartcafe-common/dist/application/MakeBooking";

export class MakeBookingHandler extends RequestHandler<MakeBooking, Booking | undefined>{
    constructor (repository: Repository) {
        super(repository)
    }

    override async execute(request: MakeBooking): Promise<Booking | undefined> {
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
            return undefined
        } else {
            tablesFound.sort((a, b) => (a.seats - b.seats))
            const tableId = tablesFound[0].id

            const bookingId = (await this.repository.createBooking({
                date: request.date,
                startTime: request.startTime,
                endTime: request.endTime,
                seats: request.seats,
                tableId: tableId,
                customerName: request.customerName
            }))
            return {
                id: bookingId,
                date: request.date,
                startTime: request.startTime,
                endTime: request.endTime,
                seats: request.seats,
                tableId: tableId,
                customerName: request.customerName
            }
        }
    }

}