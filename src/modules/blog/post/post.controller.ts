import { Controller, Get, Param, Render } from '@nestjs/common';
import { PostService } from './post.service';
import { InfoService } from '../../info/info.service';

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
  @Render('single-post')
  async findOne(@Param('slug') slug: string) {
    const info = await this.infoService.find();
    const post = await this.postService.findOne(slug);
    return {
      author: info.name,
      title: post.title,
      description: post.summary,
      info,
      post,
    };
  }
}
