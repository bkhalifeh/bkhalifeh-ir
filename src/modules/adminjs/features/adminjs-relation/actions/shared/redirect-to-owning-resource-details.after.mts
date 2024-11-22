import { ActionContext, ActionRequest, RecordActionResponse } from 'adminjs';
import isEmpty from 'lodash/isEmpty.js';
export const redirectToOwningResourceDetails = (
  response: RecordActionResponse,
  request: ActionRequest,
  context: ActionContext,
): RecordActionResponse => {
  if (!isEmpty(response.record?.errors)) return response;
  if (request.query?.redirectUrl) {
    const redirectUrl = new URL(request.query.redirectUrl);
    redirectUrl.searchParams.delete('redirectUrl'),
      (response.redirectUrl = redirectUrl.pathname + redirectUrl.search);
  }
  return response;
};
