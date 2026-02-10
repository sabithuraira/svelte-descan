import { c as create_ssr_component, v as validate_component, d as each, e as escape, a as subscribe } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { T as TopProfile } from "../../../../chunks/TopProfile.js";
import { w as writable } from "../../../../chunks/index2.js";
import { l as labelOption } from "../../../../chunks/labelOption.js";
import { M as Maps } from "../../../../chunks/Maps.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
const infrastrukturTransportasi = writable({
  saranaTransportasi: {},
  angkutanUmum: {},
  angkutanUmumRutin: {},
  angkutanUmumJam: {}
});
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let infrastruktur_transportasi = {
    saranaTransportasi: {},
    angkutanUmum: {},
    angkutanUmumRutin: {},
    angkutanUmumJam: {}
  };
  let rekapContent = [];
  infrastrukturTransportasi.subscribe((value) => {
    if (value.angkutanUmum.nilai) {
      infrastruktur_transportasi = value;
      rekapContent = [
        {
          total: labelOption(infrastruktur_transportasi.saranaTransportasi.deskripsi_variabel, infrastruktur_transportasi.saranaTransportasi.nilai),
          label: "Lalu Lintas",
          deskripsi: "Lalu lintas antar wilayah menggunakan"
        },
        {
          total: labelOption(infrastruktur_transportasi.angkutanUmum.deskripsi_variabel, infrastruktur_transportasi.angkutanUmum.nilai),
          label: "Angkutan Umum",
          deskripsi: "Keberadaan angkutan umum pada wilayah ini."
        },
        {
          total: infrastruktur_transportasi.angkutanUmum.nilai != 3 ? labelOption(infrastruktur_transportasi.angkutanUmumRutin.deskripsi_variabel, infrastruktur_transportasi.angkutanUmumRutin.nilai) : "-",
          label: "Rutinitas Angkutan Umum",
          deskripsi: "Jika memiliki keberadaan umum, seberapa rutin"
        },
        {
          total: infrastruktur_transportasi.angkutanUmum.nilai != 3 ? labelOption(infrastruktur_transportasi.angkutanUmumJam.deskripsi_variabel, infrastruktur_transportasi.angkutanUmumJam.nilai) : "-",
          label: "Jam Operasional",
          deskripsi: "Jika memiliki keberadaan umum, kapan jam operasional angkutan umum utama"
        }
      ];
    }
  });
  return `${validate_component(Maps, "Maps").$$render($$result, {}, {}, {})} <section class="wrapper bg-light" id="section_faskes"><div class="container pt-1 pt-md-6"><div class="row text-center" data-svelte-h="svelte-j44ksp"><div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2"><h3 class="display-4 mb-0 px-xl-10">Sarana Tranportasi</h3></div></div> <div class="row gx-md-5 gy-5 text-center">${each(rekapContent, (item) => {
    return `<div class="col-md-6 col-xl-3"><div class="card shadow-lg"><div class="card-body"><span class="icon btn rounded-pill btn-lg btn-outline-primary disabled"><span class="number">${escape(item.total)}</span></span> <h3 class="mt-2">${escape(item.label)}</h3> <p class="mb-2">${escape(item.deskripsi)}</p> </div></div> </div>`;
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
  return `${$$result.head += `<!-- HEAD_svelte-wajre0_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><link rel="stylesheet" href="/sandbox/css/preloader.css"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"><!-- HEAD_svelte-wajre0_END -->`, ""} <div class="content-wrapper">${`${validate_component(PreLoader, "PreLoader").$$render($$result, {}, {}, {})}`} ${validate_component(Header, "Header").$$render($$result, { kode: $infoWilayah.kode_wilayah }, {}, {})} ${validate_component(TopProfile, "TopProfile").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, {}, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
