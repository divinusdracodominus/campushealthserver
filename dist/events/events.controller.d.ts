import { EventsService } from './events.service';
import { events } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
export declare class EventsController {
    private manager;
    private auth;
    constructor(manager: EventsService, auth: AuthService);
    listEvents(): Promise<{
        id: string;
        title: string;
    }[]>;
    getEvent(id: string): Promise<events>;
}
