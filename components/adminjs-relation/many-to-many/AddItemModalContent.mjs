import { Box, Button, MessageBox, SelectAsync } from "@adminjs/design-system";
import { ApiClient, useTranslation } from "adminjs";
import React, { useEffect, useState } from "react";
const api = new ApiClient();
export const AddItemModal = ({
  targetResource: a,
  ownerResource: b,
  ownerRecord: c,
  relation: d,
  onCloseModal: e,
}) => {
  const [f, g] = useState(null),
    [h, i] = useState(),
    [j, k] = useState(),
    [l, m] = useState(0),
    { tb: n, tm: o } = useTranslation();
  useEffect(() => {
    if (f) {
      m((a) => a + 1);
      const b = new ApiClient();
      b.recordAction({ actionName: "show", resourceId: a.id, recordId: f + "" })
        .then(({ data: a }) => {
          i(a.record);
        })
        .finally(() => {
          m((a) => a - 1);
        });
    }
  }, [f, a]);
  const p = h,
    q = f && p ? { value: p.id, label: p.title } : { value: "", label: "" };
  return /*#__PURE__*/ React.createElement(
    Box,
    { flex: !0, flexDirection: "column", width: "100%", mt: "md" },
    j &&
      /*#__PURE__*/ React.createElement(MessageBox, {
        message: o(j.message, j.resourceId, j.options),
        variant: "error" === j.type ? "danger" : j.type ?? "info",
        my: "md",
      }),
    /*#__PURE__*/ React.createElement(SelectAsync, {
      cacheOptions: !0,
      value: q,
      defaultOptions: !0,
      loadOptions: async (b) => {
        const c = await api.searchRecords({ resourceId: a.id, query: b }),
          d = c.map((a) => ({ value: a.id, label: a.title, record: a }));
        return d;
      },
      onChange: (a) => {
        a ? g(a.value) : g(null);
      },
      isClearable: !0,
      isLoading: !!l,
    }),
    /*#__PURE__*/ React.createElement(
      Box,
      { flex: !0, justifyContent: "center", mt: "xxl" },
      /*#__PURE__*/ React.createElement(
        Button,
        { variant: "light", color: "primary", onClick: () => e(!1), mr: "md" },
        n("cancel")
      ),
      /*#__PURE__*/ React.createElement(
        Button,
        {
          variant: "contained",
          color: "primary",
          onClick: async () => {
            k(void 0);
            const a = await api.recordAction({
                recordId: c.id,
                resourceId: b.id,
                actionName: "addManyToManyRelation",
                data: { targetId: f },
                params: { relation: d },
              }),
              { data: g } = a,
              { notice: h } = g ?? {};
            h && ("success" === h.type ? e(!0) : k(h));
          },
          disabled: !f,
        },
        n("submit")
      )
    )
  );
};
export default AddItemModal;
