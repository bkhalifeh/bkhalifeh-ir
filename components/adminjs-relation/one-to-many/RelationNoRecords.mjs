import { InfoBox, Text, Button, Icon } from '@adminjs/design-system';
import { ActionButton, useTranslation } from 'adminjs';
import React from 'react';
import { Messages } from '../messages.mjs';
import { useRelationConfig } from '../RelationConfigProvider.mjs';
export const RelationNoRecords = (a) => {
  const {
      resource: { name: b, id: c, resourceActions: d },
    } = a,
    { ownerRecord: e, relations: f, relation: g } = useRelationConfig(),
    { tb: h, tm: i } = useTranslation(),
    j = f[g].target.joinKey,
    k = d.find(({ name: a }) => 'new' === a);
  return j
    ? /*#__PURE__*/ React.createElement(
        InfoBox,
        { title: i(Messages.NoRelationRecordsTitle, c), illustration: 'Docs' },
        /*#__PURE__*/ React.createElement(
          Text,
          { mb: 'xxl' },
          i(Messages.NoRelationRecords, c, { relationName: b }),
        ),
        k &&
          /*#__PURE__*/ React.createElement(
            ActionButton,
            {
              action: k,
              resourceId: c,
              queryParams: { [j]: e.id, redirectUrl: location.href },
            },
            /*#__PURE__*/ React.createElement(
              Button,
              { variant: 'contained' },
              /*#__PURE__*/ React.createElement(Icon, { icon: 'Plus' }),
              h('createFirstRecord', c),
            ),
          ),
      )
    : null;
};
