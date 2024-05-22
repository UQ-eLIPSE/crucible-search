import { defineComponent as l, openBlock as i, createElementBlock as u, toDisplayString as d, ref as o, createElementVNode as r, withDirectives as h, vModelText as _, createVNode as f } from "vue";
const m = async (t) => {
  try {
    const e = await fetch(
      `https://pokeapi.co/api/v2/type/${t.toString()}`
    );
    if (!e.ok)
      throw new Error(`HTTP error! status: ${e.status}`);
    return await e.json();
  } catch (e) {
    return console.log(e), [];
  }
}, v = { class: "card" }, y = /* @__PURE__ */ l({
  __name: "DisplaySearch",
  props: {
    searchResults: {
      type: Array,
      required: !0
    }
  },
  setup(t) {
    return (e, a) => (i(), u("div", v, " here display the search data " + d(t.searchResults), 1));
  }
}), k = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [s, n] of e)
    a[s] = n;
  return a;
}, S = /* @__PURE__ */ k(y, [["__scopeId", "data-v-df16e190"]]), b = /* @__PURE__ */ r("p", null, "Try it - enter a pokeman type ( number)", -1), C = /* @__PURE__ */ l({
  __name: "CrucibleSearch",
  setup(t) {
    const e = o(""), a = o([]), s = async () => {
      a.value = await m(e.value);
    }, n = () => {
      e.value = "";
    };
    return (w, c) => (i(), u("div", null, [
      r("label", null, [
        b,
        h(r("input", {
          "onUpdate:modelValue": c[0] || (c[0] = (p) => e.value = p),
          type: "text",
          placeholder: "Enter a Tag",
          onInput: s
        }, null, 544), [
          [_, e.value]
        ])
      ]),
      r("button", { onClick: n }, "Clear"),
      f(S, { "search-results": a.value }, null, 8, ["search-results"])
    ]));
  }
}), g = {
  data: {
    questions: [
      {
        _id: { $oid: "6625c7c8c8259deb8c3af39e" },
        statement: "",
        tags: [""],
        optionsList: { optionValue: "", optionCorrect: !1 },
        link: ""
      }
    ]
  }
};
function D(t, e = {}) {
  t.component("CrucibleSearch", C), t.provide("$dataLink", e.dataLink || g);
}
export {
  C as CrucibleSearch,
  D as createSearchPlugin,
  g as defaultData
};
