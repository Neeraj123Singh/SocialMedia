import { UsersService } from './users.service';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(address: string): Promise<User>;
    create(createUserDto: {
        address: string;
    }): Promise<User>;
}
