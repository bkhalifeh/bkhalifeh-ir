import { Body, Controller, Param, Post, Redirect, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('blog')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Throttle({ default: { limit: 6, ttl: 60000 } })
  @Post(':slug/comment')
  create(
    @Param('slug') slug: string,
    @Body() body: CreateCommentDto,
    @Res() res: Response,
  ) {
    this.commentService.create(slug, body);
    res.redirect(`/blog/${slug}`);
  }
}
