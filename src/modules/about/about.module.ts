import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { InfoModule } from '../info/info.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, InfoModule],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
