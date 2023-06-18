import { appusageevents, metadata } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { DataService } from './data.service';
import { smsdata } from '@prisma/client';
import { events } from '@prisma/client';
export declare class DataController {
    private manager;
    private auth;
    constructor(manager: DataService, auth: AuthService);
    insertSMS(headers: any, input: {
        metadata: metadata;
        data: smsdata[];
    }): Promise<void>;
    insertUsageData(input: {
        metadata: metadata;
        data: appusageevents[];
    }): Promise<{
        status: string;
        reason: string;
    }>;
    createEvents(data: events[]): Promise<import("../utils").Result>;
}
