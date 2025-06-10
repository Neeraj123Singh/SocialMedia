import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: {
        address: string;
        signature: string;
    }): Promise<{
        token: string;
        user: import("../users/entities/user.entity").User;
    }>;
    verify(verifyDto: {
        token: string;
    }): Promise<{
        valid: boolean;
        user: import("../users/entities/user.entity").User;
    } | {
        valid: boolean;
        user?: undefined;
    }>;
}
