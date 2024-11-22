import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InfoService],
  exports: [InfoService],
})
export class InfoModule {}
