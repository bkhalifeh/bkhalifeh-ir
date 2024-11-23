import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { PrismaModule } from '../prisma/prisma.module';
import { InfoController } from './info.controller';

@Module({
  imports: [PrismaModule],
  providers: [InfoService],
  exports: [InfoService],
  controllers: [InfoController],
})
export class InfoModule {}
