import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from '../util/util.module';
import { AdminjsModule } from '../adminjs/adminjs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static'),
      serveRoot: '/static',
    }),
    PrismaModule,
    UtilModule,
    AdminjsModule,
  ],
})
export class AppModule {}
