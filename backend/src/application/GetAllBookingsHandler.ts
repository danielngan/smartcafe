import {RequestHandler} from "./RequestHandler";
import {GetAllBookings} from "smartcafe-common/dist/application/GetAllBookings";
import {Booking} from "smartcafe-common/dist/domain/Booking";
import {Repository} from "../repository/Repository";

export class GetAllBookingsHandler extends RequestHandler<GetAllBookings, Booking[]>{
    constructor (repository: Repository) {
        super(repository)
    }

    override async execute(request: GetAllBookings): Promise<Booking[]> {
        return this.repository.getAllBookings()
    }

}