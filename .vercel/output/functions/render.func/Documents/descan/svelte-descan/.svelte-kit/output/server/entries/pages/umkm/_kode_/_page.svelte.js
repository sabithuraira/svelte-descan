import { c as create_ssr_component, a as subscribe, d as each, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { T as TopProfile } from "../../../../chunks/TopProfile.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
import { w as writable } from "../../../../chunks/index2.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
const umkmData = writable({
  industri: []
});
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_urlApi;
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => value);
  let { kode = "" } = $$props;
  let industri = [];
  umkmData.subscribe((value) => {
    if (value.industri.length > 0) {
      industri = value.industri.sort((a, b) => {
        return b.nilai - a.nilai;
      });
    }
  });
  if ($$props.kode === void 0 && $$bindings.kode && kode !== void 0)
    $$bindings.kode(kode);
  $$unsubscribe_urlApi();
  return `<section class="wrapper bg-soft-primary" id="section_keuangan"><div class="container pt-5 my-3 pb-3"><div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 align-items-center"><div class="col-lg-4 text-center text-lg-start" data-svelte-h="svelte-64h5mi"><h3 class="display-4 mb-3 pe-xxl-15">Industri Mikro dan Kecil</h3> <div class="mt-2"><button class="btn btn-soft-primary" data-bs-toggle="modal" data-bs-target="#modal_industri">Selengkapnya</button></div></div>  <div class="col-lg-8 mt-lg-2"><div class="row align-items-center counter-wrapper gy-6 text-center">${industri.length > 0 ? `${each(Array(6), (_, i) => {
    return `<div class="col-md-4"><h3 class="counter counter-lg">${industri[i].nilai != "" && industri[i].nilai != null ? `${escape(industri[i].nilai)}` : `0`}</h3> <p>${escape(industri[i].nama_variabel.replace("Jumlah industri mikro dan kecil:", ""))}</p> </div>`;
  })}` : ``}</div> </div> </div> </div></section> <div class="modal" id="modal_industri" tabindex="-1"><div class="modal-dialog modal-dialog-centered modal-md"><div class="modal-content text-center"><div class="modal-body"><button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> <div class="col d-flex mb-2" data-svelte-h="svelte-1wfzbsr"><h2 class="me-2">Industri Mikro dan Kecil</h2></div> <table class="table table-bordered table-responsive table-sm table-striped table-hover table-primary text-start" style="border: #00000034;"><thead data-svelte-h="svelte-8rpoaf"><tr><th class="text-center bg-primary text-white">No</th> <th scope="col" class="bg-primary text-center text-white">Industri</th> <th scope="col" class="bg-primary text-center text-white ">Jumlah</th></tr></thead> <tbody style="border: #00000034;">${each(industri, (item, i) => {
    return `<tr><th scope="row" class="text-center">${escape(i + 1)}</th> <td>${escape(item.nama_variabel)}</td> <td class="text-center">${escape(item.nilai)}</td> </tr>`;
  })}</tbody></table></div> </div> </div> </div> ${`<section class="wrapper bg-light" data-svelte-h="svelte-1ggaopz"><div class="container py-6 py-md-8"><h3>Loading... UMKM Pada Wilayah Ini</h3></div></section>`}`;
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
  umkmData.subscribe((value) => {
    if (value.length > 0)
      ;
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_urlApi();
  $$unsubscribe_infoWilayah();
  return `${$$result.head += `<!-- HEAD_svelte-mlr1io_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><style data-svelte-h="svelte-ls46ca">.preloader {
      align-items: center;
      background: linear-gradient(rgba(53, 147, 255, 1), rgba(218, 33, 255, 1));
      display: flex;
      height: 100vh;
      justify-content: center;
      left: 0;
      position: fixed;
      top: 0;
      transition: opacity 0.2s linear;
      width: 100%;
      z-index: 9999;
      opacity: 1;
      transform: opacity 1s linear;
    }</style><!-- HEAD_svelte-mlr1io_END -->`, ""} <div class="content-wrapper">${`${validate_component(PreLoader, "PreLoader").$$render($$result, {}, {}, {})}`} ${validate_component(Header, "Header").$$render($$result, { kode: $infoWilayah.kode_wilayah }, {}, {})} ${validate_component(TopProfile, "TopProfile").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, { kode: data.kode }, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
