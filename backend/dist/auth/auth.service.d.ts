import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginDto: {
        address: string;
        signature: string;
    }): Promise<{
        token: string;
        user: import("../users/entities/user.entity").User;
    }>;
    verifyToken(token: string): Promise<{
        valid: boolean;
        user: import("../users/entities/user.entity").User;
    } | {
        valid: boolean;
        user?: undefined;
    }>;
    verifyWalletSignature(walletAddress: string, signature: string, message: string): Promise<boolean>;
    validateUser(walletAddress: string): Promise<any>;
}
