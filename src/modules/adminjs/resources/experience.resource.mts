import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import { targetRelationSettingsFeature } from '../features/adminjs-relation/index.mjs';

export const ExperienceResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('Experience'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'Info',
        name: 'About Section',
      },
      properties: {
        content: {
          type: 'richtext',
        },
      },
    },
    features: [targetRelationSettingsFeature()],
  };
};

export default ExperienceResource;