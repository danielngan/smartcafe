import {Booking} from "../domain/Booking";
import { Request } from "./Request";

export interface GetBookingsByCustomer extends Request<Booking[]> {
    readonly customerName: string
}