import { ApiClient, useNotice, useQueryParams } from 'adminjs';
import { useEffect, useState } from 'react';
import { useRelationConfig } from './RelationConfigProvider.mjs';
const api = new ApiClient();

export const useRelationRecords = (props) => {
  const {
      record, //: b,
      resource, //: c,
      targetResourceId, //: d,
      tab, //: e
    } = props,
    {
      relation, //: f,
      refreshToken, //: g
    } = useRelationConfig(),
    [h, i] = useState(),
    [j, k] = useState(!0),
    { direction: l, sortBy: m, page: n, parsedQuery: o } = useQueryParams(),
    p = useNotice();
  return (
    useEffect(() => {
      tab === relation &&
        record &&
        (k(!0),
        api
          .recordAction({
            actionName: 'findRelation',
            recordId: record.id,
            resourceId: resource.id,
            params: { relation, direction: l, sortBy: m, page: n },
          })
          .then(({ data: { records: a, meta: b, notice: c } }) => {
            c && p(c), k(!1), i({ records: a, meta: b });
          })
          .finally(() => {
            k(!1);
          }));
    }, [
      tab,
      relation,
      record,
      resource.id,
      targetResourceId,
      l,
      m,
      n,
      o,
      refreshToken,
    ]),
    { data: h, isLoading: j }
  );
};
