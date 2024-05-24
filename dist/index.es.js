import { defineComponent as R, inject as E, computed as l, unref as S, provide as h, ref as g, watch as A, h as j, getCurrentInstance as G, openBlock as K, createElementBlock as U, createVNode as L } from "vue";
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const $ = typeof document < "u", z = Object.assign, B = Array.isArray;
function I(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
function P(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
var y;
(function(e) {
  e.pop = "pop", e.push = "push";
})(y || (y = {}));
var V;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(V || (V = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var N;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(N || (N = {}));
const x = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), C = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
const D = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : ""), T = /* @__PURE__ */ R({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: a }) {
    process.env.NODE_ENV !== "production" && M();
    const i = E(D), p = l(() => e.route || i.value), k = E(C, 0), d = l(() => {
      let o = S(k);
      const { matched: n } = p.value;
      let r;
      for (; (r = n[o]) && !r.components; )
        o++;
      return o;
    }), m = l(() => p.value.matched[d.value]);
    h(C, l(() => d.value + 1)), h(x, m), h(D, p);
    const w = g();
    return A(() => [w.value, m.value, e.name], ([o, n, r], [s, c, _]) => {
      n && (n.instances[r] = o, c && c !== n && o && o === s && (n.leaveGuards.size || (n.leaveGuards = c.leaveGuards), n.updateGuards.size || (n.updateGuards = c.updateGuards))), o && n && // if there is no instance but to and from are the same this might be
      // the first visit
      (!c || !P(n, c) || !s) && (n.enterCallbacks[r] || []).forEach((b) => b(o));
    }, { flush: "post" }), () => {
      const o = p.value, n = e.name, r = m.value, s = r && r.components[n];
      if (!s)
        return O(a.default, { Component: s, route: o });
      const c = r.props[n], _ = c ? c === !0 ? o.params : typeof c == "function" ? c(o) : c : null, u = j(s, z({}, _, t, {
        onVnodeUnmounted: (f) => {
          f.component.isUnmounted && (r.instances[n] = null);
        },
        ref: w
      }));
      if (process.env.NODE_ENV !== "production" && $ && u.ref) {
        const f = {
          depth: d.value,
          name: r.name,
          path: r.path,
          meta: r.meta
        };
        (B(u.ref) ? u.ref.map((v) => v.i) : [u.ref.i]).forEach((v) => {
          v.__vrv_devtools = f;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        O(a.default, { Component: u, route: o }) || u
      );
    };
  }
});
function O(e, t) {
  if (!e)
    return null;
  const a = e(t);
  return a.length === 1 ? a[0] : a;
}
const q = T;
function M() {
  const e = G(), t = e.parent && e.parent.type.name, a = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof a == "object" && a.name === "RouterView") {
    const i = t === "KeepAlive" ? "keep-alive" : "transition";
    I(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${i}>
    <component :is="Component" />
  </${i}>
</router-view>`);
  }
}
const H = { id: "application" }, J = /* @__PURE__ */ R({
  __name: "CrucibleSearch",
  setup(e) {
    return (t, a) => (K(), U("div", H, [
      L(S(q))
    ]));
  }
}), Q = {
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
function Y(e, t = {}) {
  e.component("CrucibleSearch", J), e.provide("$dataLink", t.dataLink || Q);
}
export {
  J as CrucibleSearch,
  Y as createSearchPlugin,
  Q as defaultData
};
