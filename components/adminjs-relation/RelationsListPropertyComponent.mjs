import { Badge } from '@adminjs/design-system';
import { useTranslation } from 'adminjs';
import React, { memo } from 'react'; // TODO: [AJS-400] Introduce relations edit
const RelationsListPropertyComponent = (a) => {
  const {
      resource: { properties: c },
      property: b,
    } = a,
    { relationsTargets: d } = c[b.path].props,
    e = Object.values(d),
    { tl: f } = useTranslation();
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    e.map(({ resourceId: a }) =>
      /*#__PURE__*/ React.createElement(Badge, { key: a, mr: 'sm' }, f(a, a)),
    ),
  );
};
export default /*#__PURE__*/ memo(RelationsListPropertyComponent);
