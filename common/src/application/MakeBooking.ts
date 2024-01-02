import {TableType} from "../domain/Table";
import {Request} from "./Request";
import {Booking} from "../domain/Booking";

export interface MakeBooking extends Request<Booking | undefined> {
    readonly customerName: string
    readonly date: string
    readonly startTime: string
    readonly endTime: string
    readonly seats: number
    readonly tableType?: TableType
}

