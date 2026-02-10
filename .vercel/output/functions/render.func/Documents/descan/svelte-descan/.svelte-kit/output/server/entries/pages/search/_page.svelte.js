import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, d as each, e as escape } from "../../../chunks/ssr.js";
import { F as Footer, B as BackToTop } from "../../../chunks/BackToTop.js";
import { k as keywordSearch, u as urlApi } from "../../../chunks/generalStores.js";
const TopContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="wrapper image-wrapper bg-image" data-image-src="/images/landing/songket.png" data-svelte-h="svelte-1rlh899"><div class="container pt-2 pt-md-15 pb-2"><div class="row gx-lg-8 gy-8 mt-1 mt-md-12 mt-lg-0 mb-3 align-items-center"><div class="col-lg-4 order-lg-2"><div class="row gx-md-5 gy-5" data-cues="fadeIn" data-group="images"><div class="col-md-9 pb-4 text-center"><figure class="rounded mx-4"><img src="/images/prov-logo/prov_logo.png" srcset="/images/prov-logo/prov_logo.png 2x" alt="" style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"></figure></div></div></div> <div class="col-lg-8 text-white"><div data-cues="slideInDown" data-group="page-title" data-delay="600"><h1 class="text-white mb-4">Provinsi <br> <span class="typer text-sky" data-delay="100" data-words="Sumatera Selatan"></span> <span class="cursor text-sky" data-owner="typer"></span></h1> <p class="lead fs-18 lh-sm text-white mb-7">Provinsi Sumatera Selatan, yang dikenal sebagai Bumi Sriwijaya, pernah menjadi pusat kejayaan Kerajaan Sriwijaya pada abad ke-7 hingga ke-12 Masehi. Kerajaan maritim terbesar di Nusantara dan Asia Tenggara ini memainkan peran penting dalam jalur pelayaran dan perdagangan internasional, serta menjadi titik temu peradaban dunia.<br>
Warisan sejarah tersebut membentuk Sumatera Selatan sebagai daerah yang kaya budaya, berdaya saing ekonomi, dan strategis dalam pembangunan nasional. Melalui aplikasi ini, data dan informasi seluruh desa di Sumatera Selatan disajikan untuk mendukung perencanaan, pelayanan publik, serta pemberdayaan masyarakat yang berbasis data.</p></div></div></div></div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_keywordSearch;
  let $$unsubscribe_urlApi;
  $$unsubscribe_keywordSearch = subscribe(keywordSearch, (value) => value);
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => value);
  let keyword = "";
  let listWilayah = [];
  keywordSearch.subscribe((value) => {
    keyword = value;
  });
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
  const pathWilayah = (wilayah) => {
    switch (wilayah.kode_wilayah.length) {
      case 10:
        return `${wilayah.nama_prov} - ${wilayah.nama_kab} - ${wilayah.nama_kec}`;
      case 7:
        return `${wilayah.nama_prov} - ${wilayah.nama_kab}`;
      case 4:
        return `${wilayah.nama_prov}`;
      case 2:
        return "";
      default:
        return "-";
    }
  };
  $$unsubscribe_keywordSearch();
  $$unsubscribe_urlApi();
  return `${$$result.head += `<!-- HEAD_svelte-13tnx4d_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><link rel="stylesheet" href="/sandbox/css/preloader.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><!-- HEAD_svelte-13tnx4d_END -->`, ""} <div class="content-wrapper">${``} ${validate_component(TopContent, "TopContent").$$render($$result, {}, {}, {})} <section class="wrapper bg-light"><div class="container py-14 py-md-6"><div class="row text-center" data-svelte-h="svelte-1v0cc0y"><div class="col-xl-10 mx-auto"><h3 class="">Cari Wilayah</h3></div> </div>  <div class="row"><div class="col-xl-10 mx-auto"><div class="row"><div class="form-floating mb-4 px-2"><div class="input-group mb-3"><input type="text" class="form-control" placeholder="Cari wilayah......" aria-label="Search"${add_attribute("value", keyword, 0)}> <div class="input-group-append"><button class="input-group-text" data-svelte-h="svelte-fmer0l"><i class="uil uil-search"></i></button></div></div></div></div> <div class="job-list mb-10">${each(listWilayah, (item) => {
    return `<a href="${"/monograph/" + escape(item.kode_wilayah, true)}" class="card shadow-lg mb-4 lift h-100"><div class="card-body px-5 py-2 d-flex flex-row"><div><span class="badge bg-pale-blue text-blue mb-1">${escape(labelLevel(item.kode_wilayah))}</span> <h4 class="mb-0">${escape(item.nama)}</h4> <p class="mb-0 text-body">${escape(pathWilayah(item))}</p> </div></div> </a>`;
  })} </div></div> </div> </div> </section></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
