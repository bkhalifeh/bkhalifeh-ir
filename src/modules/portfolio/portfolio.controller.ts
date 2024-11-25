import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { InfoService } from '../info/info.service';

@Controller('portfolio')
// @UseInterceptors(CacheInterceptor)
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly infoService: InfoService,
  ) {}

  @Get()
  @Render('portfolio')
  async find() {
    const info = await this.infoService.find();
    const { portfolioTypes, portfolios } = await this.portfolioService.find();
    return {
      author: info.name,
      active: 'portfolio',
      title: 'نمونه کار ها',
      description: 'صفحه ی نمونه کار های انجام شده',
      info,
      portfolioTypes,
      portfolios,
    };
  }
}
