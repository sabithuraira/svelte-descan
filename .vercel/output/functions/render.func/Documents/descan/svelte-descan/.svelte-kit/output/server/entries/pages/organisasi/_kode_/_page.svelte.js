import { c as create_ssr_component, a as subscribe, e as escape, d as each, b as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { i as infoWilayah, P as PreLoader } from "../../../../chunks/wilayahStores.js";
import { H as Header } from "../../../../chunks/Header.js";
import { F as Footer, B as BackToTop } from "../../../../chunks/BackToTop.js";
import { l as labelLevel, a as labelKepalaWilayah, T as TopProfile } from "../../../../chunks/TopProfile.js";
import { u as urlApi } from "../../../../chunks/generalStores.js";
import axios from "axios";
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $infoWilayah, $$unsubscribe_infoWilayah;
  let $urlApi, $$unsubscribe_urlApi;
  $$unsubscribe_infoWilayah = subscribe(infoWilayah, (value) => $infoWilayah = value);
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => $urlApi = value);
  let info_wilayah = { kode_wilayah: "" };
  infoWilayah.subscribe((value) => {
    if (value.kode_wilayah != void 0) {
      info_wilayah = value;
      loadPengurus();
    }
  });
  let listPengurus = [];
  async function loadPengurus() {
    await axios.get(`${$urlApi}pengurus/${$infoWilayah.kode_wilayah}/list`).then(({ data }) => {
      listPengurus = data.datas.data;
    }).catch(({ response }) => {
      console.error(response);
    });
  }
  $$unsubscribe_infoWilayah();
  $$unsubscribe_urlApi();
  return `<section class="wrapper bg-light"><div class="container px-2 py-6 py-md-6"><div class="row mb-3"><div class="col-md-10 col-xl-9 col-xxl-7 mx-auto text-center"><h2 class="display-4 mb-3 ">Riwayat Keorganisasian <br>${escape(labelLevel(info_wilayah.kode_wilayah))} ${escape(info_wilayah.nama)}</h2></div> </div> ${each(listPengurus, (item) => {
    return `<div class="row gx-lg-8 gx-xl-12 gy-12 align-items-center px-4 mb-3"><div class="card border border-secondary"><div class="card-body px-0"><div class="row"><div class="col-5 col-lg-2 position-relative"><figure class="rounded text-center"><img${add_attribute("src", item.foto, 0)}${add_attribute("srcset", item.foto, 0)} alt="" style="max-height: 200px; max-width: 200px; height: auto; width: auto; "> </figure></div> <div class="col-7 col-lg-8 "><div class="row mb-3"><div class="col-12 col-lg-4">${escape(labelKepalaWilayah(info_wilayah.kode_wilayah))} :</div> <div class="col-12 col-lg-7"><b>${escape(item.nama_ketua)}</b> </div></div> <div class="row mb-3"><div class="col-12 col-lg-4">Wakil ${escape(labelKepalaWilayah(info_wilayah.kode_wilayah))} :</div> <div class="col-12 col-lg-7"><b>${escape(item.nama_wakil)}</b> </div></div> <div class="row mb-3"><div class="col-12 col-lg-4">Sekretaris ${escape(labelKepalaWilayah(info_wilayah.kode_wilayah))} :</div> <div class="col-12 col-lg-7"><b>${escape(item.nama_sekretaris)}</b> </div></div> <div class="accordion accordion-wrapper" :id="'accordion'+pengurus.id" data-svelte-h="svelte-1nodkbl"><div class="card plain accordion-item"><div class="card-header" :id="'heading'+pengurus.id"><button class="collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse'+pengurus.id" aria-expanded="false" :aria-controls="'collapse'+pengurus.id">Pengurus Lainnya
											</button></div> <div :id="'collapse'+pengurus.id" class="accordion-collapse collapse" :aria-labelledby="'heading'+pengurus.id" :data-bs-parent="'#accordion'+pengurus.id"><div class="card-body"><p v-html="pengurus.pengurus_lainnya"></p></div> </div></div> </div></div> <div class="col-12 col-md-6 col-lg-2 d-flex align-items-center justify-content-center"><div class="text-center "><b>${escape(item.periode_awal_aktif)} <br>
										s.d
										<br> ${escape(item.periode_akhir_aktif)} </b></div> </div></div> </div></div> </div>`;
  })}</div></section>`;
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
  return `${$$result.head += `<!-- HEAD_svelte-1fyt0wc_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><link rel="stylesheet" href="/sandbox/css/preloader.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer"><!-- HEAD_svelte-1fyt0wc_END -->`, ""} <div class="content-wrapper">${`${validate_component(PreLoader, "PreLoader").$$render($$result, {}, {}, {})}`} ${validate_component(Header, "Header").$$render($$result, { kode: $infoWilayah.kode_wilayah }, {}, {})} ${validate_component(TopProfile, "TopProfile").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, {}, {}, {})}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
