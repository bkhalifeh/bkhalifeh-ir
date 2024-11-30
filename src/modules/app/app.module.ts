import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from '../util/util.module';
import { AdminjsModule } from '../adminjs/adminjs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BlogModule } from '../blog/blog.module';
import { InfoModule } from '../info/info.module';
import { AboutModule } from '../about/about.module';
import { ContactModule } from '../contact/contact.module';
import { AppController } from './app.controller';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static'),
      serveRoot: '/static',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 45,
      },
    ]),
    PrismaModule,
    UtilModule,
    InfoModule,
    BlogModule,
    AboutModule,
    ContactModule,
    PortfolioModule,
    AdminjsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
