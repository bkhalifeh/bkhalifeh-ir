import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import { targetRelationSettingsFeature } from '../features/adminjs-relation/index.mjs';

export const LinkResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('Link'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'Clipboard',
        name: 'Info Section',
      },
    },
    features: [targetRelationSettingsFeature()],
  };
};

export default LinkResource;
