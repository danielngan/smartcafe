export interface Booking {
    readonly id: string
    readonly date: string
    readonly startTime: string
    readonly endTime: string
    readonly seats: number
    readonly tableId: string
    readonly customerName: string
}