import {RequestHandler} from "./RequestHandler";
import {Repository} from "../repository/Repository";
import {CreateTableHandler} from "./CreateTableHandler";
import {GetAllTablesHandler} from "./GetAllTablesHandler";
import {GetAllBookingsHandler} from "./GetAllBookingsHandler";
import {GetAvailableTablesByTimeHandler} from "./GetAvailableTablesByTimeHandler";
import {GetBookingsByCustomerHandler} from "./GetBookingsByCustomerHandler";
import {MakeBookingHandler} from "./MakeBookingHandler";
import {Request} from "smartcafe-common/dist/application/Request";


export class HandlerCollection implements ReadonlyMap<string, RequestHandler<Request<any>, any>> {

    private readonly map = new Map<string, RequestHandler<Request<any>  , any>>()

    constructor(readonly repository: Repository) {
        this.add(CreateTableHandler)
        this.add(GetAllTablesHandler)
        this.add(GetAllBookingsHandler)
        this.add(GetAvailableTablesByTimeHandler)
        this.add(GetBookingsByCustomerHandler)
        this.add(MakeBookingHandler)
    }
    
    private add(ctor: new (repository: Repository) => RequestHandler<any, any>) {
        const name = ctor.name.replace("Handler", "")
        const handler = new ctor(this.repository)
        this.map.set(name, handler)
    }

    forEach(callback: (value: RequestHandler<Request<any>, any>, key: string, map: ReadonlyMap<string, RequestHandler<Request<any>, any>>) => void, thisArg?: any): void {
        this.map.forEach(callback, thisArg)
    }

    get(key: string): RequestHandler<Request<any>, any> | undefined {
        return this.map.get(key)
    }
    has(key: string): boolean {
        return this.map.has(key)
    }

    get size(): number {
        return this.map.size
    }
    entries(): IterableIterator<[string, RequestHandler<Request<any>, any>]> {
        return this.map.entries()
    }
    keys(): IterableIterator<string> {
        return this.map.keys()
    }
    values(): IterableIterator<RequestHandler<Request<any>, any>> {
        return this.map.values()
    }

    [Symbol.iterator](): IterableIterator<[string, RequestHandler<Request<any>, any>]> {
        return this.map[Symbol.iterator]()
    }

}