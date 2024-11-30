import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { InfoService } from '../../info/info.service';
import slugify from 'slugify';
import { Response } from 'express';

@Controller('blog')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly infoService: InfoService,
  ) {}

  @Get()
  @Render('list-post')
  async findAll() {
    const info = await this.infoService.find();
    const posts = await this.postService.findAll();
    return {
      author: info.name,
      active: 'blog',
      title: 'وبلاگ',
      description: 'hello world!',
      info,
      posts,
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string, @Res() res: Response) {
    const post = await this.postService.findOne(slugify(slug));
    if (post) {
      const info = await this.infoService.find();
      res.render('single-post', {
        author: info.name,
        title: post.title,
        description: post.summary,
        info,
        post,
      });
    } else {
      res.redirect('/blog');
    }
  }
}
