import { c as create_ssr_component, a as subscribe, v as validate_component, d as each, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { F as Footer, B as BackToTop } from "../../../chunks/BackToTop.js";
import "chart.js/auto";
import { u as urlApi } from "../../../chunks/generalStores.js";
const TopContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="wrapper image-wrapper bg-image" data-image-src="/images/landing/songket.png" data-svelte-h="svelte-18mjdj4"><div class="container pt-2 pt-md-15 pb-2"><div class="row mb-3"><div class="col-12"><a href="/" class="btn btn-sm text-white" style="background-color: rgba(148, 49, 38, 0.8); border: none;"><i class="uil uil-home me-1"></i> Beranda</a></div></div> <div class="row gx-lg-8 gy-8 mt-1 mt-md-12 mt-lg-0 mb-3 align-items-center"><div class="col-lg-4 order-lg-2"><div class="row gx-md-5 gy-5" data-cues="fadeIn" data-group="images"><div class="col-md-9 pb-4 text-center"><figure class="rounded mx-4"><img src="/images/prov-logo/prov_logo.png" srcset="/images/prov-logo/prov_logo.png 2x" alt="" style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"></figure></div></div></div> <div class="col-lg-8 text-white"><div data-cues="slideInDown" data-group="page-title" data-delay="600"><h1 class="text-white mb-4">Indeks Desa Membangun (IDM)<br>
					Provinsi <br> <span class="typer text-sky" data-delay="100" data-words="Sumatera Selatan"></span> <span class="cursor text-sky" data-owner="typer"></span></h1></div></div></div></div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_urlApi;
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => value);
  let desa = {
    data: [],
    links: [],
    from: 0,
    to: 0,
    total: 0,
    current_page: 1,
    last_page: 1
  };
  let chartData = {
    MAJU: 0,
    BERKEMBANG: 0,
    TERTINGGAL: 0,
    MANDIRI: 0
  };
  let kabList = [];
  let kecList = [];
  let idmList = [];
  let keyword = "";
  const getStatusIdmBadgeStyle = (status) => {
    const statusUpper = status?.toUpperCase() || "";
    if (statusUpper === "MAJU") {
      return "background-color: #28a745; color: white;";
    } else if (statusUpper === "BERKEMBANG") {
      return "background-color: #ffc107; color: #000;";
    } else if (statusUpper === "TERTINGGAL") {
      return "background-color: #dc3545; color: white;";
    } else if (statusUpper === "MANDIRI") {
      return "background-color: #007bff; color: white;";
    }
    return "background-color: #6c757d; color: white;";
  };
  (() => {
    if (!desa || !desa.last_page || desa.last_page <= 1)
      return [];
    const items = [];
    const lastPage = desa.last_page;
    items.push({ type: "page", value: 1 });
    {
      for (let i = 2; i <= lastPage; i++) {
        items.push({ type: "page", value: i });
      }
    }
    return items;
  })();
  $$unsubscribe_urlApi();
  return `${$$result.head += `<!-- HEAD_svelte-9baodm_START --><link rel="stylesheet" href="/sandbox/css/plugins.css"><link rel="stylesheet" href="/sandbox/css/style.css"><link rel="stylesheet" href="/sandbox/css/preloader.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="anonymous"><!-- HEAD_svelte-9baodm_END -->`, ""} <div class="content-wrapper">${``} ${validate_component(TopContent, "TopContent").$$render($$result, {}, {}, {})} <section class="wrapper bg-light"><div class="container py-14 py-md-6"> <div class="row text-center mb-3"><div class="col-xl-10 mx-auto"><ul class="nav nav-tabs nav-tabs-bg justify-content-center" role="tablist" style="font-size: 0.875rem;"><li class="nav-item"><a class="nav-link active py-2 px-3" data-bs-toggle="tab" href="#tabel" role="tab" style="font-size: 0.875rem;" data-svelte-h="svelte-12rcbkf">Tabel</a></li> <li class="nav-item" data-svelte-h="svelte-vljmhm"><a class="nav-link py-2 px-3" data-bs-toggle="tab" href="#grafik" role="tab" style="font-size: 0.875rem;">Grafik</a></li> <li class="nav-item"><a class="nav-link py-2 px-3" data-bs-toggle="tab" href="#peta" role="tab" style="font-size: 0.875rem;" data-svelte-h="svelte-1jqzmzf">Peta</a></li></ul></div></div>  <div class="tab-content"><div class="tab-pane fade show active" id="tabel" role="tabpanel"><div class="row"><div class="col-xl-10 mx-auto"> <div class="card shadow-sm mb-3"><div class="card-body p-2"><div class="row g-1" style="font-size: 0.75rem;"><div class="col-md-6 col-lg-4"><label class="form-label mb-0" style="font-size: 0.75rem;" data-svelte-h="svelte-1a318b7">Kabupaten</label> <select class="form-select form-select-sm" style="border-color: #943126; font-size: 0.75rem; padding: 0.25rem 0.5rem;"><option value="" data-svelte-h="svelte-10ex1pc">Semua Kabupaten</option>${each(kabList, (kab) => {
    return `<option${add_attribute("value", kab.kode_wilayah, 0)}>${escape(kab.nama)}</option>`;
  })}</select></div> <div class="col-md-6 col-lg-4"><label class="form-label mb-0" style="font-size: 0.75rem;" data-svelte-h="svelte-1qkuw5z">Kecamatan</label> <select class="form-select form-select-sm" ${"disabled"} style="border-color: #943126; font-size: 0.75rem; padding: 0.25rem 0.5rem;"><option value="" data-svelte-h="svelte-12c1srw">Semua Kecamatan</option>${each(kecList, (kec) => {
    return `<option${add_attribute("value", kec.kode_wilayah, 0)}>${escape(kec.nama)}</option>`;
  })}</select></div> <div class="col-md-6 col-lg-4"><label class="form-label mb-0" style="font-size: 0.75rem;" data-svelte-h="svelte-ig3517">Status Desa</label> <select class="form-select form-select-sm" style="border-color: #943126; font-size: 0.75rem; padding: 0.25rem 0.5rem;">${each(idmList, (idm) => {
    return `<option${add_attribute("value", idm.value, 0)}>${escape(idm.label)}</option>`;
  })}</select></div> <div class="col-md-6 col-lg-4"><label class="form-label mb-0" style="font-size: 0.75rem;" data-svelte-h="svelte-tz5si6">Pencarian Cepat</label> <input type="text" class="form-control form-control-sm" placeholder="Cari desa..." style="border-color: #943126; font-size: 0.75rem; padding: 0.25rem 0.5rem;"${add_attribute("value", keyword, 0)}></div> <div class="col-12 d-flex gap-1 mt-1"><button type="button" class="btn btn-sm text-white py-1 px-2" style="background-color:#943126; font-size: 0.75rem;" data-svelte-h="svelte-5yh4p6">Terapkan</button> <button type="button" class="btn btn-sm btn-secondary py-1 px-2" style="font-size: 0.75rem;" data-svelte-h="svelte-d479bh">Reset</button></div></div></div></div>  <div class="card shadow-sm"><div class="card-body"><div class="d-flex justify-content-between align-items-center mb-2" style="font-size: 0.875rem;"><div><label class="form-label me-2 mb-0" style="font-size: 0.875rem;" data-svelte-h="svelte-1oerxme">Tampilkan:</label> <select class="form-select form-select-sm d-inline-block" style="width: auto; font-size: 0.875rem;"><option${add_attribute("value", 10, 0)} data-svelte-h="svelte-18d3dpq">10</option><option${add_attribute("value", 20, 0)} data-svelte-h="svelte-1k18a0a">20</option><option${add_attribute("value", 25, 0)} data-svelte-h="svelte-1ua5rw2">25</option><option${add_attribute("value", 50, 0)} data-svelte-h="svelte-ujtx1y">50</option><option${add_attribute("value", 100, 0)} data-svelte-h="svelte-ic6cau">100</option></select></div> <div>${`${desa.data && Array.isArray(desa.data) && desa.data.length > 0 ? `<span class="text-muted" style="font-size: 0.875rem;">Menampilkan ${escape(desa.data.length)} data</span>` : `<span class="text-muted" style="font-size: 0.875rem;" data-svelte-h="svelte-d028qn">Tidak ada data</span>`}`}</div></div> <div class="table-responsive"><table class="table table-hover table-sm" style="font-size: 0.875rem;"><thead data-svelte-h="svelte-ywklu7"><tr><th style="font-size: 0.875rem;">No</th> <th style="font-size: 0.875rem;">Kabupaten</th> <th style="font-size: 0.875rem;">Kecamatan</th> <th style="font-size: 0.875rem;">Desa/Kelurahan</th> <th style="font-size: 0.875rem;">Kode Desa</th> <th style="font-size: 0.875rem;">IDM</th> <th style="font-size: 0.875rem;">Status Desa</th></tr></thead> <tbody>${desa.data && Array.isArray(desa.data) && desa.data.length > 0 ? `${each(desa.data, (item, index) => {
    return `<tr><td>${escape(index + 1)}</td> <td>${escape(item.nama_kabupaten || "-")}</td> <td>${escape(item.nama_kecamatan || "-")}</td> <td>${escape(item.nama || item.nama_desa || "-")}</td> <td>${escape(item.kode_wilayah || item.kode_desa || "-")}</td> <td>${escape(item.idm_2024 || "-")}</td> <td>${item.status_idm_2024 ? `<span class="badge" style="${"font-size: 0.75rem; padding: 0.25rem 0.5rem; " + escape(getStatusIdmBadgeStyle(item.status_idm_2024), true)}">${escape(item.status_idm_2024)} </span>` : `-`}</td> </tr>`;
  })}` : `<tr data-svelte-h="svelte-qkzhm0"><td colspan="7" class="text-center">Tidak ada data</td></tr>`}</tbody></table></div>  ${desa && desa.total > 0 && desa.links && desa.links.length > 0 ? `<div class="d-flex flex-column justify-content-center align-items-center gap-2 mt-4"><nav aria-label="pagination idm"><ul class="pagination mb-0" style="gap: 0.25rem;">${each(desa.links, (link) => {
    let isPrevious = link.label && (link.label.toLowerCase().includes("previous") || link.label === "«" || link.label === "&laquo;" || link.label === "&lt;"), isNext = link.label && (link.label.toLowerCase().includes("next") || link.label === "»" || link.label === "&raquo;" || link.label === "&gt;"), isEllipsis = link.label && (link.label === "..." || link.label === "&hellip;"), isPageNumber = !isPrevious && !isNext && !isEllipsis && link.label && link.label.trim() !== "";
    return `    ${isPrevious ? ` <li class="${"page-item " + escape(!link.url || link.active ? "disabled" : "", true)}">${link.url && !link.active ? `<a class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #495057; background: white; min-width: 2rem; text-align: center; cursor: pointer; white-space: nowrap;" href="#" data-svelte-h="svelte-1ukybyh">&lt;
                                  </a>` : `<span class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #6c757d; background: #f8f9fa; min-width: 2rem; text-align: center; cursor: not-allowed; white-space: nowrap;" data-svelte-h="svelte-vg3rxd">&lt;
                                  </span>`} </li>` : `${isNext ? ` <li class="${"page-item " + escape(!link.url || link.active ? "disabled" : "", true)}">${link.url && !link.active ? `<a class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #495057; background: white; min-width: 2rem; text-align: center; cursor: pointer; white-space: nowrap;" href="#" data-svelte-h="svelte-m6te2k">&gt;
                                  </a>` : `<span class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #6c757d; background: #f8f9fa; min-width: 2rem; text-align: center; cursor: not-allowed; white-space: nowrap;" data-svelte-h="svelte-q7gfby">&gt;
                                  </span>`} </li>` : `${isEllipsis ? ` <li class="page-item disabled" data-svelte-h="svelte-qpqtqe"><span class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #6c757d; background: white; min-width: 2rem; text-align: center; white-space: nowrap;">...</span> </li>` : `${isPageNumber ? ` <li class="${"page-item " + escape(link.active ? "active" : "", true) + " " + escape(!link.url ? "disabled" : "", true)}">${link.url && !link.active ? `<a class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #495057; background: white; min-width: 2.5rem; text-align: center; cursor: pointer; white-space: nowrap;" href="#"><!-- HTML_TAG_START -->${link.label}<!-- HTML_TAG_END --> </a>` : `<span class="page-link" style="${"border-radius: 0.375rem; border: 1px solid " + escape(link.active ? "#0d6efd" : "#dee2e6", true) + "; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: " + escape(link.active ? "white" : "#6c757d", true) + "; background: " + escape(link.active ? "#0d6efd" : "#f8f9fa", true) + "; min-width: 2.5rem; text-align: center; cursor: default; white-space: nowrap;"}"><!-- HTML_TAG_START -->${link.label}<!-- HTML_TAG_END --> </span>`} </li>` : ``}`}`}`}`;
  })}</ul></nav> ${``}</div>` : ``}</div></div></div></div></div> <div class="tab-pane fade" id="grafik" role="tabpanel"><div class="row"><div class="col-xl-10 mx-auto"><div class="card shadow-sm"><div class="card-body">${`${Object.values(chartData).reduce((sum, val) => sum + val, 0) > 0 ? `<div class="mb-3" data-svelte-h="svelte-1ft0nf5"><h5 class="card-title text-center mb-4" style="font-size: 1rem;">Distribusi Status IDM 2024</h5> <div class="d-flex justify-content-center"><canvas id="idmChart" style="max-width: 500px; max-height: 500px;"></canvas></div></div>` : `<div class="text-center py-5" data-svelte-h="svelte-1e9v4fs"><p class="text-muted">Tidak ada data untuk ditampilkan</p></div>`}`}</div></div></div></div></div> <div class="tab-pane fade" id="peta" role="tabpanel"><div class="row"><div class="col-xl-10 mx-auto"><div class="card shadow-sm"><div class="card-body p-0 position-relative">${`${`<div id="idmMap" style="height: 500px; min-height: 400px;"></div>`}`}</div></div></div></div></div></div></div></section></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
