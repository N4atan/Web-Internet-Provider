import { User } from '../model/user';
import { DataSource, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async createAndSave(data: Partial<User>): Promise<User> {
        this.repository.create(data);
        return this.repository.save(data);
    }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }
}