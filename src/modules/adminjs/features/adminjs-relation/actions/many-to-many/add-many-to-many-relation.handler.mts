import {
  ActionContext,
  ActionHandler,
  ActionRequest,
  ActionResponse,
  AppError,
  Filter,
  flat,
} from 'adminjs';
import {
  ManyToManyRelationOptions,
  Messages,
  RelationOptions,
  RelationsFeatureConfig,
} from '../../index.mjs';
export const addManyToManyRelationHandler =
  (config: RelationsFeatureConfig): ActionHandler<ActionResponse> =>
  async (request: ActionRequest, response: any, context: ActionContext) => {
    if ('get' === request.method) return response;
    const { _admin, record, resource } = context,
      { query, payload = {} } = request,
      unflattenQuery = flat.unflatten(query || {}),
      { relation } = unflattenQuery,
      { relations } = config,
      relationOptions = relations[relation] as ManyToManyRelationOptions,
      { junction } = relationOptions;
    if (!junction) throw new AppError(Messages.JunctionMissing);
    const findedResource = _admin.findResource(junction.throughResourceId),
      [findedRecord] = await findedResource.find(
        new Filter(
          {
            [junction.joinKey]: context.record?.id(),
            [junction.inverseJoinKey]: payload.targetId,
          },
          findedResource,
        ),
        {
          limit: 1,
          offset: 0,
          sort: { sortBy: junction.joinKey, direction: 'asc' },
        },
      );
    if (findedRecord)
      throw new AppError(Messages.ManyToManyRelationAlreadyExists);
    return (
      await findedResource.create({
        [junction.joinKey]: record?.id(),
        [junction.inverseJoinKey]: payload.targetId,
      }),
      {
        record: record?.toJSON(context.currentAdmin),
        notice: {
          type: 'success',
          message: Messages.RelationSuccessfullyAdded,
          resourceId: resource.id(),
        },
      }
    );
  };
