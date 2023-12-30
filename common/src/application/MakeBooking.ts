import {TableType} from "../domain/Table";
import {Request} from "./Request";

export interface MakeBooking extends Request<MakeBookingResponse> {
    readonly customerName: string
    readonly date: string
    readonly time: string
    readonly seats: number
    readonly tableType?: TableType
}

export interface MakeBookingResponse {
    readonly tableId?: string
}