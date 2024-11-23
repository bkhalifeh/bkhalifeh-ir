import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prismaService: PrismaService) {}

  async find() {
    const portfolioTypes = await this.prismaService.portfolioType.findMany({});
    const portfolios = await this.prismaService.portfolio.findMany({
      include: {
        portfolioType: true,
      },
    });
    return { portfolioTypes, portfolios };
  }
}
