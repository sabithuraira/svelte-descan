import { c as create_ssr_component, v as validate_component, e as escape, d as each, a as subscribe } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { T as TopProfile } from "../../../../chunks/TopProfile.js";
import { w as writable } from "../../../../chunks/index2.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
import { M as Maps } from "../../../../chunks/Maps.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
const infrastrukturOlahraga = writable([]);
const judul = "Sarana Olahraga";
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rekapContent;
  let infrastruktur_olahraga = [];
  let sum_infrastruktur_olahraga = 0;
  infrastrukturOlahraga.subscribe((value) => {
    if (value) {
      infrastruktur_olahraga = value;
      sum_infrastruktur_olahraga = value.reduce(
        (acc, item) => {
          if (Number(item.nilai) % 2 != 0)
            return acc + 1;
          else
            return acc;
        },
        0
      );
    }
  });
  rekapContent = [
    {
      total: sum_infrastruktur_olahraga,
      label: "Infrastruktur Olahraga",
      deskripsi: "Mencakup infrastruktur seperti Lapangan Sepak Bola, Lapangan Bulu Tangkis, dan lain sebagainya.",
      data: infrastruktur_olahraga
    }
  ];
  return `${validate_component(Maps, "Maps").$$render($$result, {}, {}, {})} <section class="wrapper bg-light"><div class="container py-6"><div class="row text-center"><div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2"><h3 class="display-4 mb-4 px-xl-10">${escape(judul)}</h3></div></div> <div class="row gx-md-5 gy-5 text-center d-flex justify-content-center">${each(rekapContent, (item) => {
    return `<div class="col-md-6 col-xl-3 d-flex align-items-stretch"><div class="card shadow-lg w-100"><div class="card-body"><span class="icon btn btn-circle btn-lg btn-soft-primary disabled"><span class="number">${escape(item.total)}</span></span> <h3 class="mt-2">${escape(item.label)}</h3> <p class="mb-2">${escape(item.deskripsi)}</p> </div></div> </div>`;
  })}</div></div></section> ${each(rekapContent, (rekap) => {
    return `<section class="wrapper bg-light"><div class="container pb-6"><div class="row"><div class="col-lg-12"><h2 class="display-4 text-center mb-4">${escape(rekap.label)}</h2> <div class="card"><div class="card-body"><ul class="icon-list mb-0"><div class="row gy-3 gx-xl-8">${each(rekap.data, (data) => {
      return `<div class="col-12 col-md-6 col-xl-4"><li class="${"icon-list bullet-bg " + escape(
        !data.nilai || data.nilai == 0 || Number(data.nilai) % 2 == 0 ? "bullet-soft-red" : "bullet-soft-green",
        true
      )}"><i class="${"uil uil-" + escape(
        !data.nilai || data.nilai == 0 || Number(data.nilai) % 2 == 0 ? "multiply" : "check",
        true
      )}"></i> ${escape(data.nama_variabel.replace("Ketersediaan fasilitas lapangan: ", ""))}</li> </div>`;
    })}</div> </ul></div> </div></div> </div></div> </section>`;
  })}`;
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
