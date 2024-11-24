import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import favicon from 'serve-favicon';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.disable('x-powered-by');
  app.setViewEngine('pug');
  app.setBaseViewsDir(join(process.cwd(), 'views'));

  app.use(favicon(join(process.cwd(), 'static', 'img', 'favicon.ico')));
  app.use(morgan('dev'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
