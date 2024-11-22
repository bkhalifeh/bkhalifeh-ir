import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import { targetRelationSettingsFeature } from '../features/adminjs-relation/index.mjs';

export const SkillResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('Skill'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'Info',
        name: 'About Section',
      },
    },
    features: [targetRelationSettingsFeature()],
  };
};

export default SkillResource;
