import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute } from "../../chunks/ssr.js";
import { u as urlApi } from "../../chunks/generalStores.js";
var name = "@vercel/analytics";
var version = "1.6.1";
var initQueue = () => {
  if (window.va)
    return;
  window.va = function a(...params) {
    (window.vaq = window.vaq || []).push(params);
  };
};
function isBrowser() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = process.env.NODE_ENV;
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}
function getMode() {
  const mode = isBrowser() ? window.vam : detectEnvironment();
  return mode || "production";
}
function isDevelopment() {
  return getMode() === "development";
}
function getScriptSrc(props) {
  if (props.scriptSrc) {
    return props.scriptSrc;
  }
  if (isDevelopment()) {
    return "https://va.vercel-scripts.com/v1/script.debug.js";
  }
  if (props.basePath) {
    return `${props.basePath}/insights/script.js`;
  }
  return "/_vercel/insights/script.js";
}
function inject(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser())
    return;
  setMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = getScriptSrc(props);
  if (document.head.querySelector(`script[src*="${src}"]`))
    return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
  script.dataset.sdkv = version;
  if (props.disableAutoTrack) {
    script.dataset.disableAutoTrack = "1";
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  } else if (props.basePath) {
    script.dataset.endpoint = `${props.basePath}/insights`;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  script.onerror = () => {
    const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
    console.log(
      `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
    );
  };
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = "false";
  }
  document.head.appendChild(script);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_urlApi;
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => value);
  inject({ mode: "production" });
  let keyword = "";
  $$unsubscribe_urlApi();
  return `${$$result.head += `<!-- HEAD_svelte-10vi94n_START --><link rel="stylesheet" href="/sandbox/css/landing.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><!-- HEAD_svelte-10vi94n_END -->`, ""} <section class="${"wrapper image-wrapper bg-image " + escape("", true)}" data-image-src="/images/landing/songket.png" style="background-image: url('/images/landing/songket.png');"><div class="m-2" data-svelte-h="svelte-e2s44v"><img class="img-responsive ml-2" src="/images/prov-logo/logo1600.png" alt="" style="max-height:60px; width: auto"> <img class="img-responsive ml-4" src="/images/bps-logo/logo_bps.png" alt="" style="max-height:50px; width: auto"> <img class="img-responsive ml-2" src="/images/dinas-logo/logo_bappeda.png" alt="" style="max-height:80px; width: auto"> <img class="img-responsive ml-2" src="/images/dinas-logo/logo_diskominfo.png" alt="" style="max-height:80px; width: auto"> <img class="img-responsive ml-2" src="/images/dinas-logo/logo_dinas_pmd.png" alt="" style="max-height:80px; width: auto"></div> <div class="container pb-8 pt-md-7 pb-md-6 text-center"><div class="row"><div class="col-lg-8 col-xl-7 col-xxl-6 mx-auto"><h1 class="display-7 text-white fs-60 px-md-15 px-lg-0 mb-4" data-svelte-h="svelte-1tynhgm">Desa Bumi <span class="underline-3 style-2 yellow">Sriwijaya</span></h1> <p class="lead fs-36 text-white lh-sm mx-md-13 mx-lg-10 mb-4" data-svelte-h="svelte-11lk39n">Satu Data Desa Indonesia (SDDI)<br>
					Provinsi Sumatera Selatan</p> <div class="card shadow-none mb-4" style="background-color:#943126;"><div class="card-body"><div class="col-lg-12 text-center"><p class="lead fs-24 text-white fw-bold mb-2" data-svelte-h="svelte-1ccuc3g">Cari Desa di Provinsi Sumatera Selatan</p> <form action="search"><div class="input-group mb-3"><input type="text" class="form-control" placeholder="Nama desa..." aria-label="Search"${add_attribute("value", keyword, 0)}> <div class="input-group-append" data-svelte-h="svelte-r866d8"><button type="submit" class="input-group-text"><i class="uil uil-search"></i> <span>Cari</span></button></div></div></form></div></div></div></div> </div> </div> </section>  <div class="container text-center mt-4 mb-2"><h2 class="fw-bold" style="color:#943126;" data-svelte-h="svelte-bvu243">Program Unggulan</h2> <p class="mb-4" data-svelte-h="svelte-1wookct">Program pembangunan desa yang menjadi fokus utama dalam<br>pengembangan potensi desa di Sumatera Selatan</p> <div class="row align-items-stretch"><div class="col-xl-4"><div class="card shadow-none mb-4" style="border-color:#943126;"><div class="card-body"><div class="text-start" style="font-size: 0.9rem;"><div class="d-flex flex-row align-items-center text-start mb-2"><div class="icon btn btn-circle btn-lg disabled me-2" style="background-color:#943126;" data-svelte-h="svelte-1xiuleb"><i class="uil uil-analytics text-white"></i></div> <h6 style="color:#943126; font-size: 1rem;">Desa Cinta Statistik ${escape((/* @__PURE__ */ new Date()).getFullYear())}</h6></div> <p style="font-size: 0.875rem;" data-svelte-h="svelte-1fz7x2q">Program peningkatan kapasitas desa dalam hal data/statistik, mulai dari perencanaan, pengumpulan, hingga diseminasi data statistik untuk pembangunan desa yang berkelanjutan.</p> <ul class="list-unstyled" style="font-size: 0.875rem;" data-svelte-h="svelte-1ofxyf2"><li>✔️ Pelatihan perangkat desa</li> <li>✔️ Pendampingan pengumpulan data</li> <li>✔️ Visualisasi data desa</li></ul></div> ${`<button type="button" class="btn text-white" style="background-color:#943126; font-size: 0.875rem;" disabled data-svelte-h="svelte-s2s0ix">Memuat...</button>`}</div></div></div> <div class="col-xl-4"><div class="card shadow-none mb-4" style="border-color:#943126;"><div class="card-body"><div class="text-start" style="font-size: 0.9rem;" data-svelte-h="svelte-omhwry"><div class="d-flex flex-row align-items-center text-start mb-2"><div class="icon btn btn-circle btn-lg disabled me-2" style="background-color:#943126;"><i class="uil uil-cloud text-white"></i></div> <h6 style="color:#943126; font-size: 1rem;">Satu Data Desa Indonesia (SDDI)</h6></div> <p style="font-size: 0.875rem;">Integrasi data desa dalam satu platform nasional untuk mendukung perencanaan pembangunan desa yang tepat sasaran dan berbasis bukti.</p> <ul class="list-unstyled mb-10" style="font-size: 0.875rem;"><li>✔️ Integrasi data lintas sektor</li> <li>✔️ Dashboard monitoring desa</li> <li>✔️ Akses data terbuka</li></ul></div> <button type="button" class="btn text-white" style="background-color:#943126; font-size: 0.875rem;" data-svelte-h="svelte-16hcijb">Pelajari Lebih Lanjut</button></div></div></div> <div class="col-xl-4" data-svelte-h="svelte-gt8mlx"><div class="card shadow-none mb-4" style="border-color:#943126;"><div class="card-body"><div class="text-start" style="font-size: 0.9rem;"><div class="d-flex flex-row align-items-center text-start mb-2"><div class="icon btn btn-circle btn-lg disabled me-2" style="background-color:#943126;"><i class="uil uil-chart-line text-white"></i></div> <h6 style="color:#943126; font-size: 1rem;">Indeks Desa Membangun (IDM)</h6></div> <p style="font-size: 0.875rem;">Indikator untuk mengukur pembangunan desa dalam tiga dimensi: sosial, ekonomi, dan lingkungan. IDM menetapkan status desa dari &quot;Sangat Tertinggal&quot; hingga &quot;Mandiri&quot; sebagai dasar perencanaan pembangunan.</p> <ul class="list-unstyled mb-10" style="font-size: 0.875rem;"><li>✔️ Menilai kondisi sosial desa</li> <li>✔️ Mengukur kekuatan ekonomi dan peluang usaha</li> <li>✔️ Mengidentifikasi risiko lingkungan dan kesiapsiagaan bencana</li></ul></div> <a href="/idm" class="btn text-white" style="background-color:#943126; font-size: 0.875rem; text-decoration: none;">Pelajari Lebih Lanjut</a></div></div></div></div></div> ${``} ${``}`;
});
export {
  Page as default
};
