import { Box, Button, Icon } from '@adminjs/design-system';
import { ActionButton } from 'adminjs';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useRelationConfig } from '../RelationConfigProvider.mjs';
import { useRedirectUrl } from '../shared/useRedirectUrl.mjs';
export const RelationRecordInListActions = (a) => {
  const {
      record: { recordActions: b, id: c },
      resource: { id: d },
    } = a,
    { refresh: e } = useRelationConfig(),
    f = useNavigate(),
    g = useRedirectUrl(),
    { pathname: h, search: i } = useLocation(),
    j = { show: 'Eye', edit: 'Edit2', delete: 'Trash2' },
    k = ({ notice: a }) => {
      a && 'success' === a.type && (f({ pathname: h, search: i }), e());
    };
  return /*#__PURE__*/ React.createElement(
    Box,
    { flex: !0, justifyContent: 'end' },
    b.map((a) =>
      /*#__PURE__*/ React.createElement(
        ActionButton,
        {
          key: a.name,
          action: a,
          resourceId: d,
          recordId: c,
          actionPerformed: k,
          queryParams: { redirectUrl: g },
        },
        /*#__PURE__*/ React.createElement(
          Button,
          { size: 'icon', rounded: !0, color: a.variant },
          /*#__PURE__*/ React.createElement(Icon, { icon: j[a.name] }),
        ),
      ),
    ),
  );
};
