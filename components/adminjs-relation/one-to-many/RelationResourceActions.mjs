import { Box, Button, Icon } from '@adminjs/design-system';
import { ActionButton, useTranslation } from 'adminjs';
import React from 'react';
import { useRelationConfig } from '../RelationConfigProvider.mjs';
import { useRedirectUrl } from '../shared/useRedirectUrl.mjs';
export const RelationResourceActions = (a) => {
  const { targetResource: b } = a,
    { ownerRecord: c, relations: d, relation: e } = useRelationConfig(),
    { ta: f } = useTranslation(),
    g = useRedirectUrl(),
    h = d[e].target.resourceId,
    i = d[e].target.joinKey;
  if (!i) return null;
  const j = b.resourceActions.filter(({ name: a }) => 'new' === a);
  return j.length
    ? /*#__PURE__*/ React.createElement(
        Box,
        { flex: !0, mb: 'xl', justifyContent: 'end' },
        j.map((a) =>
          /*#__PURE__*/ React.createElement(
            ActionButton,
            {
              key: a.name,
              action: a,
              resourceId: h,
              queryParams: { [i]: c.id, redirectUrl: g },
            },
            /*#__PURE__*/ React.createElement(
              Button,
              { variant: 'contained' },
              /*#__PURE__*/ React.createElement(Icon, { icon: a.icon }),
              f(a.name, b.id),
            ),
          ),
        ),
      )
    : null;
};
