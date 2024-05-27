import { inject as f, defineComponent as v, openBlock as n, createElementBlock as a, createElementVNode as c, withKeys as $, pushScopeId as g, popScopeId as m, ref as _, onMounted as b, watch as k, Fragment as R, renderList as S, toDisplayString as D } from "vue";
function y() {
  const t = f("$router");
  if (!t)
    throw new Error("Router instance is not provided");
  return t;
}
const I = (t) => (g("data-v-e50a478b"), t = t(), m(), t), x = {
  id: "root",
  class: "search-container"
}, A = { class: "search-box" }, C = /* @__PURE__ */ I(() => /* @__PURE__ */ c("label", { for: "" }, null, -1)), E = /* @__PURE__ */ v({
  __name: "CrucibleSearch",
  setup(t) {
    const e = y(), s = (o) => {
      e.push({ path: `/search-in-tag/${o || "1"}` });
    };
    return (o, r) => (n(), a("div", x, [
      c("div", A, [
        c("button", {
          onClick: r[0] || (r[0] = () => o.$router.back())
        }, "back ↵"),
        C,
        c("input", {
          type: "text",
          placeholder: "Enter a valid Tag (try ditto)",
          onKeyup: r[1] || (r[1] = $((i) => s(i.target.value), ["enter"]))
        }, null, 32)
      ])
    ]));
  }
}), w = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [o, r] of e)
    s[o] = r;
  return s;
}, T = /* @__PURE__ */ w(E, [["__scopeId", "data-v-e50a478b"]]), F = async (t) => {
  try {
    const e = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${t.toString()}`
    );
    if (!e.ok)
      throw new Error(`HTTP error! status: ${e.status}`);
    return [(await e.json()).name];
  } catch (e) {
    return console.log(e), [];
  }
}, H = (t) => (g("data-v-357fbfcc"), t = t(), m(), t), j = { class: "search-results-container" }, B = /* @__PURE__ */ H(() => /* @__PURE__ */ c("h2", null, "Search Results", -1)), K = {
  key: 0,
  class: "results"
}, N = {
  key: 1,
  class: "no-results"
}, P = /* @__PURE__ */ v({
  __name: "DisplayResult",
  setup(t) {
    const e = _([]), s = f("$getApi") || "undefined", o = y(), r = _("");
    b(() => {
      console.log("getApiFromHost", s), o ? (r.value = o.currentRoute.value.params.tag, i(r.value)) : r.value = "undefined";
    });
    const i = async (u) => {
      if (u) {
        const l = await F(u);
        e.value = l;
      } else
        e.value = [];
    };
    return k(o.currentRoute, (u, l) => {
      const p = u.params.tag || "", d = l.params.tag || "";
      p !== d && i(p);
    }), (u, l) => (n(), a("div", j, [
      B,
      e.value.length ? (n(), a("div", K, [
        c("ul", null, [
          (n(!0), a(R, null, S(e.value, (p, d) => (n(), a("li", { key: d }, D(p), 1))), 128))
        ])
      ])) : (n(), a("p", N, "No results found"))
    ]));
  }
}), h = /* @__PURE__ */ w(P, [["__scopeId", "data-v-357fbfcc"]]);
function M(t, e) {
  const { router: s, getApi: o } = e;
  t.component("CrucibleSearch", T), t.component("DisplayResult", h), t.provide("$router", s), t.provide("$getApi", o), s.addRoute({ path: "/search-in-tag/:tag", component: h });
}
export {
  T as CrucibleSearch,
  h as DisplayResult,
  M as createSearchPlugin
};
