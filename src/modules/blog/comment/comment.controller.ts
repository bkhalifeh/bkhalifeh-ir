import { Body, Controller, Param, Post, Redirect, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import slugify from 'slugify';

@Controller('blog')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Throttle({ default: { limit: 6, ttl: 60000 } })
  @Post(':slug/comment')
  async create(
    @Param('slug') slug: string,
    @Body() body: CreateCommentDto,
    @Res() res: Response,
  ) {
    const s = slugify(slug);
    const r = await this.commentService.create(s, body);
    if (r) {
      res.redirect(`/blog/${s}`);
    } else {
      res.redirect('/');
    }
  }
}
