import { participants } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ExecutionContext } from '@nestjs/common';
export declare enum AuthStatus {
    MissingUser = 0,
    BadPassword = 1,
    Succeeded = 2
}
export interface AuthResult {
    status: AuthStatus;
    message: string | null;
    user: participants | null;
}
export declare class AuthService {
    private client;
    constructor(client: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateRequest(request: Request): Promise<boolean>;
    verify_user(userRequest: {
        email: string;
        participant_id: string;
    }): Promise<AuthResult>;
}
