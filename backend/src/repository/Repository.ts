import {Table} from "smartcafe-common/dist/domain/Table";
import {Booking} from "smartcafe-common/dist/domain/Booking";

export interface Repository {

    /**
     * @returns all tables
     */
    getAllTables():Promise<Table[]>

    /**
     * @returns table with given id or undefined if no table with given id exists
     * @param id id of the table
     */
    getTableById(id: string): Promise<Table | undefined>

    /**
     * Creates a new table with given table data. If a table with the same id already exists, an error is thrown.
     * @param table table data
     * @throws Error if a table with the same id already exists
     */
    createTable(table: Table): Promise<void>

    /**
     * Deletes the table with given id. If no table with given id exists, silently does nothing.
     * @param id
     */
    deleteTable(id: string): Promise<void>

    /**
     * Updates the table with given table data. If no table with given id exists, an error is thrown.
     * @param table
     */
    updateTable(table: Table): Promise<void>

    /**
     * @returns all bookings
     */
    getAllBookings(): Promise<Booking[]>

    /**
     * @returns booking with given id or undefined if no booking with given id exists
     * @param id
     */
    getBookingById(id: string): Promise<Booking | undefined>

    /**
     * @returns all bookings with given date and time
     * @param date
     * @param time
     */
    getBookingsByTime(date: string, time: string): Promise<Booking[]>

    /**
     * Creates a new booking with given booking data. A unique id is generated for the booking.
     * @param bookingData
     * @returns the id of the created booking
     */
    createBooking(bookingData: Omit<Booking, "id">): Promise<string>

    /**
     * Deletes the booking with given id. If no booking with given id exists, silently does nothing.
     * @param id
     */
    deleteBooking(id: string): Promise<void>

    /**
     * @returns all tables that are available for the given date and time range
     * @param date
     * @param startTime
     * @param endTime
     */
    getAvailableTables(date: string, startTime: string, endTime: string) : Promise<Table[]>
}