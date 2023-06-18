import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { events } from '@prisma/client';
import { Sql } from '@prisma/client/runtime';

@Injectable()
export class EventsService {
    constructor(private client: PrismaService) {}
    async getEvents(): Promise<{ id: string, title: string }[]> {
        return await this.client.events.findMany( { select: { id: true, title: true }} );
    }
    async simpleQueryEvents(event: events): Promise<events[]> {
        return await this.client.events.findMany({
            where: {
                OR: [
                    { title: event.title },
                    { description: event.description },
                    { organizer: event.organizer }
                ],
            }
        });
    }
    async getEventById(id: string): Promise<events> {
        return await this.client.events.findUnique( { where: { id: id } } );
    }
    async queryEvents(title: string, description: string): Promise<events[]> {
        return await this.client.$queryRaw(new Sql([`select * from events 
            where title like '%$1%' or
            description like '%$2%';
            `], [title, description]));
    }
}
