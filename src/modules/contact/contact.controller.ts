import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { InfoService } from '../info/info.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CreateContactDto } from './dtos/create-contact.dto';

@Controller('contact')
// @UseInterceptors(CacheInterceptor)
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly infoService: InfoService,
  ) {}

  @Get()
  @Render('contact')
  async contactForm() {
    const info = await this.infoService.find();
    return {
      author: info.name,
      active: 'contact',
      title: 'تماس با من',
      description: 'صفحه ی تماس با من',
      info,
    };
  }

  @Post()
  @Redirect('/about')
  createContact(@Body() body: CreateContactDto) {
    this.contactService.create(body);
  }
}
