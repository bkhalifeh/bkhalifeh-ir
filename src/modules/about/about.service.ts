import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AboutService {
  constructor(private readonly prismaService: PrismaService) {}

  find() {
    return this.prismaService.about.findFirst({
      include: {
        educations: true,
        experiences: true,
        skillTopics: {
          include: { skills: true },
        },
      },
    });
  }
}
