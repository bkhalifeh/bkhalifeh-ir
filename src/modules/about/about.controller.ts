import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AboutService } from './about.service';
import { InfoService } from '../info/info.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('about')
//@UseInterceptors(CacheInterceptor)
export class AboutController {
  constructor(
    private readonly aboutService: AboutService,
    private readonly infoService: InfoService,
  ) {}

  @Get()
  @Render('about')
  async about() {
    const info = await this.infoService.find();
    const about = await this.aboutService.find();
    return {
      author: info.name,
      active: 'about',
      title: 'درباره من',
      description: 'صفحه ی درباره من',
      info,
      about,
    };
  }
}
