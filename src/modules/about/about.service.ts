import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AboutService {
  constructor(private readonly prismaService: PrismaService) {}

  find() {
    return this.prismaService.about.findFirst({
      include: {
        educations: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        experiences: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        skillTopics: {
          include: { skills: true },
          orderBy: {
            priority: 'desc',
          },
        },
      },
    });
  }
}
