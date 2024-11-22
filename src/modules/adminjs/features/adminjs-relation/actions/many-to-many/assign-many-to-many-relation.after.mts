import {
  ActionContext,
  ActionRequest,
  ActionResponse,
  AppError,
} from "adminjs";
import { Messages } from "../../constants/messages.mjs";
export const assignManyToManyRelation = async (
  response: ActionResponse,
  request: ActionRequest,
  context: ActionContext
): Promise<ActionResponse> => {
  if ("post" !== request.method) return response;
  if (Object.keys(response.record?.errors ?? {}).length) return response;
  const { _admin, record } = context,
    query = request.query ?? {},
    { junctionResourceId, joinKey, inverseJoinKey } = query,
    queryJoinKey = query[joinKey];
  if (!junctionResourceId || !joinKey || !inverseJoinKey || !queryJoinKey)
    return response;
  const findedResource = _admin.findResource(junctionResourceId);
  if (!findedResource)
    throw new AppError(
      Messages.JunctionResourceMissing,
      { junctionResourceId },
      { options: { junctionResourceId } }
    );
  return (
    await findedResource.create({
      [joinKey]: queryJoinKey,
      [inverseJoinKey]: record?.id() ?? response.record.id,
    }),
    response
  );
};
