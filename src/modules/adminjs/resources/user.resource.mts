import {
  ResourceWithOptions,
} from 'adminjs';
import { getModelByName } from '@adminjs/prisma';
import passwordsFeature from '@adminjs/passwords';

import { TResourceInput } from '../types/adminjs.type.mjs';
import argon2 from 'argon2';

export const UserResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('User'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'User',
      },
      properties: {
        password: { isVisible: false },
        newPassword: { isRequired: true },
      },
    },
    features: [
      passwordsFeature({
        componentLoader: args.componentLoader,
        properties: {
          encryptedPassword: 'password',
          password: 'newPassword',
        },
        hash: argon2.hash,
      }),
    ],
  };
};

export default UserResource;
