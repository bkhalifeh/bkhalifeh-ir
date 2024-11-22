import {
  ActionContext,
  ActionQueryParameters,
  AppError,
  BaseRecord,
  Filter,
  populator,
} from "adminjs";
import { Messages } from "../../constants/messages.mjs";
import {
  ManyToManyRelationOptions,
  RelationLoaderHandlerConfig,
} from "../../types/index.mjs";
//recordId: string, config: RelationLoaderHandlerConfig<ManyToManyRelationOptions>, query: ActionQueryParameters | undefined, context: ActionContext
export const manyToManyHandler = async (
  recordId: string, //a,
  config: RelationLoaderHandlerConfig<ManyToManyRelationOptions>, //b,
  query: ActionQueryParameters | undefined = {}, //c = {},
  context: ActionContext //d
) => {
  const {
      relation, //: e,
      targetResource, //: f
    } = config,
    {
      sortBy, //: g,
      direction, //: h,
      perPage = context._admin.options.settings?.defaultPerPage || 10, //i
      page = 1, //j
    } = query,
    {
      junction, //: k
    } = relation;
  if (!junction) throw new Error(Messages.JunctionMissing);
  if (!junction.throughResourceId)
    throw new AppError(Messages.JunctionResourceIdMissing);
  const junctionResource = context._admin.findResource(
    junction?.throughResourceId
  ); // l
  if (!junctionResource)
    throw new AppError(
      Messages.JunctionResourceMissing,
      { junctionResourceId: junction.throughResourceId },
      { options: { junctionResourceId: junction.throughResourceId } }
    );
  const filter = new Filter({ [junction.joinKey]: recordId }, junctionResource), // m
    sort = { sortBy: junction.inverseJoinKey, direction: "desc" }; // n
  let sortPrisma = sort; // o
  "prisma" === junctionResource.databaseName() &&
    sortBy &&
    (sortPrisma = {
      sortBy: `${junction.inverseJoinKey}.${sortBy}`,
      direction: direction || "desc",
    });
  const records = await junctionResource.find(
      // p
      filter,
      {
        limit: perPage,
        offset: (page - 1) * perPage,
        sort: sortPrisma as {
          sortBy?: string | undefined;
          direction?: "asc" | "desc" | undefined;
        },
      },
      context
    ),
    total = await junctionResource.count(filter, context), // q
    r = records.map((a) => a.params[junction.inverseJoinKey]),
    s = r.filter((a) => "undefined" != typeof a && null !== a),
    t = await targetResource.findMany(s),
    u = r.map((a) => t.find((b) => b.id() === a)).filter(Boolean),
    populatedRecords = await populator(u as BaseRecord[], context); // v
  return (
    (context.records = populatedRecords),
    {
      meta: {
        total,
        perPage,
        page,
        sortBy: sortPrisma.sortBy,
        direction: direction || "desc",
      },
      records: populatedRecords.map((a) => a.toJSON(context.currentAdmin)),
      record: context.record?.toJSON(context.currentAdmin),
    }
  );
};
