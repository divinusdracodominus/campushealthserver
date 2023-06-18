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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const data_service_1 = require("./data.service");
let DataController = class DataController {
    constructor(manager, auth) {
        this.manager = manager;
        this.auth = auth;
    }
    async insertSMS(headers, input) {
        await this.manager.insertSMSRecords(await this.manager.updateMetaData(input.metadata, input.data));
    }
    async insertUsageData(input) {
        if (input == undefined || input.metadata == undefined || input.data == undefined) {
            return { "status": "failure", "reason": "missing required data input: " + JSON.stringify(input) + " metadata: " + input.metadata };
        }
        await this.manager.insertAppUsageRecords(await this.manager.updateMetaData(input.metadata, input.data));
    }
    async createEvents(data) {
        console.log("data: " + JSON.stringify(data));
        return await this.manager.insertEvents(data);
    }
};
__decorate([
    (0, common_1.Post)("/sms"),
    (0, common_1.UseGuards)(auth_service_1.AuthService),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "insertSMS", null);
__decorate([
    (0, common_1.Post)("/usagedata"),
    (0, common_1.UseGuards)(auth_service_1.AuthService),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "insertUsageData", null);
__decorate([
    (0, common_1.Post)("/events"),
    (0, common_1.UseGuards)(auth_service_1.AuthService),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "createEvents", null);
DataController = __decorate([
    (0, common_1.Controller)('data'),
    __metadata("design:paramtypes", [data_service_1.DataService, auth_service_1.AuthService])
], DataController);
exports.DataController = DataController;
//# sourceMappingURL=data.controller.js.map