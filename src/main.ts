import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

import morgan from 'morgan';
import helmet from 'helmet';
import favicon from 'serve-favicon';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.disable('x-powered-by');

  app.set('trust proxy', true);
  app.setViewEngine('pug');
  app.setBaseViewsDir(join(process.cwd(), 'views'));

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.use(favicon(join(process.cwd(), 'static', 'img', 'favicon.ico')));
  app.use(morgan('dev'));
  app.use(helmet());

  const server = await app.listen(
    configService.get<number>('APP_PORT', 3000),
    configService.get<string>('APP_HOST', '0.0.0.0'),
  );

  process.on("SIGTERM", () => {
    server.close((err) => {
      if (err) process.exit(1);
      process.exit(0);
    });
  });
}
bootstrap();
