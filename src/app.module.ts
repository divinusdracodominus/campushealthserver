import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { DataModule } from './data/data.module';
import { join } from 'path';
import { EventsModule } from './events/events.module';

@Module({
  imports: [AuthModule, DataModule 
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
