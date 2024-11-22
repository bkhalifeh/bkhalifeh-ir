import { ActionContext, ActionRequest, AppError, flat } from 'adminjs';
import { Messages } from '../constants/messages.mjs';
import {
  RelationOptions,
  RelationsActionResponse,
  RelationsFeatureConfig,
  RelationType,
} from '../types/index.mjs';
import { manyToManyHandler } from './many-to-many/many-to-many.handler.mjs';
import { oneToManyHandler } from './one-to-many/one-to-many.handler.mjs';

export const findRelationHandler =
  (config: RelationsFeatureConfig) =>
  async (
    request: ActionRequest,
    response: any,
    context: ActionContext,
  ): Promise<RelationsActionResponse> => {
    const { relations } = config,
      { resource, _admin } = context,
      { query } = request,
      { recordId } = request.params;
    if (!recordId) throw new AppError(Messages.MissingRecordId);
    const unflattenQuery = flat.unflatten(query || {}),
      { relation } = unflattenQuery,
      relationOption: RelationOptions = relations[relation];

    if (!relationOption)
      throw new AppError(Messages.MissingConfiguration, void 0, {
        options: { relationName: relation },
      });
    const targetResource = _admin.findResource(
      relationOption.target.resourceId,
    );
    if (relationOption.type === RelationType.OneToMany) {
      return oneToManyHandler(
        recordId,
        {
          targetResource,
          ownerResource: resource,
          relation: relationOption,
        },
        unflattenQuery,
        context,
      );
    }

    if (relationOption.type === RelationType.ManyToMany)
      return manyToManyHandler(
        recordId,
        { targetResource, ownerResource: resource, relation: relationOption },
        unflattenQuery,
        context,
      );
    throw new AppError(Messages.InvalidRelationType, void 0, {
      options: { validTypes: Object.values(RelationType).join(', ') },
    });
  };
