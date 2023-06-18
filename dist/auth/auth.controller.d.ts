import { participants } from '@prisma/client';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    createUser(data: participants): Promise<string>;
    login(data: {
        email: string;
        participant_id: string;
    }): Promise<import("./auth.service").AuthResult>;
}
