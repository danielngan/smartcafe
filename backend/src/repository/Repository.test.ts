import { Repository } from './Repository';
import { Table } from 'smartcafe-common/dist/domain/Table';
import { Booking } from 'smartcafe-common/dist/domain/Booking';

describe('Nothing', () => {
    it('Nothing', () => {});
});

function mask<T>(value: T): T {
    const masked: any = {...value}
    delete masked._id
    delete masked.__v
    return masked as T
}

export function runRepositoryTests(
    repositoryFactory: () => Promise<Repository>,
    foreach: (repository: Repository) => Promise<void>) {

    describe('Repository', () => {
        let repository: Repository;

        beforeEach(async () => {
            repository = await repositoryFactory()
            await foreach(repository)
        });

        test('createTable and getTableById and getAllTables', async () => {
            const table: Table = {
                id: '1',
                seats: 4,
                type: 'table'
            };
            await repository.createTable(table);
            const retrievedTable = await repository.getTableById('1');
            expect(mask(retrievedTable)).toEqual(table);
            expect(await repository.getAllTables()).toEqual([retrievedTable]);
            try {
                await repository.createTable(table);
                fail();
            } catch (e: any) {
                expect(e.message).toEqual('Table with id: 1 already exists');
            }
        });

        test('updateTable', async () => {
            const table: Table = {
                id: '1',
                seats: 4,
                type: 'table'
            };
            await repository.createTable(table);
            const updatedTable: Table = {
                ...table,
                seats: 6
            }
            await repository.updateTable(updatedTable);
            expect(mask(await repository.getTableById('1'))).toEqual(updatedTable);
            try {
                await repository.updateTable({ ...table, id: '9' });
                fail();
            } catch (e: any) {
                expect(e.message).toEqual('No table with id: 9');
            }
        });

        test('deleteTable', async () => {
            const table: Table = {
                id: '1',
                seats: 4,
                type: 'table'
            };
            await repository.createTable(table);
            await repository.deleteTable('1');
            const deletedTable = await repository.getTableById('1');
            expect(deletedTable).toBeUndefined();
        });

        test('createBooking and getBookingById and getAllBookings and getBookingsByTime', async () => {
            const bookingData: Omit<Booking, "id"> = {
                customerName: "John Doe",
                date: "2021-01-01",
                startTime: "12:00",
                endTime: "13:00",
                seats: 4,
                tableId: "1"
            };
            const bookingId = await repository.createBooking(bookingData);
            const retrievedBooking = await repository.getBookingById(bookingId);
            expect(mask(retrievedBooking)).toEqual({ ...bookingData, id: bookingId });
            expect(await repository.getAllBookings()).toEqual([retrievedBooking]);
            expect(await repository.getBookingsByTime('2021-01-01', '12:00')).toEqual([retrievedBooking]);
            expect(await repository.getBookingsByTime('2021-01-01', '11:00')).toEqual([]);
        });

        test('deleteBooking', async () => {
            const bookingData: Omit<Booking, "id"> = {
                customerName: "John Doe",
                date: "2021-01-01",
                startTime: "12:00",
                endTime: "13:00",
                seats: 4,
                tableId: "1"
            };
            const bookingId = await repository.createBooking(bookingData);
            await repository.deleteBooking(bookingId);
            const deletedBooking = await repository.getBookingById(bookingId);
            expect(deletedBooking).toBeUndefined();
        });

        test('getAvailableTables', async () => {
            const table1: Table = {
                id: '1',
                seats: 4,
                type: 'table'
            };

            const table2: Table = {
                id: '2',
                seats: 6,
                type: 'booth'
            };

            await repository.createTable(table1);
            await repository.createTable(table2);

            const bookingData1: Omit<Booking, "id"> = {
                tableId: '1',
                date: '2022-12-31',
                startTime: '10:00',
                endTime: '15:00',
                seats: 4,
                customerName: "John Doe"
            };

            const bookingData2: Omit<Booking, "id"> = {
                tableId: '2',
                date: '2022-12-31',
                startTime: '14:00',
                endTime: '15:00',
                seats: 6,
                customerName: "John Doe"
            };

            await repository.createBooking(bookingData1);
            await repository.createBooking(bookingData2);
            const availableTables = await repository.getAvailableTables('2022-12-31', '12:00', '13:00');
            expect(availableTables.map(mask)).toEqual([table2]);
        });
    });

}
