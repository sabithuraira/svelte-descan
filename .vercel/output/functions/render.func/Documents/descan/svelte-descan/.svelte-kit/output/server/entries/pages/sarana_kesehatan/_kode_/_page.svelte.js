import { c as create_ssr_component, v as validate_component, d as each, e as escape, a as subscribe } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { T as TopProfile } from "../../../../chunks/TopProfile.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
import { w as writable } from "../../../../chunks/index2.js";
import { M as Maps } from "../../../../chunks/Maps.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
const infrastrukturKesehatan = writable([]);
const dataKesehatan = writable({
  saranaUkbm: [],
  tenagaKesehatan: [],
  klb: []
});
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rekapContent;
  let infrastruktur_kesehatan = [];
  let sum_infrastruktur_kesehatan = 0;
  let sarana_ukbm = [];
  let sum_sarana_ukbm = 0;
  let tenaga_kesehatan = [];
  let sum_tenaga_kesehatan = 0;
  let klb = [];
  let sum_klb = 0;
  infoWilayah.subscribe((value) => {
    if (value.kode_wilayah)
      ;
  });
  infrastrukturKesehatan.subscribe((value) => {
    if (value != null) {
      infrastruktur_kesehatan = value;
      sum_infrastruktur_kesehatan = value.reduce(
        (acc, item) => {
          return acc + Number(item.nilai);
        },
        0
      );
    }
  });
  dataKesehatan.subscribe((value) => {
    if (value.saranaUkbm != null) {
      sarana_ukbm = value.saranaUkbm;
      sum_sarana_ukbm = value.saranaUkbm.reduce(
        (acc, item) => {
          return acc + Number(item.nilai);
        },
        0
      );
      tenaga_kesehatan = value.tenagaKesehatan;
      sum_tenaga_kesehatan = value.tenagaKesehatan.reduce(
        (acc, item) => {
          return acc + Number(item.nilai);
        },
        0
      );
      klb = value.klb;
      sum_klb = value.klb.reduce(
        (acc, item) => {
          return acc + Number(item.nilai);
        },
        0
      );
    }
  });
  rekapContent = [
    {
      total: sum_infrastruktur_kesehatan,
      label: "Sarana Kesehatan",
      deskripsi: "Mencakup sarana seperti Rumah Sakit, Puskesmas, Rumah Bersalin, dan lain sebagainya."
    },
    {
      total: sum_tenaga_kesehatan,
      label: "Tenaga Kesehatan",
      deskripsi: "Jumlah tenaga kesehatan yang tinggal/menetap mencakup dokter, bidan, dokter gigi dan lain sebagainya."
    },
    {
      total: sum_sarana_ukbm,
      label: "Upaya Kesehatan Bersumberdaya Masyarakat (UKBM)",
      deskripsi: "Mencakup sarana seperti Rumah Sakit, Puskesmas, Rumah Bersalin, dan lain sebagainya"
    },
    {
      total: sum_klb,
      label: "Kejadian Luar Biasa",
      deskripsi: "KLB atau wabah penyakit yang terjadi pada desa ini satu tahun terakhir"
    }
  ];
  return `${validate_component(Maps, "Maps").$$render($$result, {}, {}, {})} <section class="wrapper bg-light" id="section_faskes"><div class="container pt-1 pt-md-6"><div class="row text-center" data-svelte-h="svelte-1w8ux4a"><div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2"><h3 class="display-4 mb-0 px-xl-10">Sarana Kesehatan</h3></div></div> <div class="row gx-md-5 gy-5 text-center">${each(rekapContent, (item) => {
    return `<div class="col-md-6 col-xl-3"><div class="card shadow-lg"><div class="card-body"><span class="icon btn btn-circle btn-lg btn-soft-primary disabled"><span class="number">${escape(item.total)}</span></span> <h3 class="mt-2">${escape(item.label)}</h3> <p class="mb-2">${escape(item.deskripsi)}</p> </div></div> </div>`;
  })}</div></div></section> <section class="wrapper bg-light" id="section_faskes"><div class="container py-5"><div class="row"><div class="col-lg-12 "><h2 class="display-4 mb-4" data-svelte-h="svelte-u7nhis"><span class="text-primary m-2"><i class="fa-solid fa-hospital"></i></span>
					Fasilitas Kesehatan</h2> <ul class="icon-list mb-0"><div class="row gy-3 gx-xl-8">${each(infrastruktur_kesehatan, (item, i) => {
    return `<div class="col-12 col-md-6 col-xl-4"><li class="${"icon-list bullet-bg " + escape(
      item.nilai == 0 || item.nilai == null ? "bullet-soft-red" : "bullet-soft-green",
      true
    )}"><i class="${"uil uil-" + escape(
      item.nilai == 0 || item.nilai == null ? "multiply" : "check",
      true
    )}"></i> ${item.nilai != 0 && item.nilai != null ? `${escape(item.nilai)} unit` : ``} ${escape(item.nama_variabel.replace("Jumlah", ""))}</li> </div>`;
  })}</div></ul></div></div></div></section> <section class="wrapper bg-light" id="section_tenaga_kesehatan"><div class="container py-5"><div class="row"><div class="col-lg-12 "><h2 class="display-5 mb-4" data-svelte-h="svelte-pxq0yr"><span class="text-primary m-2"><i class="fa-solid fa-hospital"></i></span>
					Tenaga Kesehatan yang tinggal/menetap di wilayah ini</h2> <ul class="icon-list mb-0"><div class="row gy-3 gx-xl-8">${each(tenaga_kesehatan, (item, i) => {
    return `<div class="col-12 col-md-6 col-xl-4"><li class="${"icon-list bullet-bg " + escape(
      item.nilai == 0 || item.nilai == null ? "bullet-soft-red" : "bullet-soft-green",
      true
    )}"><i class="${"uil uil-" + escape(
      item.nilai == 0 || item.nilai == null ? "multiply" : "check",
      true
    )}"></i> ${item.nilai != 0 && item.nilai != null ? `${escape(item.nilai)} orang` : ``} ${escape(item.nama_variabel.replace("Jumlah", "").replace("yang tinggal menetap", ""))}</li> </div>`;
  })}</div></ul></div></div></div></section> <section class="wrapper bg-light" id="section_ukbm"><div class="container py-5"><div class="row"><div class="col-lg-12 "><h2 class="display-5 mb-4" data-svelte-h="svelte-1m4h5cn"><span class="text-primary m-2"><i class="fa-solid fa-hospital"></i></span>
					Upaya Kesehatan Bersumberdaya Masyarakat (UKBM)</h2> <ul class="icon-list mb-0"><div class="row gy-3 gx-xl-8">${each(sarana_ukbm, (item, i) => {
    return `<div class="col-12 col-md-6 col-xl-4"><li class="${"icon-list bullet-bg " + escape(
      item.nilai == 0 || item.nilai == null ? "bullet-soft-red" : "bullet-soft-green",
      true
    )}"><i class="${"uil uil-" + escape(
      item.nilai == 0 || item.nilai == null ? "multiply" : "check",
      true
    )}"></i> ${item.nilai != 0 && item.nilai != null ? `${escape(item.nilai)} unit` : ``} ${escape(item.nama_variabel.replace("Jumlah", "").replace("yang tinggal menetap", ""))}</li> </div>`;
  })}</div></ul></div></div></div></section> <section class="wrapper bg-light" id="section_klb"><div class="container py-5 mb-4"><div class="row"><div class="col-lg-12 "><h2 class="display-5 mb-4" data-svelte-h="svelte-13hbl1x"><span class="text-primary m-2"><i class="fa-solid fa-hospital"></i></span>
					Kejadian Luar Biasa (KLB) atau Wabah Penyakit</h2> <ul class="icon-list mb-0"><div class="row gy-3 gx-xl-8">${each(klb, (item, i) => {
    return `<div class="col-12 col-md-6 col-xl-4"><li class="${"icon-list bullet-bg " + escape(
      item.nilai == 2 || item.nilai == null ? "bullet-soft-red" : "bullet-soft-green",
      true
    )}"><i class="${"uil uil-" + escape(
      item.nilai == 2 || item.nilai == null ? "multiply" : "check",
      true
    )}"></i> ${escape(item.nama_variabel.replace("Jumlah", "").replace("yang tinggal menetap", ""))}</li> </div>`;
  })}</div></ul></div></div></div></section>`;
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
  return `${$$result.head += `<!-- HEAD_svelte-ckb1bw_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><link rel="stylesheet" href="/sandbox/css/preloader.css"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"><!-- HEAD_svelte-ckb1bw_END -->`, ""} <div class="content-wrapper">${`${validate_component(PreLoader, "PreLoader").$$render($$result, {}, {}, {})}`} ${validate_component(Header, "Header").$$render($$result, { kode: $infoWilayah.kode_wilayah }, {}, {})} ${validate_component(TopProfile, "TopProfile").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, { kode: data.kode }, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
