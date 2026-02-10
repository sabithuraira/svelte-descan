import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { i as infoWilayah, d as deskripsi, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#body-layout.svelte-1fx5epo{background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/img/desa/desa_3.jpg') no-repeat center center fixed;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_urlApi;
  let $infoWilayah, $$unsubscribe_infoWilayah;
  let $deskripsi, $$unsubscribe_deskripsi;
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => value);
  $$unsubscribe_infoWilayah = subscribe(infoWilayah, (value) => $infoWilayah = value);
  $$unsubscribe_deskripsi = subscribe(deskripsi, (value) => $deskripsi = value);
  let { data } = $$props;
  const labelLevel = (kodeWilayah) => {
    switch (kodeWilayah.length) {
      case 10:
        return "Desa/Kelurahan";
      case 7:
        return "Kecamatan";
      case 4:
        return "Kabupaten/Kota";
      case 2:
        return "Provinsi";
      default:
        return "-";
    }
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
  infoWilayah.subscribe((value) => {
    if (value.kode_wilayah) {
      info_wilayah = value;
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_urlApi();
  $$unsubscribe_infoWilayah();
  $$unsubscribe_deskripsi();
  return `${$$result.head += `<!-- HEAD_svelte-1fyt0wc_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><link rel="stylesheet" href="/sandbox/css/preloader.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer"><!-- HEAD_svelte-1fyt0wc_END -->`, ""} <div class="content-wrapper svelte-1fx5epo" id="body-layout">${`${validate_component(PreLoader, "PreLoader").$$render($$result, {}, {}, {})}`} ${validate_component(Header, "Header").$$render($$result, { kode: $infoWilayah.kode_wilayah }, {}, {})} <section class="wrapper"><div class="container pt-6 pt-md-15 pt-xl-18 pb-8 pb-xl-21"><div class="row gx-lg-8 gy-8 mt-5 mt-md-12 mt-lg-0 mb-8 align-items-center"><div class="col-lg-6 order-lg-2"><div class="row gx-md-5 gy-5" data-cues="fadeIn" data-group="images"><div class="col-md-6 text-center " data-svelte-h="svelte-nb0wr"><figure class="rounded mx-4"><img src="/images/prov-logo/prov_logo.png" srcset="/images/prov-logo/prov_logo.png 2x" alt="" style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"></figure></div> <div class="col-md-6 text-center ">${info_wilayah.kode_kab != "" ? `<figure class="rounded mx-4"><img src="${"/images/kabs-logo/logo" + escape(info_wilayah.kode_prov + info_wilayah.kode_kab, true) + ".png"}" srcset="${"/images/kabs-logo/logo" + escape(info_wilayah.kode_prov + info_wilayah.kode_kab, true) + ".png 2x"}" alt="" style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"></figure>` : ``}</div></div></div> <div class="col-lg-6 text-white"><div data-cues="slideInDown" data-group="page-title" data-delay="600"><h1 class="display-1 text-white mb-4 h-20 mb-5" style="display: inline-block;" id="desa_text">Selamat Datang di ${escape(labelLevel(info_wilayah.kode_wilayah))} <span class="typer text-white" data-words="${"&lt;br>" + escape(info_wilayah.nama, true)}" data-loop="false"></span> <span class="cursor text-white" data-owner="typer"></span></h1> <div data-cues="slideInDown" data-group="page-title" data-delay="600"><p class="lead fs-24 lh-sm text-white mb-5 " style="min-height: 300px;">${escape($deskripsi)}</p></div> <div><a class="btn btn-lg btn-sky rounded" id="btn_lanjutkan" href="${"/monograph/" + escape($infoWilayah.kode_wilayah, true)}">Selengkapnya</a></div></div></div></div></div></section></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
