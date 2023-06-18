import { appusageevents } from '@prisma/client';
import { calldata, smsdata, metadata } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { events } from '@prisma/client';
import { Result } from 'src/utils/index';
interface RecordSet {
    metadata_id: string;
}
export declare class DataService {
    private client;
    constructor(client: PrismaService);
    insertSMSRecords(data: smsdata[]): Promise<void>;
    insertCallRecords(data: calldata[]): Promise<void>;
    insertAppUsageRecords(data: appusageevents[]): Promise<void>;
    updateMetaData<Record extends RecordSet>(metadata: metadata, datarecords: Record[]): Promise<Record[]>;
    getMetaData(metadata: metadata): Promise<string>;
    insertEvents(eventlist: events[]): Promise<Result>;
}
export {};
