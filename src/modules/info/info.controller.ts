import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { InfoService } from './info.service';
import { join } from 'path';

@Controller()
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('resume')
  @Header('Content-Disposition', 'attachment; filename=resume.pdf')
  async downloadResume(@Res() res: Response) {
    res.sendFile(
      join(process.cwd(), 'static', 'doc', await this.infoService.getResume()),
      (errSendFile) => {
        if (errSendFile) {
          console.log(errSendFile);
        }
      },
    );
  }
}
