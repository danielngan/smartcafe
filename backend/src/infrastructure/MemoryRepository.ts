import {Repository} from "../repository/Repository";
import {Table} from "smartcafe-common/dist/domain/Table";
import {Booking} from "smartcafe-common/dist/domain/Booking";

export class MemoryRepository implements Repository {

    private readonly tableMap = new Map<string, Table>()
    private readonly bookingMap = new Map<string, Booking>()
    private nextBookingId: number = 0

    async getAllTables(): Promise<Table[]> {
        return Array.from(this.tableMap.values())
    }

    async getTableById(id: string): Promise<Table | undefined> {
        return this.tableMap.get(id)
    }

    async createTable(table: Table): Promise<void> {
        if (this.tableMap.has(table.id)) {
            throw new Error(`Table with id: ${table.id} already exists`)
        }
        this.tableMap.set(table.id, table)
    }

    async updateTable(table: Table): Promise<void> {
        if (!this.tableMap.has(table.id)) {
            throw new Error(`No table with id: ${table.id}`)
        }
        this.tableMap.set(table.id, table)
    }

    async deleteTable(id: string): Promise<void> {
        this.tableMap.delete(id)
    }



    async getAllBookings(): Promise<Booking[]> {
        return Array.from(this.bookingMap.values())
    }

    async getBookingById(id: string): Promise<Booking | undefined> {
        return this.bookingMap.get(id)
    }

    async getBookingsByTime(date: string, time: string): Promise<Booking[]> {
        return Array.from(this.bookingMap.values()).filter((x) => x.date === date && time >= x.startTime && time < x.endTime)
    }

    async createBooking(bookingData: Omit<Booking, "id">): Promise<string> {
        // you need to generate an id for a booking
        const id = "" + this.nextBookingId
        this.nextBookingId++
        const booking: Booking = {
            ...bookingData,
            id: id
        }
        this.bookingMap.set(id, booking)
        return id
    }

    async deleteBooking(id: string): Promise<void> {
        this.bookingMap.delete(id);
    }

    async getAvailableTables(date: string, startTime: string, endTime: string) : Promise<Table[]> {
        const tempTableMap = new Map(this.tableMap);
        this.bookingMap.forEach((booking) => {
            if (booking.date === date && (((booking.startTime > startTime) && (booking.endTime > endTime) && (booking.startTime < endTime)) || ((booking.startTime < startTime) && (booking.endTime < endTime) && (startTime < booking.endTime)) || ((startTime < booking.startTime) && (endTime > booking.endTime)) || ((startTime > booking.startTime) && (endTime < booking.endTime)))) {
                tempTableMap.delete(booking.tableId)
            }
        })
        return Array.from(tempTableMap.values());
    }


}