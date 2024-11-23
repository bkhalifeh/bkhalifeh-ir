import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import { targetRelationSettingsFeature } from '../features/adminjs-relation/index.mjs';

export const PostLinkResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('PostLink'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'Edit',
        name: 'Blog',
      },
    },
    features: [targetRelationSettingsFeature()],
  };
};

export default PostLinkResource;
