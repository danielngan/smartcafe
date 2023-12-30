import {Table} from "smartcafe-common/dist/domain/Table";
import {Booking} from "smartcafe-common/dist/domain/Booking";

export interface Repository {

    getAllTables():Promise<Table[]>

    getTableById(id: string): Promise<Table | undefined>

    createTable(table: Table): Promise<void>

    deleteTable(id: string): Promise<void>

    updateTable(table: Table): Promise<void>


    getAllBookings(): Promise<Booking[]>

    getBookingById(id: string): Promise<Booking | undefined>

    getBookingsByTime(date: string, time: string): Promise<Booking[]>

    createBooking(bookingData: Omit<Booking, "id">): Promise<string>

    deleteBooking(id: string): Promise<void>


    getAvailableTables(date: string, startTime: string, endTime: string) : Promise<Table[]>
}