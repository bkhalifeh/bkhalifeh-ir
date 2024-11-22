import {
  ActionContext,
  ActionRequest,
  buildFeature,
  FeatureType,
} from 'adminjs';
import slugify from 'slugify';
import { TSlugFeatureInput } from '../types/adminjs.type.mjs';

export default (params: TSlugFeatureInput[]): FeatureType => {
  return buildFeature({
    actions: {
      new: {
        before: [
          async (
            request: any,
            context: ActionContext,
          ): Promise<ActionRequest> => {
            params.forEach((c) => {
              request.payload[c.output] = slugify
                .default(request.payload[c.input])
                .toLowerCase();
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
            params.forEach((c) => {
              if (request.payload[c.input]) {
                request.payload[c.output] = slugify
                  .default(request.payload[c.input])
                  .toLowerCase();
              }
            });
            return request;
          },
        ],
      },
    },
  });
};
