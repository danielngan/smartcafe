import {Booking} from "smartcafe-common/dist/domain/Booking";
import {Table} from "smartcafe-common/dist/domain/Table";
import {Repository} from "../repository/Repository";
import * as mongoose from "mongoose";
import {FilterQuery, Types} from "mongoose";
import {ConnectionStates, ConnectOptions} from "mongoose";

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

    private readonly TableModel =
        mongoose.model<Table>('Table', this.tableSchema, undefined, { overwriteModels: true });

    private readonly BookingModel =
        mongoose.model<Booking>('Booking', this.bookingSchema, undefined, { overwriteModels: true });

    constructor(readonly url: string, readonly options?: ConnectOptions) {
    }

    private async connect(): Promise<void> {
        if (mongoose.connection?.readyState !== ConnectionStates.connected) {
            await mongoose.connect(this.url, this.options)
        }
    }

    async deleteAll(): Promise<void> {
        await this.connect()
        await this.TableModel.deleteMany().exec()
        await this.BookingModel.deleteMany().exec()
    }

    async close(): Promise<void> {
        await mongoose.disconnect()
    }

    async getAllTables(): Promise<Table[]> {
        await this.connect()
        return (await this.TableModel.find().exec()).map((doc) => doc.toObject())
    }

    async getTableById(id: string): Promise<Table | undefined> {
        await this.connect()
        return (await this.TableModel.findOne({ id: id }))?.toObject()
    }

    async createTable(table: Table): Promise<void> {
        await this.connect()
        if (await this.TableModel.findOne({id: table.id}).exec() != undefined) {
            throw new Error(`Table with id: ${table.id} already exists`)
        }
        await this.TableModel.create(table)
    }

    async deleteTable(id: string): Promise<void> {
        await this.connect()
        await this.TableModel.deleteOne({id: id}).exec();
    }

    async updateTable(table:Table): Promise<void> {
        await this.connect()
        if (await this.TableModel.findOne({id: table.id}).exec() == undefined) {
            throw new Error(`No table with id: ${table.id}`)
        }
        await this.TableModel.updateOne({id: table.id}, table).exec();
    }

    async getAllBookings(): Promise<Booking[]> {
        await this.connect()
        return (await this.BookingModel.find().exec()).map((doc) => doc.toObject())
    }

    async getBookingById(id: string): Promise<Booking | undefined> {
        await this.connect()
        return (await this.BookingModel.findOne({ id: id }))?.toObject()
    }

    async getBookingsByTime(date: string, time: string): Promise<Booking[]> {
        await this.connect()
        this.BookingModel.find({date: { $eq: date }})
        return (await this.BookingModel.find({
            date: date,
            startTime: { $lte: time },
            endTime: { $gt: time }
        }).exec()).map((doc) => doc.toObject())
    }

    async createBooking(bookingData: Omit<Booking, "id">): Promise<string> {
        await this.connect()
        const id = new Types.ObjectId().toHexString()
        await this.BookingModel.create({...bookingData, id: id})
        return id
    }

    async deleteBooking(id: string): Promise<void> {
        await this.connect()
        await this.BookingModel.deleteOne({id: id}).exec();
    }

    async getAvailableTables(date: string, startTime: string, endTime: string): Promise<Table[]> {
        await this.connect()
        const availableTablesMap = new Map<string, Table>();
        for (const table of await this.getAllTables()) {
            availableTablesMap.set(table.id, table);
        }
        for (const booking of await this.getAllBookings()) {
            if (booking.date === date && booking.startTime < endTime && startTime < booking.endTime) {
                availableTablesMap.delete(booking.tableId);
            }
        }
        return Array.from(availableTablesMap.values());
    }

}