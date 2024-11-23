import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { InfoModule } from '../info/info.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, InfoModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
