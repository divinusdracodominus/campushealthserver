import { Body, Injectable, Post } from '@nestjs/common';
import { appusageevents } from '@prisma/client';
import { calldata, smsdata, metadata } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { events } from '@prisma/client';
import { Result, STATUS_OK, STATUS_FAILURE } from 'src/utils/index';

interface RecordSet {
    metadata_id: string;
}

@Injectable()
export class DataService {
    constructor(private client: PrismaService) {}
    async insertSMSRecords(data: smsdata[]) {
        await this.client.smsdata.createMany({data: data});
    }
    async insertCallRecords(data: calldata[]) {
        await this.client.calldata.createMany({data: data});
    }
    async insertAppUsageRecords(data: appusageevents[]) {
        await this.client.appusageevents.createMany({data: data});
    }

    async updateMetaData<Record extends RecordSet>(metadata: metadata, datarecords: Record[]): 
    Promise<Record[]> {
        let metadata_id: string = await this.getMetaData(metadata);
        let resdata = datarecords;
        if(metadata_id != metadata.id) {
            resdata = datarecords.map((val: Record) => {
                val.metadata_id = metadata_id;
                return val;
            });
        }else{
            await this.client.metadata.create({ data: metadata });
        }
        return resdata;
    }

    async getMetaData(metadata: metadata): Promise<string> {
        let result = await this.client.metadata.findFirst({
            where: {
                AND: {
                    device_id: metadata.device_id,
                    participant_id: metadata.participant_id
                }
            },
        });
        if(result == null) {
            return metadata.id;
        }
        return result.id;
    }


    async insertEvents(eventlist: events[]): Promise<Result> {
        try {
            console.log("about to insert events");
            let result = await this.client.events.createMany({data: eventlist});
        }catch(error: any) {
            console.log("insert error: " + error.message);
            return { status: STATUS_FAILURE, message: error.message, data: null};
        }
        return { status: STATUS_OK, message: "success", data: null};
    }
}
