import { getModelByName } from '@adminjs/prisma';
import { BaseRecord, ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';
import {
  owningRelationSettingsFeature,
  RelationType,
  targetRelationSettingsFeature,
} from '../features/adminjs-relation/index.mjs';
import { CustomLocalProvider } from '../providers/custom.local.provider.mjs';
import { join } from 'path';
import uploadFileFeature from '@adminjs/upload';

export const InfoResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('Info'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'Clipboard',
        name: 'Info Section',
      },
      properties: {
        image: {
          isVisible: {
            edit: false,
          },
        },
        resume: {
          isVisible: {
            edit: false,
          },
        },
      },
    },
    features: [
      owningRelationSettingsFeature({
        componentLoader: args.componentLoader,
        relations: {
          links: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'info',
              resourceId: 'Link',
            },
          },
        },
      }),
      targetRelationSettingsFeature(),
      uploadFileFeature({
        multiple: false,
        componentLoader: args.componentLoader,
        properties: {
          key: 'image',
          file: 'imageFile',
          filePath: 'imageFileFp',
          filesToDelete: 'imageFileFtd',
        },
        provider: new CustomLocalProvider({
          bucket: join(process.cwd(), 'static/img/info'),
          opts: {
            baseUrl: '/static/img/info',
          },
        }),
        uploadPath: (record: BaseRecord, filename: string): string => {
          return args.utilService.randomFilename(filename);
        },
      }),
      uploadFileFeature({
        multiple: false,
        componentLoader: args.componentLoader,
        properties: {
          key: 'resume',
          file: 'resumeFile',
        },
        provider: new CustomLocalProvider({
          bucket: join(process.cwd(), 'static/doc'),
          opts: {
            baseUrl: '/static/doc',
          },
        }),
        uploadPath: (record: BaseRecord, filename: string): string => {
          return args.utilService.randomFilename(filename);
        },
      }),
    ],
  };
};

export default InfoResource;
