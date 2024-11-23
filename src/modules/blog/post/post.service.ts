import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(slug: string) {
    return this.prismaService.post.findUnique({
      where: { slug },
      include: { comments: true, links: true },
    });
  }

  findAll() {
    return this.prismaService.post.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
