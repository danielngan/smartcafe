import {RequestHandler} from "./RequestHandler";
import {Repository} from "../repository/Repository";
import {GetBookingsByCustomer} from "smartcafe-common/dist/application/GetBookingsByCustomer";
import {Booking} from "smartcafe-common/dist/domain/Booking";

export class GetBookingsByCustomerHandler extends RequestHandler<GetBookingsByCustomer, Booking[]>{
    constructor (repository: Repository) {
        super(repository)
    }

    override async execute(request: GetBookingsByCustomer): Promise<Booking[]> {
        return (await this.repository.getAllBookings()).filter((booking) => booking.customerName === request.customerName);
    }

}