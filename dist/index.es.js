import { inject as v, defineComponent as _, openBlock as c, createElementBlock as u, createElementVNode as l, withKeys as f, ref as d, onMounted as m, watch as y, Fragment as w, renderList as R, toDisplayString as S, pushScopeId as b, popScopeId as k } from "vue";
function g() {
  const t = v("$router");
  if (!t)
    throw new Error("Router instance is not provided");
  return t;
}
const $ = { class: "search-container" }, T = /* @__PURE__ */ l("h1", null, "Crucible Resource Search", -1), x = { class: "search-box" }, D = /* @__PURE__ */ l("p", null, "Tags Input", -1), I = /* @__PURE__ */ _({
  __name: "CrucibleSearch",
  setup(t) {
    const e = g(), o = (n) => {
      e.push({ path: `/search-in-tag/${n || "1"}` });
    }, a = (n) => {
      n || e.back();
    };
    return (n, s) => (c(), u("div", $, [
      T,
      l("div", x, [
        D,
        l("input", {
          type: "text",
          placeholder: "Enter a Tag (try ditto)",
          onKeyup: s[0] || (s[0] = f((r) => o(r.target.value), ["enter"])),
          onInput: s[1] || (s[1] = (r) => a(r.target.value))
        }, null, 32)
      ])
    ]));
  }
}), C = async (t) => {
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
}, E = (t) => (b("data-v-cb55be66"), t = t(), k(), t), j = { class: "search-results-container" }, B = /* @__PURE__ */ E(() => /* @__PURE__ */ l("h2", null, "Search Results", -1)), F = {
  key: 0,
  class: "results"
}, H = {
  key: 1,
  class: "no-results"
}, K = /* @__PURE__ */ _({
  __name: "DisplayResult",
  setup(t) {
    const e = d([]), o = g(), a = d("");
    m(() => {
      o ? (a.value = o.currentRoute.value.params.tag, n(a.value)) : a.value = "undefined";
    });
    const n = async (s) => {
      if (console.log("Fetching data for tag:", s), s) {
        const r = await C(s);
        e.value = r, console.log("Search results:", r);
      } else
        console.log("no tag provided"), e.value = [];
    };
    return y(o.currentRoute, (s, r) => {
      const i = s.params.tag || "", p = r.params.tag || "";
      console.log("tag changed", i, p), i !== p && n(i);
    }), (s, r) => (c(), u("div", j, [
      B,
      e.value.length ? (c(), u("div", F, [
        l("ul", null, [
          (c(!0), u(w, null, R(e.value, (i, p) => (c(), u("li", { key: p }, S(i), 1))), 128))
        ])
      ])) : (c(), u("p", H, "No results found"))
    ]));
  }
}), N = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [a, n] of e)
    o[a] = n;
  return o;
}, h = /* @__PURE__ */ N(K, [["__scopeId", "data-v-cb55be66"]]);
function L(t, e) {
  const { router: o } = e;
  t.component("CrucibleSearch", I), t.component("DisplayResult", h), t.provide("$router", o), o.addRoute({ path: "/search-in-tag/:tag", component: h });
}
export {
  I as CrucibleSearch,
  h as DisplayResult,
  L as createSearchPlugin
};
