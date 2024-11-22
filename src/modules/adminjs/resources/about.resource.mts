import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import {
  owningRelationSettingsFeature,
  RelationType,
} from '../features/adminjs-relation/index.mjs';

export const AboutResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('About'),
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
    features: [
      owningRelationSettingsFeature({
        componentLoader: args.componentLoader,
        relations: {
          educations: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'about',
              resourceId: 'Education',
            },
          },
          experiences: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'about',
              resourceId: 'Experience',
            },
          },
          skillTopics: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'about',
              resourceId: 'SkillTopic',
            },
          },
        },
      }),
    ],
  };
};

export default AboutResource;
