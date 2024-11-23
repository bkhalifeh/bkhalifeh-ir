import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(slug: string, dto: CreateCommentDto) {
    this.prismaService.comment
      .create({
        data: {
          ...dto,
          post: {
            connect: {
              slug,
            },
          },
        },
      })
      .then(() => {});
  }
}
