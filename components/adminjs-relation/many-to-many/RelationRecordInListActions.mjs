import { Box, Button, Icon, Modal } from '@adminjs/design-system';
import { ActionButton, ApiClient, useNotice, useTranslation } from 'adminjs';
import React, { useState } from 'react';
import { Actions, Labels } from '../messages.mjs';
import { useRelationConfig } from '../RelationConfigProvider.mjs';
import { useRedirectUrl } from '../shared/useRedirectUrl.mjs';
const api = new ApiClient();
export const RelationRecordInListActions = (a) => {
  const {
      record: { recordActions: b, id: c },
      resource: { id: d },
    } = a,
    [e, f] = useState(!1),
    {
      ownerRecord: g,
      ownerResource: h,
      relation: i,
      relations: j,
      refresh: k,
    } = useRelationConfig(),
    {
      deleteOptions: {
        enableDeleteRelation: l,
        enableDeleteRelatedRecord: m,
      } = { enableDeleteRelatedRecord: !0, enableDeleteRelation: !0 },
    } = j[i],
    n = useNotice(),
    { ta: o, tl: p } = useTranslation(),
    q = useRedirectUrl(),
    r = (a = !1) => {
      a && k(), f(!1);
    },
    s = async () => {
      const a = await api.recordAction({
          resourceId: h.id,
          actionName: 'deleteRelation',
          recordId: g.id,
          params: { targetRecordId: c, relation: i },
        }),
        { data: b } = a;
      return b;
    },
    t = async () => {
      const a = await api.recordAction({
          resourceId: d,
          actionName: 'delete',
          recordId: c,
        }),
        { data: b } = a;
      return b;
    },
    u = [],
    v = {
      variant: 'outlined',
      label: o(Actions.RemoveRelation, d),
      onClick: async () => {
        const a = await s();
        r(!0), z(a);
      },
    },
    w = {
      variant: 'outlined',
      label: o(Actions.RemoveRecord, d),
      color: 'danger',
      onClick: async () => {
        let a = await s();
        const { notice: b } = a;
        r(!0), b && 'success' === b.type && ((a = await t()), z(a));
      },
    },
    x = g.recordActions.find((a) => 'deleteRelation' === a.name);
  l && x && u.push(v);
  const y = b.find((a) => 'delete' === a.name);
  m && y && u.push(w);
  const z = (a) => {
      const { notice: b } = a;
      b && n(b);
    },
    A = {
      title: p(Labels.DeleteRelationHeader),
      onOverlayClick: r,
      onClose: r,
      buttons: u,
    },
    B = { show: 'Eye', edit: 'Edit2', delete: 'Trash2' },
    C = b.filter((a) => 'delete' !== a.name);
  return /*#__PURE__*/ React.createElement(
    Box,
    { flex: !0 },
    C.map((a) =>
      /*#__PURE__*/ React.createElement(
        ActionButton,
        {
          key: a.name,
          action: a,
          resourceId: d,
          recordId: c,
          queryParams: { redirectUrl: q },
        },
        /*#__PURE__*/ React.createElement(
          Button,
          { size: 'icon', rounded: !0, color: a.variant },
          /*#__PURE__*/ React.createElement(Icon, { icon: B[a.name] }),
        ),
      ),
    ),
    u.length &&
      /*#__PURE__*/ React.createElement(
        React.Fragment,
        null,
        e && /*#__PURE__*/ React.createElement(Modal, A),
        /*#__PURE__*/ React.createElement(
          Button,
          { size: 'icon', rounded: !0, color: 'danger', onClick: () => f(!0) },
          /*#__PURE__*/ React.createElement(Icon, { icon: B['delete'] }),
        ),
      ),
  );
};
