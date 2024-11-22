import { Box, Button, Icon, Modal } from '@adminjs/design-system';
import { ActionButton, useTranslation } from 'adminjs';
import React, { useState } from 'react';
import { Actions, Labels, Messages } from '../messages.mjs';
import { useRelationConfig } from '../RelationConfigProvider.mjs';
import AddItemModalContent from './AddItemModalContent.mjs';
import { useRedirectUrl } from '../shared/useRedirectUrl.mjs';
export const RelationResourceActions = (a) => {
  const { targetResource: b, ownerResource: c, junctionResource: d } = a,
    {
      ownerRecord: e,
      relations: f,
      relation: g,
      refresh: h,
    } = useRelationConfig(),
    [i, j] = useState(!1),
    { ta: k, tl: l, tm: m } = useTranslation(),
    n = useRedirectUrl(),
    o = f[g].target.resourceId,
    p = f[g].junction?.joinKey,
    q = f[g].junction?.inverseJoinKey,
    r = (a = !1) => {
      a && h(), j(!1);
    };
  if (!p || !q) return null;
  const s = {
      title: l(Labels.ChooseItemHeader, b.id),
      subTitle: m(Messages.ChooseItemSubtitle, b.id),
      onOverlayClick: r,
      onClose: r,
    },
    t = d.resourceActions.find(({ name: a }) => 'new' === a),
    u = b.resourceActions.filter(({ name: a }) => 'new' === a);
  return t
    ? /*#__PURE__*/ React.createElement(
        Box,
        { flex: !0, justifyContent: 'end' },
        t &&
          /*#__PURE__*/ React.createElement(
            React.Fragment,
            null,
            i &&
              /*#__PURE__*/ React.createElement(
                Modal,
                s,
                /*#__PURE__*/ React.createElement(AddItemModalContent, {
                  targetResource: b,
                  ownerResource: c,
                  ownerRecord: e,
                  relation: g,
                  onCloseModal: r,
                }),
              ),
            /*#__PURE__*/ React.createElement(
              Box,
              { flex: !0, mb: 'xl', mr: 'xl', justifyContent: 'end' },
              /*#__PURE__*/ React.createElement(
                Button,
                {
                  variant: 'outline',
                  onClick: () => {
                    j(!0);
                  },
                },
                /*#__PURE__*/ React.createElement(Icon, { icon: 'PlusCircle' }),
                k(Actions.AddItem, b.id),
              ),
            ),
          ),
        u.map((a) =>
          /*#__PURE__*/ React.createElement(
            Box,
            { key: a.name, flex: !0, mb: 'xl', justifyContent: 'end' },
            /*#__PURE__*/ React.createElement(
              ActionButton,
              {
                action: a,
                resourceId: o,
                queryParams: {
                  [p]: e.id,
                  junctionResourceId: f[g].junction?.throughResourceId,
                  joinKey: p,
                  inverseJoinKey: q,
                  redirectUrl: n,
                },
              },
              /*#__PURE__*/ React.createElement(
                Button,
                { variant: 'contained' },
                /*#__PURE__*/ React.createElement(Icon, { icon: a.icon }),
                k(a.name, b.id),
              ),
            ),
          ),
        ),
      )
    : null;
};
