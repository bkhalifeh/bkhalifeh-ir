import { Placeholder, TableCell, TableRow } from "@adminjs/design-system";
import { BasePropertyComponent } from "adminjs";
import React from "react";
import { RelationRecordInListActions } from "./RelationRecordInListActions.mjs";
export const RelationRecordInList = (a) => {
  const { resource: b, record: c, isLoading: d } = a;
  return /*#__PURE__*/ React.createElement(
    TableRow,
    { "data-id": c.id, "data-css": [b.id, "row"].join("-") },
    /*#__PURE__*/ React.createElement(TableCell, { width: 0 }),
    b.listProperties.map((a) =>
      /*#__PURE__*/ React.createElement(
        TableCell,
        {
          style: { cursor: "pointer", whiteSpace: "nowrap" },
          key: a.propertyPath,
          "data-property-name": a.propertyPath,
          display: "table-cell",
          "data-css": [b.id, a.name, "cell"].join("-"),
        },
        d
          ? /*#__PURE__*/ React.createElement(Placeholder, {
              style: { height: 14 },
            })
          : /*#__PURE__*/ React.createElement(BasePropertyComponent, {
              key: a.propertyPath,
              where: "list",
              property: a,
              resource: b,
              record: c,
            })
      )
    ),
    /*#__PURE__*/ React.createElement(
      TableCell,
      { key: "options", className: "options" },
      d
        ? /*#__PURE__*/ React.createElement(Placeholder, {
            style: { height: 14 },
          })
        : /*#__PURE__*/ React.createElement(RelationRecordInListActions, {
            record: c,
            resource: b,
          })
    )
  );
};
