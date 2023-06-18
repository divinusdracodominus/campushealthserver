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
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const index_1 = require("../utils/index");
let DataService = class DataService {
    constructor(client) {
        this.client = client;
    }
    async insertSMSRecords(data) {
        await this.client.smsdata.createMany({ data: data });
    }
    async insertCallRecords(data) {
        await this.client.calldata.createMany({ data: data });
    }
    async insertAppUsageRecords(data) {
        await this.client.appusageevents.createMany({ data: data });
    }
    async updateMetaData(metadata, datarecords) {
        let metadata_id = await this.getMetaData(metadata);
        let resdata = datarecords;
        if (metadata_id != metadata.id) {
            resdata = datarecords.map((val) => {
                val.metadata_id = metadata_id;
                return val;
            });
        }
        else {
            await this.client.metadata.create({ data: metadata });
        }
        return resdata;
    }
    async getMetaData(metadata) {
        let result = await this.client.metadata.findFirst({
            where: {
                AND: {
                    device_id: metadata.device_id,
                    participant_id: metadata.participant_id
                }
            },
        });
        if (result == null) {
            return metadata.id;
        }
        return result.id;
    }
    async insertEvents(eventlist) {
        try {
            console.log("about to insert events");
            let result = await this.client.events.createMany({ data: eventlist });
        }
        catch (error) {
            console.log("insert error: " + error.message);
            return { status: index_1.STATUS_FAILURE, message: error.message, data: null };
        }
        return { status: index_1.STATUS_OK, message: "success", data: null };
    }
};
DataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map