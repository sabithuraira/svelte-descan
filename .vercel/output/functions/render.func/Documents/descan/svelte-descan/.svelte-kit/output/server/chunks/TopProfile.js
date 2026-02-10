import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape } from "./ssr.js";
import { d as deskripsi, i as infoWilayah } from "./wilayahStores.js";
import { w as writable } from "./index2.js";
const pengurusLast = writable({
  kode_prov: "",
  kode_kab: "",
  kode_kec: "",
  kode_desa: "",
  nama_ketua: "",
  path_foto: "",
  foto: "",
  nama_wakil: "",
  nama_sekretaris: "",
  pengurus_lainnya: "",
  periode_awal_aktif: "",
  periode_akhir_aktif: "",
  status_aktif: 0,
  encId: ""
});
const labelLevel = (kodeWilayah) => {
  switch (kodeWilayah.length) {
    case 10:
      return "Desa/Kelurahan";
    case 7:
      return "Kecamatan";
    case 4:
      if (kodeWilayah.substring(2, 3) == "7")
        return "Kota";
      else
        return "Kabupaten";
    case 2:
      return "Provinsi";
    default:
      return "-";
  }
};
const labelKepalaWilayah = (kodeWilayah) => {
  switch (kodeWilayah.length) {
    case 10:
      return "Kepala Desa/Kelurahan";
    case 7:
      return "Camat";
    case 4:
      if (kodeWilayah.substring(2, 3) == "7")
        return "Walikota";
      else
        return "Bupati";
    case 2:
      return "Gubernur";
    default:
      return "-";
  }
};
const TopProfile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $deskripsi, $$unsubscribe_deskripsi;
  $$unsubscribe_deskripsi = subscribe(deskripsi, (value) => $deskripsi = value);
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
  infoWilayah.subscribe((value) => {
    if (value.kode_wilayah) {
      info_wilayah = value;
    }
  });
  let pengurus = {
    kode_prov: "",
    kode_kab: "",
    kode_kec: "",
    kode_desa: "",
    nama_ketua: "",
    path_foto: "",
    foto: "",
    nama_wakil: "",
    nama_sekretaris: "",
    pengurus_lainnya: "",
    periode_awal_aktif: "",
    periode_akhir_aktif: "",
    status_aktif: 0,
    encId: ""
  };
  pengurusLast.subscribe((value) => {
    pengurus = value;
  });
  $$unsubscribe_deskripsi();
  return `<section class="wrapper image-wrapper bg-image bg-overlay bg-overlay-900 bg-overlay-900 " data-image-src="/images/img/desa/desa_3.jpg"><div class="container pt-2 pt-md-15 pb-2"><div class="row gx-lg-8 gy-8 mt-1 mt-md-12 mt-lg-0 mb-1 align-items-center"><div class="col-lg-3 order-lg-2"><div class="row gx-md-5 gy-5 text-center" data-cues="fadeIn" data-group="images">${pengurus ? `<figure class="rounded mx-4 text-center"><img${add_attribute("src", pengurus.foto, 0)} srcset="${escape(pengurus.foto, true) + " 2x"}" alt="" style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"></figure> <div class="card mx-4"><h4 class="mb-0 text-nowrap">${escape(labelKepalaWilayah(info_wilayah.kode_wilayah))}</h4> <p class="fs-14 mb-0">${escape(pengurus.nama_ketua)}</p></div> ` : `${info_wilayah.kode_kab != "" ? `<figure class="rounded mx-4"><img src="${"/images/kabs-logo/logo" + escape(info_wilayah.kode_prov + info_wilayah.kode_kab, true) + ".png"}" srcset="${"/images/kabs-logo/logo" + escape(info_wilayah.kode_prov + info_wilayah.kode_kab, true) + ".png 2x"}" alt="" style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"></figure>` : ``}`}</div></div> <div class="col-lg-9 text-white"><div data-cues="slideInDown" data-group="page-title"><h1 class="display-1 text-white" style="display: inline-block;" id="desa_text">${escape(labelLevel(info_wilayah.kode_wilayah))} <span class="typer text-white"${add_attribute("data-words", info_wilayah.nama, 0)} data-loop="false"></span> <span class="cursor text-white" data-owner="typer"></span></h1> <div data-cues="slideInDown" data-group="page-title"><p class="lead fs-24 lh-sm text-white mb-1" style="min-height: 280px;">${escape($deskripsi)}</p></div></div></div></div></div></section>`;
});
export {
  TopProfile as T,
  labelKepalaWilayah as a,
  labelLevel as l
};
