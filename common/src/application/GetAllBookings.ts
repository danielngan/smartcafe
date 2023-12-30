import {Booking} from "../domain/Booking";
import { Request } from "./Request";

export interface GetAllBookings extends Request<Booking[]> {

}