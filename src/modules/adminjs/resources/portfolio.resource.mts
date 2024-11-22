import { getModelByName } from '@adminjs/prisma';
import { BaseRecord, ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import uploadFileFeature from '@adminjs/upload';
import { join } from 'path';
import { CustomLocalProvider } from '../providers/custom.local.provider.mjs';
import { targetRelationSettingsFeature } from '../features/adminjs-relation/relations.feature.mjs';

export const PortfolioResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('Portfolio'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'Award',
        name: 'Portfolio Section',
      },
      properties: {
        image: {
          isVisible: {
            edit: false,
          },
        },
      },
    },
    features: [
      uploadFileFeature({
        multiple: false,
        componentLoader: args.componentLoader,
        properties: {
          key: 'image',
          file: 'imageFile',
        },
        provider: new CustomLocalProvider({
          bucket: join(process.cwd(), 'static/img/portfolio'),
          opts: {
            baseUrl: '/static/img/portfolio',
          },
        }),
        uploadPath: (record: BaseRecord, filename: string): string => {
          return args.utilService.randomFilename(filename);
        },
      }),
      targetRelationSettingsFeature(),
    ],
  };
};

export default PortfolioResource;
