import { BaseRecord, ResourceWithOptions } from 'adminjs';
import { getModelByName } from '@adminjs/prisma';

import { TResourceInput } from '../types/adminjs.type.mjs';
import slugFeature from '../features/slug.feature.mjs';
import uploadFileFeature from '@adminjs/upload';
import { CustomLocalProvider } from '../providers/custom.local.provider.mjs';
import { join } from 'path';
import {
  owningRelationSettingsFeature,
  RelationType,
} from '../features/adminjs-relation/index.mjs';

export const PostResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('Post'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'PenTool',
        name: 'Blog',
      },
      properties: {
        content: {
          type: 'richtext',
        },
        summary: {
          type: 'textarea',
        },
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
          bucket: join(process.cwd(), 'static/img/post'),
          opts: {
            baseUrl: '/static/img/post',
          },
        }),
        uploadPath: (record: BaseRecord, filename: string): string => {
          return args.utilService.randomFilename(filename);
        },
      }),
      owningRelationSettingsFeature({
        componentLoader: args.componentLoader,
        relations: {
          comments: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'post',
              resourceId: 'Comment',
            },
          },
        },
      }),
      slugFeature([{ input: 'title', output: 'slug' }]),
    ],
  };
};

export default PostResource;
