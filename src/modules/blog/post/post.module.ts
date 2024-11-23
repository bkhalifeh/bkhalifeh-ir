import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { InfoModule } from '../../info/info.module';

@Module({
  imports: [PrismaModule, InfoModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
