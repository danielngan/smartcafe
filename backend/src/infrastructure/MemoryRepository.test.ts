import { MemoryRepository } from './MemoryRepository';
import { runRepositoryTests } from '../repository/Repository.test';

describe('MemoryRepository', () => {
    runRepositoryTests(
        () => Promise.resolve(new MemoryRepository()),
        (repository) => Promise.resolve()
    );
});
