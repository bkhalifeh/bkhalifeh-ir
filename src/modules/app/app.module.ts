import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from '../util/util.module';
import { AdminjsModule } from '../adminjs/adminjs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UtilModule,
    AdminjsModule,
  ],
})
export class AppModule {}
