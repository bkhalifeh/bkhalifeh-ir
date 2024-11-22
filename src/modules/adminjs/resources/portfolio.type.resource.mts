import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import {
  owningRelationSettingsFeature,
  RelationType,
} from '../features/adminjs-relation/index.mjs';

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
    ],
  };
};

export default PortfolioTypeResource;
