import { Body, Controller, Post, Headers, Get, UseGuards } from '@nestjs/common';
import { appusageevents, metadata, participants } from '@prisma/client';
import { AuthResult, AuthService } from 'src/auth/auth.service';
import { DataService } from './data.service';
import { smsdata } from '@prisma/client';
import { events } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';


@Controller('data')
export class DataController {
    constructor(private manager: DataService, private auth: AuthService) {}
    @Post("/sms")
    @UseGuards(AuthService)
    async insertSMS(@Headers() headers, @Body() input: { metadata: metadata, data: smsdata[] }) {
        await this.manager.insertSMSRecords(
            await this.manager.updateMetaData(input.metadata, input.data)
        );
    }
    @Post("/usagedata")
    @UseGuards(AuthService)
    async insertUsageData(@Body() input: { metadata: metadata, data: appusageevents[] }) {
        if(input == undefined || input.metadata == undefined || input.data == undefined) {
            return { "status": "failure", "reason": "missing required data input: " + JSON.stringify(input) + " metadata: " + input.metadata };
        }
        await this.manager.insertAppUsageRecords(
            await this.manager.updateMetaData(input.metadata, input.data)
        );
    }

    @Post("/events")
    @UseGuards(AuthService)
    async createEvents(@Body() data: events[]) {
        console.log("data: " + JSON.stringify(data));
        return await this.manager.insertEvents(data);
    }
}
