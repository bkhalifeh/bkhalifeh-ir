import {
  ActionContext,
  ActionRequest,
  ActionResponse,
  AppError,
  Filter,
} from 'adminjs';
import {
  ManyToManyRelationOptions,
  Messages,
  RelationsFeatureConfig,
} from '../../index.mjs';
export const deleteRelationHandler =
  (config: RelationsFeatureConfig) =>
  async (
    request: ActionRequest,
    response: any,
    context: ActionContext,
  ): Promise<ActionResponse> => {
    const { record, _admin, resource } = context,
      { relations } = config,
      query = request.query ?? {},
      { relation, targetRecordId } = query;
    if (!relation || !targetRecordId || !record)
      return {
        record: record?.toJSON?.(context.currentAdmin),
        notice: {
          type: 'error',
          message: Messages.QueryParamsMissing,
          resourceId: resource.id(),
        },
      };
    const m2mRelationOptions = relations[relation] as ManyToManyRelationOptions,
      { junction } = m2mRelationOptions;
    if (!junction) throw new AppError(Messages.JunctionMissing);
    const findedResource = _admin.findResource(junction.throughResourceId);
    if (!findedResource)
      throw new AppError(
        Messages.JunctionResourceMissing,
        { junctionResourceId: junction.throughResourceId },
        { options: { junctionResourceId: junction.throughResourceId } },
      );
    const [findedRecord] = await findedResource.find(
      new Filter(
        {
          [junction.inverseJoinKey]: targetRecordId,
          [junction.joinKey]: record.id(),
        },
        findedResource,
      ),
      {
        limit: 1,
        offset: 0,
        sort: { sortBy: junction.joinKey, direction: 'desc' },
      },
    );
    if (!findedRecord) throw new AppError(Messages.JunctionRecordMissing);
    return (
      await findedResource.delete(findedRecord.id()),
      {
        record: record.toJSON(context.currentAdmin),
        notice: {
          type: 'success',
          message: Messages.RelationSuccessfullyDeleted,
          resourceId: resource.id(),
        },
      }
    );
  };
