import {RequestHandler} from "./RequestHandler";
import {GetAllTables} from "smartcafe-common/dist/application/GetAllTables";
import {Table} from "smartcafe-common/dist/domain/Table";
import {Repository} from "../repository/Repository";
import {GetAvailableTablesByTime} from "smartcafe-common/dist/application/GetAvailableTablesByTime";
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