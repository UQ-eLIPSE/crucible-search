(function(s,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(s=typeof globalThis<"u"?globalThis:s||self,t(s.CrucibleSearchPlugin={},s.Vue))})(this,function(s,t){"use strict";/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const R=typeof document<"u",g=Object.assign,k=Array.isArray;function j(e){const n=Array.from(arguments).slice(1);console.warn.apply(console,["[Vue Router warn]: "+e].concat(n))}function A(e,n){return(e.aliasOf||e)===(n.aliasOf||n)}var w;(function(e){e.pop="pop",e.push="push"})(w||(w={}));var y;(function(e){e.back="back",e.forward="forward",e.unknown=""})(y||(y={})),Symbol(process.env.NODE_ENV!=="production"?"navigation failure":"");var _;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(_||(_={}));const G=Symbol(process.env.NODE_ENV!=="production"?"router view location matched":""),E=Symbol(process.env.NODE_ENV!=="production"?"router view depth":"");Symbol(process.env.NODE_ENV!=="production"?"router":""),Symbol(process.env.NODE_ENV!=="production"?"route location":"");const V=Symbol(process.env.NODE_ENV!=="production"?"router view location":""),P=t.defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:i}){process.env.NODE_ENV!=="production"&&T();const d=t.inject(V),l=t.computed(()=>e.route||d.value),$=t.inject(E,0),f=t.computed(()=>{let r=t.unref($);const{matched:o}=l.value;let c;for(;(c=o[r])&&!c.components;)r++;return r}),m=t.computed(()=>l.value.matched[f.value]);t.provide(E,t.computed(()=>f.value+1)),t.provide(G,m),t.provide(V,l);const N=t.ref();return t.watch(()=>[N.value,m.value,e.name],([r,o,c],[u,a,O])=>{o&&(o.instances[c]=r,a&&a!==o&&r&&r===u&&(o.leaveGuards.size||(o.leaveGuards=a.leaveGuards),o.updateGuards.size||(o.updateGuards=a.updateGuards))),r&&o&&(!a||!A(o,a)||!u)&&(o.enterCallbacks[c]||[]).forEach(h=>h(r))},{flush:"post"}),()=>{const r=l.value,o=e.name,c=m.value,u=c&&c.components[o];if(!u)return S(i.default,{Component:u,route:r});const a=c.props[o],O=a?a===!0?r.params:typeof a=="function"?a(r):a:null,h=v=>{v.component.isUnmounted&&(c.instances[o]=null)},p=t.h(u,g({},O,n,{onVnodeUnmounted:h,ref:N}));if(process.env.NODE_ENV!=="production"&&R&&p.ref){const v={depth:f.value,name:c.name,path:c.path,meta:c.meta};(k(p.ref)?p.ref.map(b=>b.i):[p.ref.i]).forEach(b=>{b.__vrv_devtools=v})}return S(i.default,{Component:p,route:r})||p}}});function S(e,n){if(!e)return null;const i=e(n);return i.length===1?i[0]:i}const K=P;function T(){const e=t.getCurrentInstance(),n=e.parent&&e.parent.type.name,i=e.parent&&e.parent.subTree&&e.parent.subTree.type;if(n&&(n==="KeepAlive"||n.includes("Transition"))&&typeof i=="object"&&i.name==="RouterView"){const d=n==="KeepAlive"?"keep-alive":"transition";j(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${d}>
    <component :is="Component" />
  </${d}>
</router-view>`)}}const L={id:"application"},C=t.defineComponent({__name:"CrucibleSearch",setup(e){return(n,i)=>(t.openBlock(),t.createElementBlock("div",L,[t.createVNode(t.unref(K))]))}}),D={data:{questions:[{_id:{$oid:"6625c7c8c8259deb8c3af39e"},statement:"",tags:[""],optionsList:{optionValue:"",optionCorrect:!1},link:""}]}};function U(e,n={}){e.component("CrucibleSearch",C),e.provide("$dataLink",n.dataLink||D)}s.CrucibleSearch=C,s.createSearchPlugin=U,s.defaultData=D,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
