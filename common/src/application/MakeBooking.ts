import {TableType} from "../domain/Table";
import {Request} from "./Request";

export interface MakeBooking extends Request<MakeBookingResponse> {
    readonly customerName: string
    readonly date: string
    readonly startTime: string
    readonly endTime: string
    readonly seats: number
    readonly tableType?: TableType
}

export interface MakeBookingResponse {
    readonly tableId?: string
}