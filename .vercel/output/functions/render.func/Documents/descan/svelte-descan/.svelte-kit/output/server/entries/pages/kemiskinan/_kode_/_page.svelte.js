import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { T as TopProfile } from "../../../../chunks/TopProfile.js";
import "chart.js/auto";
import "sweetalert2";
import { u as urlApi } from "../../../../chunks/generalStores.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_urlApi;
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => value);
  let { kode } = $$props;
  if ($$props.kode === void 0 && $$bindings.kode && kode !== void 0)
    $$bindings.kode(kode);
  $$unsubscribe_urlApi();
  return `${`<section class="wrapper bg-light" data-svelte-h="svelte-1rw3510"><div class="container py-6 py-md-8"><h3>Loading...</h3></div></section>`} <div class="modal fade" id="modalFoto" tabindex="-1" data-svelte-h="svelte-15uh21"><div class="modal-dialog modal-dialog-centered modal-md"><div class="modal-content text-center"><div class="modal-body"><button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> <h3>Foto</h3> <div class="row gx-2 gy-2"><div class="col-12 justify-content-center align-items-center"><img class="img-fluid" src="" alt="Foto Keluarga" id="foto1"></div> <div class="col-12 justify-content-center align-items-center"><img class="img-fluid" src="" alt="Foto Keluarga" id="foto2"></div></div></div></div></div></div>`;
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
  return `${$$result.head += `<!-- HEAD_svelte-wajre0_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><link rel="stylesheet" href="/sandbox/css/preloader.css"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"><!-- HEAD_svelte-wajre0_END -->`, ""} <div class="content-wrapper">${`${validate_component(PreLoader, "PreLoader").$$render($$result, {}, {}, {})}`} ${validate_component(Header, "Header").$$render($$result, { kode: $infoWilayah.kode_wilayah }, {}, {})} ${validate_component(TopProfile, "TopProfile").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, { kode: data.kode }, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
