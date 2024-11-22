import { Box, Table, TableBody } from '@adminjs/design-system';
import { RecordsTableHeader, useQueryParams } from 'adminjs';
import React from 'react';
import { useRelationConfig } from '../RelationConfigProvider.mjs';
import { RelationNoRecords } from './RelationNoRecords.mjs';
import { RelationRecordInList } from './RelationRecordInList.mjs';
export const RelationRecordsTable = (a) => {
  const { targetResource: b, records: c, isLoading: d } = a,
    { ownerResource: e } = useRelationConfig(),
    { direction: f, sortBy: g } = useQueryParams();
  if (!c.length && !d)
    return /*#__PURE__*/ React.createElement(RelationNoRecords, {
      resource: b,
    });
  const h = {
    ...b,
    listProperties: b.listProperties.filter(({ reference: a }) => a !== e.id),
  };
  return /*#__PURE__*/ React.createElement(
    Box,
    { overflow: 'auto' },
    /*#__PURE__*/ React.createElement(
      Table,
      { 'data-css': 'relations-table' },
      /*#__PURE__*/ React.createElement(RecordsTableHeader, {
        properties: h.listProperties,
        titleProperty: h.titleProperty,
        direction: f,
        sortBy: g,
      }),
      /*#__PURE__*/ React.createElement(
        TableBody,
        { 'data-css': 'relations-table-body' },
        c.map((a) =>
          /*#__PURE__*/ React.createElement(RelationRecordInList, {
            key: a.id,
            record: a,
            resource: h,
            isLoading: d,
          }),
        ),
      ),
    ),
  );
};
