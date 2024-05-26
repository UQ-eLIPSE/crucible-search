import { defineComponent as l, inject as u, onMounted as i, openBlock as p, createElementBlock as h, createElementVNode as n, withKeys as d, ref as _, createTextVNode as g, toDisplayString as v, pushScopeId as y, popScopeId as f } from "vue";
const m = { class: "search-container" }, S = /* @__PURE__ */ n("h1", null, "Crucible Resource Search", -1), R = { class: "search-box" }, b = /* @__PURE__ */ n("p", null, "Try it - enter a Pokémon type (number):", -1), w = /* @__PURE__ */ l({
  __name: "CrucibleSearch",
  setup(t) {
    const e = u("router");
    i(() => {
      console.log("CrucibleSearch mounted"), console.log("router", e);
    });
    const o = (s) => {
      console.log("0", s), e.push({ path: "/result-tag-search", query: { tag: s || "1" } }), console.log("2", s, e);
    };
    return (s, r) => (p(), h("div", m, [
      S,
      n("div", R, [
        b,
        n("input", {
          type: "text",
          placeholder: "Enter a Tag",
          onKeyup: r[0] || (r[0] = d((c) => o(c.target.value), ["enter"]))
        }, null, 32)
      ])
    ]));
  }
}), x = async (t) => {
  try {
    const e = await fetch(
      `https://pokeapi.co/api/v2/type/${t.toString()}`
    );
    if (!e.ok)
      throw new Error(`HTTP error! status: ${e.status}`);
    return [(await e.json()).name];
  } catch (e) {
    return console.log(e), [];
  }
}, C = (t) => (y("data-v-232bde45"), t = t(), f(), t), k = { class: "search-results-container" }, D = /* @__PURE__ */ C(() => /* @__PURE__ */ n("h2", null, "Search Results", -1)), T = /* @__PURE__ */ l({
  __name: "DisplayResult",
  setup(t) {
    const e = u("router"), o = _("");
    i(() => {
      e ? (console.log("current route is ", e.currentRoute.value.query.tag), o.value = e.currentRoute.value.query.tag, s(o.value)) : o.value = "undefined";
    });
    const s = async (r) => {
      if (console.log("Fetching data for tag:", r), r) {
        const c = await x(r);
        console.log("Search results:", c);
      } else
        console.log("no tag provided");
    };
    return (r, c) => (p(), h("div", k, [
      D,
      g(" search Tag " + v(o.value), 1)
    ]));
  }
}), $ = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [s, r] of e)
    o[s] = r;
  return o;
}, a = /* @__PURE__ */ $(T, [["__scopeId", "data-v-232bde45"]]);
function I(t, e) {
  console.log("Creating Search Plugin");
  const { router: o } = e;
  t.component("CrucibleSearch", w), t.component("DisplayResult", a), t.provide("router", o), o.addRoute({ path: "/result-tag-search", component: a }), console.log("Router", o);
}
export {
  w as CrucibleSearch,
  a as DisplayResult,
  I as createSearchPlugin
};
