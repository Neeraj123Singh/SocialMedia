import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(address: string): Promise<User | undefined>;
    create(address: string): Promise<User>;
    findOrCreate(address: string): Promise<User>;
}
