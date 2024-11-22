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
    j = f[g].target.resourceId,
    k = f[g].junction?.joinKey,
    l = f[g].junction?.inverseJoinKey;
  if (!j || !k || !l) return null;
  const m = d.find(({ name: a }) => 'new' === a);
  return /*#__PURE__*/ React.createElement(
    InfoBox,
    { title: i(Messages.NoRelationRecordsTitle, c), illustration: 'Docs' },
    /*#__PURE__*/ React.createElement(
      Text,
      { mb: 'xxl' },
      i(Messages.NoRelationRecords, c, { relationName: b }),
    ),
    m &&
      /*#__PURE__*/ React.createElement(
        ActionButton,
        {
          action: m,
          resourceId: c,
          queryParams: {
            [k]: e.id,
            junctionResourceId: f[g].junction?.throughResourceId,
            joinKey: k,
            inverseJoinKey: l,
            redirectUrl: location.href,
          },
        },
        /*#__PURE__*/ React.createElement(
          Button,
          { variant: 'contained' },
          /*#__PURE__*/ React.createElement(Icon, { icon: 'Plus' }),
          h('createFirstRecord', c),
        ),
      ),
  );
};
