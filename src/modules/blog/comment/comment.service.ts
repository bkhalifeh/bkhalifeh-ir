import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(slug: string, dto: CreateCommentDto) {
    try {
      const newComment = await this.prismaService.comment.create({
        data: {
          ...dto,
          post: {
            connect: {
              slug,
            },
          },
        },
      });
      if (newComment) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
