import {
  ActionContext,
  ActionRequest,
  buildFeature,
  BulkActionResponse,
  RecordActionResponse,
} from 'adminjs';
import { TJsonFeatureInput } from '../types/adminjs.type.mjs';
import { unflatten } from 'safe-flat';

export default (args: TJsonFeatureInput) => {
  return buildFeature({
    actions: {
      new: {
        before: [
          (request: ActionRequest, context: ActionContext): ActionRequest => {
            args.properties.forEach((p) => {
              if (request.payload[p]) {
                request.payload[p] = JSON.parse(request.payload[p]);
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
                request.payload[p] = JSON.parse(request.payload[p]);
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
              r.params = unflatten(r.params);
              args.properties.forEach((p) => {
                if (r.params[p]) {
                  r.params[p] = JSON.stringify(r.params[p]);
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
            response.record.params = unflatten(response.record.params);
            args.properties.forEach((p) => {
              if (response.record.params[p]) {
                response.record.params[p] = JSON.stringify(
                  response.record.params[p],
                );
              }
            });
            return response;
          },
        ],
      },
    },
  });
};
