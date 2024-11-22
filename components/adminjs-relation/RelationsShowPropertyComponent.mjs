import { Tab, Tabs } from '@adminjs/design-system';
import { useQueryParams, useTranslation } from 'adminjs';
import React, { memo, useCallback } from 'react';
import { RelationConfigProvider } from './RelationConfigProvider.mjs';
import { RelationTab } from './shared/RelationTab.mjs';
const RelationsShowPropertyComponent = (a) => {
  const { resource: b, record: c, property: d } = a,
    { id: e, properties: f } = b,
    { relations: g } = f[d.path].props,
    h = Object.keys(g),
    { tab: j = h[0], storeParams: i } = useQueryParams(),
    { tl: k } = useTranslation(),
    l = useCallback((a) => {
      i({ tab: a, sortBy: void 0, direction: void 0, redirectUrl: void 0 });
    }, []);
  return c && h.length
    ? /*#__PURE__*/ React.createElement(
        Tabs,
        { currentTab: j, onChange: l },
        h.map((a) =>
          /*#__PURE__*/ React.createElement(
            Tab,
            { key: a, id: a, label: k(a, e) },
            /*#__PURE__*/ React.createElement(
              RelationConfigProvider,
              { relation: a, relations: g, ownerResource: b, ownerRecord: c },
              /*#__PURE__*/ React.createElement(RelationTab, null),
            ),
          ),
        ),
      )
    : null;
};
export default /*#__PURE__*/ memo(RelationsShowPropertyComponent);
