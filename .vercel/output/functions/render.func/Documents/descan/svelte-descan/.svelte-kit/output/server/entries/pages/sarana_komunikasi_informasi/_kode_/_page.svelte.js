import { c as create_ssr_component, v as validate_component, d as each, e as escape, a as subscribe } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { T as TopProfile } from "../../../../chunks/TopProfile.js";
import { w as writable } from "../../../../chunks/index2.js";
import { l as labelOption } from "../../../../chunks/labelOption.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
import { M as Maps } from "../../../../chunks/Maps.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
const informasiInternet = writable([]);
const menaraBTS = writable([]);
const operatorSeluler = writable([]);
const kantorPos = writable([]);
const keberadaanSiaran = writable([]);
const keluargaTeleponKabel = writable([]);
const sinyalTelepon = writable([]);
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rekapContent = {
    informasiInternet: {},
    menaraBTS: {},
    operatorSeluler: {},
    kantorPos: {},
    keberadaanSiaran: {},
    keluargaTeleponKabel: {},
    sinyalTelepon: {}
  };
  informasiInternet.subscribe((value) => {
    if (value) {
      rekapContent.informasiInternet.judul = "Informasi Internet";
      rekapContent.informasiInternet.data = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
        data: v
      }));
    }
  });
  menaraBTS.subscribe((value) => {
    if (value) {
      rekapContent.menaraBTS.judul = "Menara BTS";
      rekapContent.menaraBTS.data = value.map((v) => ({
        label: v.nama_variabel.replace("Jumlah ", "").charAt(0).toUpperCase() + v.nama_variabel.replace("Jumlah ", "").slice(1),
        nilai: v.nilai == 0 || !v.nilai ? "Tidak Ada" : v.nilai + " Unit",
        data: v
      }));
    }
  });
  operatorSeluler.subscribe((value) => {
    if (value) {
      rekapContent.operatorSeluler.judul = "Operator Seluler";
      rekapContent.operatorSeluler.data = value.map((v) => ({
        label: v.nama_variabel.replace("Jumlah ", "").charAt(0).toUpperCase() + v.nama_variabel.replace("Jumlah ", "").slice(1),
        nilai: v.nilai == 0 || !v.nilai ? "Tidak Ada" : v.nilai + " Operator",
        data: v
      }));
    }
  });
  kantorPos.subscribe((value) => {
    if (value) {
      rekapContent.kantorPos.judul = "Kantor Pos";
      rekapContent.kantorPos.data = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
        data: v
      }));
    }
  });
  keberadaanSiaran.subscribe((value) => {
    if (value) {
      rekapContent.keberadaanSiaran.judul = "Siaran";
      rekapContent.keberadaanSiaran.data = value.map((v) => ({
        label: v.nama_variabel.replace("Program siaran televisi: ", "").charAt(0).toUpperCase() + v.nama_variabel.replace("Program siaran televisi: ", "").slice(1),
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
        data: v
      }));
    }
  });
  keluargaTeleponKabel.subscribe((value) => {
    if (value) {
      rekapContent.keluargaTeleponKabel.judul = "Telepon Kabel";
      rekapContent.keluargaTeleponKabel.data = value.map((v) => ({
        label: v.nama_variabel.replace("Jumlah ", "").charAt(0).toUpperCase() + v.nama_variabel.replace("Jumlah ", "").slice(1),
        nilai: v.nilai == 0 || !v.nilai ? "Tidak Ada" : v.nilai + " Keluarga",
        data: v
      }));
    }
  });
  sinyalTelepon.subscribe((value) => {
    if (value) {
      rekapContent.sinyalTelepon.judul = "Sinyal Telepon";
      rekapContent.sinyalTelepon.data = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
        data: v
      }));
    }
  });
  return `${validate_component(Maps, "Maps").$$render($$result, {}, {}, {})} ${each(Object.entries(rekapContent), ([_, rekap]) => {
    return `<section class="wrapper bg-light"><div class="container py-6"><div class="row text-center"><div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2"><h3 class="display-4 mb-4 px-xl-10">${escape(rekap.judul)}</h3> </div></div> <div class="row gx-md-5 gy-5 text-center d-flex justify-content-center">${each(rekap.data, (data) => {
      return `<div class="col-md-6 col-xl-3 d-flex align-items-stretch"><div class="card shadow-lg w-100"><div class="card-body"><span class="icon btn rounded-pill btn-lg btn-outline-primary"><span class="number">${escape(data.nilai)}</span></span> <p class="my-2">${escape(data.label)}</p> </div></div> </div>`;
    })} </div></div> </section>`;
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
