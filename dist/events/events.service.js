"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const runtime_1 = require("@prisma/client/runtime");
let EventsService = class EventsService {
    constructor(client) {
        this.client = client;
    }
    async getEvents() {
        return await this.client.events.findMany({ select: { id: true, title: true } });
    }
    async simpleQueryEvents(event) {
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
    async getEventById(id) {
        return await this.client.events.findUnique({ where: { id: id } });
    }
    async queryEvents(title, description) {
        return await this.client.$queryRaw(new runtime_1.Sql([`select * from events 
            where title like '%$1%' or
            description like '%$2%';
            `], [title, description]));
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map