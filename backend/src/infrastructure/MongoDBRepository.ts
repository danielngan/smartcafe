import { Booking } from "smartcafe-common/dist/domain/Booking";
import { Table } from "smartcafe-common/dist/domain/Table";
import {Repository} from "../repository/Repository";
import * as mongoose from "mongoose";
import {ConnectOptions} from "mongoose";

export class MongoDBRepository implements Repository {

    private readonly tableSchema = new mongoose.Schema ({
        id: String,
        seats: Number,
        type: String,
    })

    private readonly bookingSchema = new mongoose.Schema ({
        id: String,
        date: String,
        startTime: String,
        endTime: String,
        seats: Number,
        tableId: String,
        customerName: String
    })
    private readonly Table = mongoose.model<Table>('Table', this.tableSchema);

    private readonly Booking = mongoose.model<Booking>('Booking', this.bookingSchema);

    constructor(url: string, options?: ConnectOptions) {
        mongoose.connect(url, options)
    }

    async close(): Promise<void> {
        await mongoose.disconnect()
    }

    async getAllTables(): Promise<Table[]> {
        return (await this.Table.find().exec()).map((doc) => doc.toObject())
    }

    async getTableById(id: string): Promise<Table | undefined> {
        return (await this.Table.findOne({ id: id }))?.toObject()
    }

    async createTable(table: Table): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteTable(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async updateTable(table: Table): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllBookings(): Promise<Booking[]> {
        throw new Error("Method not implemented.");
    }
    async getBookingById(id: string): Promise<Booking | undefined> {
        throw new Error("Method not implemented.");
    }
    async getBookingsByTime(date: string, time: string): Promise<Booking[]> {
        throw new Error("Method not implemented.");
    }
    async createBooking(bookingData: Omit<Booking, "id">): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async deleteBooking(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAvailableTables(date: string, startTime: string, endTime: string): Promise<Table[]> {
        throw new Error("Method not implemented.");
    }

}