import {
  ActionContext,
  ActionQueryParameters,
  AppError,
  Filter,
  populator,
  SortSetter,
} from 'adminjs';
import { Messages } from '../../constants/messages.mjs';
import {
  OneToManyRelationOptions,
  RelationLoaderHandlerConfig,
} from '../../types/index.mjs';

export const oneToManyHandler = async (
  recordId: string,
  config: RelationLoaderHandlerConfig<OneToManyRelationOptions>,
  query: ActionQueryParameters | undefined = {},
  context: ActionContext,
) => {
  const { relation, targetResource } = config,
    {
      sortBy,
      direction = 'asc',
      filters = {},
      perPage = context._admin.options.settings?.defaultPerPage || 10,
      page = 1,
    } = query;
  if (!relation.target.joinKey) throw new AppError(Messages.JoinKeyMissing);
  filters[relation.target.joinKey] = recordId;
  const listProperties = targetResource.decorate().getListProperties(),
    firstProperty = listProperties.find((a) => a.isSortable());
  let sort;
  firstProperty &&
    (sort = SortSetter(
      { sortBy, direction },
      firstProperty.name(),
      targetResource.decorate().options,
    ));
  const filter = new Filter(filters, targetResource);
  const records = await targetResource.find(
    filter,
    { limit: perPage, offset: (page - 1) * perPage, sort },
    context,
  );

  const populatedRecords = await populator(records, context);
  context.records = populatedRecords;
  const total = await targetResource.count(filter, context);
  return {
    meta: {
      total,
      perPage,
      page,
      direction: sort?.direction,
      sortBy: sort?.sortBy,
    },
    records: populatedRecords.map((a) => a.toJSON(context.currentAdmin)),
    record: context.record?.toJSON(context.currentAdmin),
  };
};
