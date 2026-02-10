import { c as create_ssr_component, v as validate_component, e as escape, d as each, a as subscribe } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { T as TopProfile } from "../../../../chunks/TopProfile.js";
import { w as writable } from "../../../../chunks/index2.js";
import { l as labelOption } from "../../../../chunks/labelOption.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
import { M as Maps } from "../../../../chunks/Maps.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
const informasiPemerintahan = writable([]);
const judul = "Sarana Pemerintahan";
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rekapContent = [];
  informasiPemerintahan.subscribe((value) => {
    if (value) {
      rekapContent = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai) == 0 || !v.nilai ? "Tidak Ada" : v.nilai + " Keluarga",
        data: v
      }));
    }
  });
  return `${validate_component(Maps, "Maps").$$render($$result, {}, {}, {})} <section class="wrapper bg-light"><div class="container py-6"><div class="row text-center"><div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2"><h3 class="display-4 mb-4 px-xl-10">${escape(judul)}</h3></div></div> <div class="row gx-md-5 gy-5 text-center d-flex justify-content-center">${each(rekapContent, (item) => {
    return `<div class="col-md-6 col-xl-3 d-flex align-items-stretch"><div class="card shadow-lg w-100"><div class="card-body"><span class="icon btn rounded-pill btn-lg btn-outline-primary"><span class="number">${escape(item.nilai)}</span></span> <p class="my-2">${escape(item.label)}</p> </div></div> </div>`;
  })}</div></div></section>`;
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
  return `${$$result.head += `<!-- HEAD_svelte-1socsmh_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><link rel="stylesheet" href="/sandbox/css/preloader.css"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"><!-- HEAD_svelte-1socsmh_END -->`, ""} <div class="content-wrapper">${`${validate_component(PreLoader, "PreLoader").$$render($$result, {}, {}, {})}`} ${validate_component(Header, "Header").$$render($$result, { kode: $infoWilayah.kode_wilayah }, {}, {})} ${validate_component(TopProfile, "TopProfile").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, {}, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
