/* eslint-disable prettier/prettier */ import {
  Box,
  Loader,
  Pagination,
  useTabs,
} from '@adminjs/design-system';
import { useQueryParams } from 'adminjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRelationRecords } from '../useRelationRecords.mjs';
import { useRelationConfig } from '../RelationConfigProvider.mjs';
import { RelationType } from '../types/index.mjs';
import { RelationRecordsTable as ManyToManyRelationRecordsTable } from '../many-to-many/RelationRecordsTable.mjs';
import { RelationResourceActions as ManyToManyRelationResourceActions } from '../many-to-many/RelationResourceActions.mjs';
import { RelationRecordsTable as OneToManyRelationRecordsTable } from '../one-to-many/RelationRecordsTable.mjs';
import { RelationResourceActions as OneToManyRelationResourceActions } from '../one-to-many/RelationResourceActions.mjs';
export const RelationTab = () => {
  const {
      relation: a,
      ownerRecord: b,
      ownerResource: c,
      relations: d,
    } = useRelationConfig(),
    e = useSelector((a) => a.resources),
    { storeParams: f } = useQueryParams(),
    { currentTab: g } = useTabs(),
    h = d[a].target.resourceId,
    i = d[a].junction?.throughResourceId,
    j = d[a].type,
    { data: k, isLoading: l } = useRelationRecords({
      record: b,
      relation: a,
      resource: c,
      targetResourceId: h,
      tab: g,
    }),
    m = (a) => f({ page: a.toString() });
  if (g !== a) return null;
  if (!k) return /*#__PURE__*/ React.createElement(Loader, null);
  if (j === RelationType.OneToMany) {
    const a = e.find((a) => a.id === h);
    if (!a) return null;
    const {
      records: b,
      meta: { total: c, page: d, perPage: f },
    } = k;
    return /*#__PURE__*/ React.createElement(
      Box,
      { py: 'xl' },
      /*#__PURE__*/ React.createElement(OneToManyRelationResourceActions, {
        targetResource: a,
      }),
      /*#__PURE__*/ React.createElement(OneToManyRelationRecordsTable, {
        targetResource: a,
        records: b,
        isLoading: l,
      }),
      /*#__PURE__*/ React.createElement(
        Box,
        { flex: !0, justifyContent: 'center', mt: 'xl' },
        /*#__PURE__*/ React.createElement(Pagination, {
          total: c,
          perPage: f,
          page: +d,
          onChange: m,
        }),
      ),
    );
  }
  if (j === RelationType.ManyToMany) {
    if (!i) return null;
    const a = e.find((a) => a.id === h),
      b = e.find((a) => a.id === i);
    if (!a || !b) return null;
    const {
      records: d,
      meta: { total: f, page: g, perPage: j },
    } = k;
    return /*#__PURE__*/ React.createElement(
      Box,
      { py: 'xl' },
      /*#__PURE__*/ React.createElement(ManyToManyRelationResourceActions, {
        targetResource: a,
        ownerResource: c,
        junctionResource: b,
      }),
      /*#__PURE__*/ React.createElement(ManyToManyRelationRecordsTable, {
        targetResource: a,
        records: d,
        isLoading: l,
      }),
      /*#__PURE__*/ React.createElement(
        Box,
        { flex: !0, justifyContent: 'center', mt: 'xl' },
        /*#__PURE__*/ React.createElement(Pagination, {
          total: f,
          perPage: j,
          page: +g,
          onChange: m,
        }),
      ),
    );
  }
  return null;
};
