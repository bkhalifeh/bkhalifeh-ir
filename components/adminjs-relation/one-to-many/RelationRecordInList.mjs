import { Placeholder, TableCell, TableRow } from '@adminjs/design-system';
import { BasePropertyComponent, ViewHelpers } from 'adminjs';
import React from 'react';
import { useNavigate } from 'react-router';
import { RelationRecordInListActions } from './RelationRecordInListActions.mjs';
import { useRedirectUrl } from '../shared/useRedirectUrl.mjs';
const v = new ViewHelpers();
export const RelationRecordInList = (a) => {
  const { resource: b, record: c, isLoading: d } = a,
    e = useNavigate(),
    f = useRedirectUrl(),
    g = c.recordActions.find(({ name: a }) => 'show' === a);
  return /*#__PURE__*/ React.createElement(
    TableRow,
    {
      'data-id': c.id,
      'data-css': [b.id, 'row'].join('-'),
      onClick: () => {
        if (g) {
          const a = v.recordActionUrl({
            actionName: g.name,
            recordId: c.id,
            resourceId: b.id,
            search: `?redirectUrl=${encodeURIComponent(f)}`,
          });
          e(a);
        }
      },
    },
    /*#__PURE__*/ React.createElement(TableCell, { width: 0 }),
    b.listProperties.map((a) =>
      /*#__PURE__*/ React.createElement(
        TableCell,
        {
          style: { cursor: g ? 'pointer' : 'initial', whiteSpace: 'nowrap' },
          key: a.propertyPath,
          'data-property-name': a.propertyPath,
          display: 'table-cell',
          'data-css': [b.id, a.name, 'cell'].join('-'),
        },
        d
          ? /*#__PURE__*/ React.createElement(Placeholder, {
              style: { height: 14 },
            })
          : /*#__PURE__*/ React.createElement(BasePropertyComponent, {
              key: a.propertyPath,
              where: 'list',
              property: a,
              resource: b,
              record: c,
            }),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      TableCell,
      { key: 'options', className: 'options' },
      d
        ? /*#__PURE__*/ React.createElement(Placeholder, {
            style: { height: 14 },
          })
        : /*#__PURE__*/ React.createElement(RelationRecordInListActions, {
            record: c,
            resource: b,
          }),
    ),
  );
};
