import {
  ActionContext,
  ActionRequest,
  buildFeature,
  FeatureType,
} from 'adminjs';
import slugify from 'slugify';
import { TSlugFeatureInput } from '../types/adminjs.type.mjs';

export default (args: string[]): FeatureType => {
  return buildFeature({
    actions: {
      new: {
        before: [
          async (
            request: any,
            context: ActionContext,
          ): Promise<ActionRequest> => {
            args.forEach((c) => {
              request.payload[c] = request.payload[c]
                .replaceAll('&lt;%', '<%')
                .replaceAll('%&gt;', '%>');
            });
            return request;
          },
        ],
      },
      edit: {
        before: [
          async (
            request: ActionRequest,
            context: ActionContext,
          ): Promise<ActionRequest> => {
            args.forEach((c) => {
              if (request.payload[c]) {
                request.payload[c] = request.payload[c]
                  .replaceAll('&lt;%', '<%')
                  .replaceAll('%&gt;', '%>');
              }
            });
            return request;
          },
        ],
      },
    },
  });
};
