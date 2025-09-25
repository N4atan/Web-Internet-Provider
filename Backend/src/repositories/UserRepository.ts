import { User } from '../models/User';
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

    async findById(id: number): Promise<User | null> {
        return this.repository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }

    async remove(User: User): Promise<User> {
        return this.repository.remove(User);
    }
}
