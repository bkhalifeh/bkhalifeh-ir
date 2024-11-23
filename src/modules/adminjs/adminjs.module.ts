import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import { join } from 'node:path';
import { readdirSync } from 'node:fs';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilService } from '../util/util.service';
import { isEmail, isStrongPassword } from 'class-validator';
import argon2 from 'argon2';
import { UtilModule } from '../util/util.module';

@Module({
  imports: [
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        imports: [PrismaModule, UtilModule],
        inject: [ConfigService, PrismaService, UtilService],
        useFactory: async (
          configService: ConfigService,
          prismaService: PrismaService,
          utilService: UtilService,
        ) => {
          const adminjs = await import('adminjs');
          const AdminJsPrisma = await import('@adminjs/prisma');
          const componentLoader = new adminjs.ComponentLoader();
          // Add Custom Component
          const COMPONENTS_PATH = join(process.cwd(), 'components');
          readdirSync(COMPONENTS_PATH).forEach((fileComponent) => {
            if (fileComponent.endsWith('.mjs')) {
              componentLoader.add(
                fileComponent.replace('.mjs', ''),
                join(COMPONENTS_PATH, fileComponent),
              );
            }
          });

          const rargs = {
            componentLoader,
            prismaService,
            utilService,
          };

          adminjs.AdminJS.registerAdapter({
            Resource: AdminJsPrisma.Resource,
            Database: AdminJsPrisma.Database,
          });
          const isProduction =
            configService.get<string>('NODE_ENV') === 'production';
          return {
            sessionOptions: {
              secret: utilService
                .b64decode(configService.get<string>('SESSION_SECRET'))
                .toString(),
              cookie: {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/',
                httpOnly: isProduction,
                sameSite: isProduction,
                secure: isProduction,
                signed: isProduction,
              },
              store: new PrismaSessionStore(prismaService, {}),
              saveUninitialized: false,
              resave: false,
            },
            adminJsOptions: {
              rootPath: '/admin',
              componentLoader,
              branding: {
                companyName: 'Bkhalifeh',
                withMadeWithLove: false,
                //favicon: '/static/logo.png',
                //logo: '/static/logo.png',
              },
              resources: await Promise.all(
                readdirSync(join(__dirname, 'resources'))
                  .filter((resourse: string) => {
                    return resourse.endsWith('.mjs');
                  })
                  .map(async (resourse: string) => {
                    return (await import(`./resources/${resourse}`)).default(
                      rargs,
                    );
                  }),
              ),
            },
            auth: {
              cookieName: 'admin',
              cookiePassword: utilService
                .b64decode(configService.get<string>('SESSION_SECRET'))
                .toString(),
              provider: new adminjs.DefaultAuthProvider({
                componentLoader,
                authenticate: async (payload, context) => {
                  if (
                    isEmail(payload.email) &&
                    isStrongPassword(payload.password)
                  ) {
                    const admin = await prismaService.user.findUnique({
                      where: { email: payload.email },
                    });
                    if (
                      admin &&
                      (await argon2.verify(admin.password, payload.password))
                    ) {
                      return {
                        email: admin.email,
                        theme: 'light',
                      };
                    }
                  }
                  return null;
                },
              }),
            },
          };
        },
      }),
    ),
  ],
})
export class AdminjsModule {}
