import { defineComponent as C, inject as E, computed as l, unref as D, provide as h, ref as g, watch as A, h as j, getCurrentInstance as G, openBlock as K, createElementBlock as U, createVNode as z } from "vue";
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const B = typeof document < "u", I = Object.assign, P = Array.isArray;
function x(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
function T(e, t) {
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
const $ = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), O = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
const R = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : ""), L = /* @__PURE__ */ C({
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
    process.env.NODE_ENV !== "production" && q();
    const i = E(R), p = l(() => e.route || i.value), k = E(O, 0), d = l(() => {
      let o = D(k);
      const { matched: n } = p.value;
      let r;
      for (; (r = n[o]) && !r.components; )
        o++;
      return o;
    }), m = l(() => p.value.matched[d.value]);
    h(O, l(() => d.value + 1)), h($, m), h(R, p);
    const w = g();
    return A(() => [w.value, m.value, e.name], ([o, n, r], [s, c, _]) => {
      n && (n.instances[r] = o, c && c !== n && o && o === s && (n.leaveGuards.size || (n.leaveGuards = c.leaveGuards), n.updateGuards.size || (n.updateGuards = c.updateGuards))), o && n && // if there is no instance but to and from are the same this might be
      // the first visit
      (!c || !T(n, c) || !s) && (n.enterCallbacks[r] || []).forEach((b) => b(o));
    }, { flush: "post" }), () => {
      const o = p.value, n = e.name, r = m.value, s = r && r.components[n];
      if (!s)
        return S(a.default, { Component: s, route: o });
      const c = r.props[n], _ = c ? c === !0 ? o.params : typeof c == "function" ? c(o) : c : null, u = j(s, I({}, _, t, {
        onVnodeUnmounted: (f) => {
          f.component.isUnmounted && (r.instances[n] = null);
        },
        ref: w
      }));
      if (process.env.NODE_ENV !== "production" && B && u.ref) {
        const f = {
          depth: d.value,
          name: r.name,
          path: r.path,
          meta: r.meta
        };
        (P(u.ref) ? u.ref.map((v) => v.i) : [u.ref.i]).forEach((v) => {
          v.__vrv_devtools = f;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        S(a.default, { Component: u, route: o }) || u
      );
    };
  }
});
function S(e, t) {
  if (!e)
    return null;
  const a = e(t);
  return a.length === 1 ? a[0] : a;
}
const M = L;
function q() {
  const e = G(), t = e.parent && e.parent.type.name, a = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof a == "object" && a.name === "RouterView") {
    const i = t === "KeepAlive" ? "keep-alive" : "transition";
    x(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${i}>
    <component :is="Component" />
  </${i}>
</router-view>`);
  }
}
const H = { id: "application" }, J = /* @__PURE__ */ C({
  __name: "CrucibleSearch",
  setup(e) {
    return (t, a) => (K(), U("div", H, [
      z(D(M))
    ]));
  }
});
function X(e) {
  e.component("CrucibleSearch", J);
}
export {
  J as CrucibleSearch,
  X as createSearchPlugin
};
