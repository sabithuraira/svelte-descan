import { c as create_ssr_component, e as escape, d as each, a as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { l as labelLevel, T as TopProfile } from "../../../../chunks/TopProfile.js";
import "chart.js/auto";
import "sweetalert2";
import { w as writable } from "../../../../chunks/index2.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
const topografiData = writable({
  luas_wilayah: "0",
  topografi: "0",
  koordinat_wilayah: [],
  ketinggian_wilayah: "0",
  berbatasan_laut: "0",
  kawasan_hutan: "0",
  pemanfaatan_laut: "0",
  fungsi_hutan: "0"
});
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dataTopografi = {
    luas_wilayah: "0",
    topografi: "0",
    koordinat_wilayah: "0",
    ketinggian_wilayah: "0",
    berbatasan_laut: "0",
    kawasan_hutan: "0",
    pemanfaatan_laut: "0",
    fungsi_hutan: "0"
  };
  let info_wilayah = {
    kode_prov: "",
    kode_kab: "",
    kode_kec: "",
    kode_desa: "",
    kode_wilayah: "",
    nama: "",
    nama_prov: "",
    nama_kab: "",
    nama_kec: ""
  };
  topografiData.subscribe((value) => {
    dataTopografi.koordinat_wilayah = value.koordinat_wilayah.sort((a, b) => {
      return b.nilai - a.nilai;
    });
    if (value.luas_wilayah.length > 0)
      dataTopografi.luas_wilayah = value.luas_wilayah[0].nilai;
    if (value.topografi.length > 0)
      dataTopografi.topografi = value.topografi[0].nilai;
    if (value.ketinggian_wilayah.length > 0)
      dataTopografi.ketinggian_wilayah = value.ketinggian_wilayah[0].nilai;
    if (value.berbatasan_laut.length > 0)
      dataTopografi.berbatasan_laut = value.berbatasan_laut[0].nilai;
    if (value.kawasan_hutan.length > 0)
      dataTopografi.kawasan_hutan = value.kawasan_hutan[0].nilai;
    if (value.pemanfaatan_laut.length > 0)
      dataTopografi.pemanfaatan_laut = value.pemanfaatan_laut[0].nilai;
    if (value.fungsi_hutan.length > 0)
      dataTopografi.fungsi_hutan = value.fungsi_hutan[0].nilai;
  });
  infoWilayah.subscribe((value) => {
    if (value.kode_wilayah) {
      info_wilayah = value;
    }
  });
  return `<section class="wrapper bg-light" id="section_penduduk"><div class="container py-5"><div class="row gx-lg-8 gx-xl-12 gy-10 align-items-center"><div class="col-lg-6 order-lg-2"><div class="card me-lg-6"><div class="card-body p-6"><div class="d-flex flex-row"><div><span class="icon btn btn-circle btn-lg btn-soft-primary disabled me-4"><span class="number">${escape(dataTopografi.luas_wilayah)}</span></span></div> <div data-svelte-h="svelte-5hkr71"><h4 class="mb-1">Luas</h4> <p class="mb-0">Luas wilayah dalam km <sup>2</sup></p></div></div></div> </div>  <div class="card ms-lg-13 mt-6"><div class="card-body p-6"><div class="d-flex flex-row"><div><span class="icon btn btn-circle btn-lg btn-soft-primary disabled me-4"><span class="number">${escape(dataTopografi.ketinggian_wilayah)}</span></span></div> <div data-svelte-h="svelte-1h7k23a"><h4 class="mb-1">Altitude</h4> <p class="mb-0">Ketinggian Letak (Altitude) diatas permukaan laut dalam satuan mdpl</p></div></div></div> </div> </div>  <div class="col-lg-6"><h2 class="display-6 mb-3" data-svelte-h="svelte-1lgv0ew">Topografi</h2> <p class="lead fs-lg pe-lg-5">${escape(labelLevel(info_wilayah.kode_wilayah))} ${escape(info_wilayah.nama)}</p> <p>Topografi sebagian besar wilayah ${escape(labelLevel(info_wilayah.kode_wilayah))} ${escape(info_wilayah.nama)} adalah 
					${dataTopografi.topografi == 1 ? `Puncak/Tebing
					` : `${dataTopografi.topografi == 2 ? `Lereng
					` : `${dataTopografi.topografi == 3 ? `Dataran
					` : `${dataTopografi.topografi == 4 ? `Lembah
					` : ``}`}`}`}. Terletak pada 
					${each(dataTopografi.koordinat_wilayah, (item, i) => {
    return `${escape(item.nama_variabel)} adalah ${escape(item.nilai)} ${i == 0 ? `sedangkan  ` : ``}`;
  })}
					.</p> <p class="mb-6">${escape(labelLevel(info_wilayah.kode_wilayah))} ${escape(info_wilayah.nama)} memiliki total luas wilayah sebesar ${escape(dataTopografi.luas_wilayah)} km <sup data-svelte-h="svelte-1nsjm82">2</sup> 
					dengan ketinggian letak (altitude) lokasi kegiatan pemerintahan adalah ${escape(dataTopografi.ketinggian_wilayah)} mdpl.
					${dataTopografi.berbatasan_laut == 1 ? `Wilayah ini berbatasan langsung dengan laut.` : `Wilayah ini tidak berbatasan langsung dengan laut.`}</p></div> </div></div></section>`;
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
