import { Controller, Get, Param, Post, Query, Headers, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { events } from '@prisma/client';
import { AuthResult, AuthService } from 'src/auth/auth.service';

@Controller('events')
export class EventsController {
    constructor(private manager: EventsService, private auth: AuthService) {}
    @Get("/")
    async listEvents() {
        return await this.manager.getEvents();
    }
    
    @Get("/:id")
    async getEvent(@Param("id") id: string) {
        return await this.manager.getEventById(id);
    }
}
