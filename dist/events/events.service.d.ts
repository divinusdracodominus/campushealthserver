import { PrismaService } from 'src/prisma.service';
import { events } from '@prisma/client';
export declare class EventsService {
    private client;
    constructor(client: PrismaService);
    getEvents(): Promise<{
        id: string;
        title: string;
    }[]>;
    simpleQueryEvents(event: events): Promise<events[]>;
    getEventById(id: string): Promise<events>;
    queryEvents(title: string, description: string): Promise<events[]>;
}
