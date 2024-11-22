import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InfoService {
  constructor(private readonly prismaService: PrismaService) {}

  find() {
    return this.prismaService.info.findFirst({
      include: {
        links: true,
      },
    });
  }
}
