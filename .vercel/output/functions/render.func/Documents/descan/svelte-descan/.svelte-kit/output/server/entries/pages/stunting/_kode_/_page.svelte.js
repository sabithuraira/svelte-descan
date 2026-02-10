import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { T as TopProfile } from "../../../../chunks/TopProfile.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_urlApi;
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => value);
  let { kode = "" } = $$props;
  if ($$props.kode === void 0 && $$bindings.kode && kode !== void 0)
    $$bindings.kode(kode);
  $$unsubscribe_urlApi();
  return `${`<section class="wrapper bg-light" data-svelte-h="svelte-1rw3510"><div class="container py-6 py-md-8"><h3>Loading...</h3></div></section>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_urlApi;
  let $infoWilayah, $$unsubscribe_infoWilayah;
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => value);
  $$unsubscribe_infoWilayah = subscribe(infoWilayah, (value) => $infoWilayah = value);
  let { data } = $$props;
  infoWilayah.subscribe((value) => {
    if (value.kode_wilayah)
      ;
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_urlApi();
  $$unsubscribe_infoWilayah();
  return `${$$result.head += `<!-- HEAD_svelte-mlr1io_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><style data-svelte-h="svelte-ls46ca">.preloader {
      align-items: center;
      background: linear-gradient(rgba(53, 147, 255, 1), rgba(218, 33, 255, 1));
      display: flex;
      height: 100vh;
      justify-content: center;
      left: 0;
      position: fixed;
      top: 0;
      transition: opacity 0.2s linear;
      width: 100%;
      z-index: 9999;
      opacity: 1;
      transform: opacity 1s linear;
    }</style><!-- HEAD_svelte-mlr1io_END -->`, ""} <div class="content-wrapper">${`${validate_component(PreLoader, "PreLoader").$$render($$result, {}, {}, {})}`} ${validate_component(Header, "Header").$$render($$result, { kode: $infoWilayah.kode_wilayah }, {}, {})} ${validate_component(TopProfile, "TopProfile").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, { kode: data.kode }, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
