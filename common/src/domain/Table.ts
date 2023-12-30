export interface Table {
    readonly id: string
    readonly seats: number
    readonly type: TableType
}

export type TableType = "table" | "booth" | "outdoor"