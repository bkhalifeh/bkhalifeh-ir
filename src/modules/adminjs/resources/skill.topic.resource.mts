import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import {
  owningRelationSettingsFeature,
  RelationType,
  targetRelationSettingsFeature,
} from '../features/adminjs-relation/index.mjs';

export const SkillTopicResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('SkillTopic'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'Info',
        name: 'About Section',
      },
    },
    features: [
      owningRelationSettingsFeature({
        componentLoader: args.componentLoader,
        relations: {
          skills: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'skillTopic',
              resourceId: 'Skill',
            },
          },
        },
      }),
      targetRelationSettingsFeature(),
    ],
  };
};

export default SkillTopicResource;
