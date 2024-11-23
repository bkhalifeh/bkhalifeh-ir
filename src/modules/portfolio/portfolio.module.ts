import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { InfoModule } from '../info/info.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, InfoModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
