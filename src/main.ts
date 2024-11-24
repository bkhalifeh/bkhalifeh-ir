import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.disable('x-powered-by');
  app.setViewEngine('pug');
  app.setBaseViewsDir(join(process.cwd(), 'views'));

  app.use(favicon(join(process.cwd(), 'static', 'img', 'favicon.ico')));
  app.use(morgan('dev'));

  await app.listen(
    configService.get<number>('APP_PORT', 3000),
    configService.get<string>('APP_HOST', '0.0.0.0'),
  );
}
bootstrap();
