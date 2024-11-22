import {
  ActionContext,
  ActionRequest,
  buildFeature,
  BulkActionResponse,
  RecordActionResponse,
} from 'adminjs';
import { TJsonFeatureInput } from '../types/adminjs.type.mjs';

export default (args: TJsonFeatureInput) => {
  return buildFeature({
    actions: {
      new: {
        before: [
          (request: ActionRequest, context: ActionContext): ActionRequest => {
            args.properties.forEach((p) => {
              if (request.payload[p]) {
                request.payload[p] = Buffer.from(request.payload[p], 'base64');
              }
            });
            return request;
          },
        ],
      },
      edit: {
        before: [
          (request: ActionRequest, context: ActionContext): ActionRequest => {
            args.properties.forEach((p) => {
              if (request.payload[p]) {
                request.payload[p] = Buffer.from(request.payload[p], 'base64');
              }
            });
            return request;
          },
        ],
      },
      list: {
        after: [
          (
            response: BulkActionResponse,
            request: ActionRequest,
            context: ActionContext,
          ): BulkActionResponse => {
            response.records.forEach((r) => {
              args.properties.forEach((p) => {
                if (r.params[p]) {
                  r.params[p] = r.params[p].toString('base64');
                }
              });
            });
            return response;
          },
        ],
      },
      show: {
        after: [
          (
            response: RecordActionResponse,
            request: ActionRequest,
            context: ActionContext,
          ): RecordActionResponse => {
            args.properties.forEach((p) => {
              if (response.record.params[p]) {
                response.record.params[p] =
                  response.record.params[p].toString('base64');
              }
            });
            return response;
          },
        ],
      },
    },
  });
};
