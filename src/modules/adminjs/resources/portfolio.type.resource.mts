import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import {
  owningRelationSettingsFeature,
  RelationType,
} from '../features/adminjs-relation/index.mjs';
import slugFeature from '../features/slug.feature.mjs';

export const PortfolioTypeResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('PortfolioType'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'Award',
        name: 'Portfolio Section',
      },
      properties: {
        slug: {
          isVisible: {
            edit: false,
            list: true,
            show: true,
          },
        },
      },
    },
    features: [
      owningRelationSettingsFeature({
        componentLoader: args.componentLoader,
        relations: {
          portfolios: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'portfolioType',
              resourceId: 'Portfolio',
            },
          },
        },
      }),
      slugFeature([{ input: 'title', output: 'slug' }]),
    ],
  };
};

export default PortfolioTypeResource;
