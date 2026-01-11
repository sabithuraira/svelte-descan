<script>
// @ts-nocheck
  import PreLoader from "../../components/navigation/PreLoader.svelte";
  import Footer from '../../components/navigation/Footer.svelte';
  import TopContent from '../../components/idm/TopContent.svelte';
  import BackToTop from "../../components/navigation/BackToTop.svelte";

  import { onMount } from 'svelte';
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  import { urlApi } from '../../stores/generalStores';

  const defaultKode = "16"; // Default kode wilayah for Sumatera Selatan
  let preloader = false;
  let desa = { data: [], links: [], from: 0, to: 0, total: 0, current_page: 1, last_page: 1 };
  let perPage = 20;
  let currentPage = 1;
  
  // Chart data
  let chartInstance = null;
  let chartData = {
    MAJU: 0,
    BERKEMBANG: 0,
    TERTINGGAL: 0,
    MANDIRI: 0
  };
  let chartLoading = false;
  let activeTab = 'tabel';
  
  // Generate smart pagination with ellipsis (like in the image)
  $: paginationItems = (() => {
    if (!desa || !desa.last_page || desa.last_page <= 1) return [];
    const items = [];
    const current = desa.current_page || currentPage;
    const lastPage = desa.last_page || 1;
    
    // Always show first page
    items.push({ type: 'page', value: 1 });
    
    if (lastPage <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 2; i <= lastPage; i++) {
        items.push({ type: 'page', value: i });
      }
    } else {
      // More than 7 pages - use ellipsis
      if (current <= 4) {
        // Near the start: 1 2 3 4 5 ... last
        for (let i = 2; i <= 5; i++) {
          items.push({ type: 'page', value: i });
        }
        items.push({ type: 'ellipsis' });
        items.push({ type: 'page', value: lastPage });
      } else if (current >= lastPage - 3) {
        // Near the end: 1 ... (last-4) (last-3) (last-2) (last-1) last
        items.push({ type: 'ellipsis' });
        for (let i = lastPage - 4; i <= lastPage; i++) {
          items.push({ type: 'page', value: i });
        }
      } else {
        // In the middle: 1 ... (current-1) current (current+1) ... last
        items.push({ type: 'ellipsis' });
        for (let i = current - 1; i <= current + 1; i++) {
          items.push({ type: 'page', value: i });
        }
        items.push({ type: 'ellipsis' });
        items.push({ type: 'page', value: lastPage });
      }
    }
    
    return items;
  })();

  // Filter states
  let kabList = [];
  let kecList = [];
  let idmList = [];
  let statusList = [];

  let kabSelected = "";
  let kecSelected = "";
  let idmSelected = "";
  let statusSelected = "";
  let keyword = "";

  // Dynamic kodeWilayah based on selections
  $: kodeWilayah = (() => {
    let kode = defaultKode;
    if (kabSelected) {
      // If kabSelected already starts with "16", use it directly; otherwise prepend "16"
      if (kabSelected.startsWith("16")) {
        kode = kabSelected;
      } else {
        kode = defaultKode + kabSelected;
      }
    }
    if (kecSelected) {
      // If kecSelected already starts with the current kode, use it directly; otherwise append
      if (kecSelected.startsWith(kode)) {
        kode = kecSelected;
      } else {
        kode = kode + kecSelected;
      }
    }
    return kode;
  })();

  // Load filter options
  const loadKab = async () => {
    await axios
      .get(`${$urlApi}wilayah/16`)
      .then(({ data }) => {
        kabList = data.datas;
      })
      .catch((error) => {
        console.error("Error loading kabupaten:", error);
      });
  };

  const loadKec = async () => {
    if (kabSelected) {
      // If kabSelected already starts with "16", use it directly; otherwise prepend "16"
      const kabKode = kabSelected.startsWith("16") ? kabSelected : `16${kabSelected}`;
      await axios
        .get(`${$urlApi}wilayah/${kabKode}`)
        .then(({ data }) => {
          kecList = data.datas || [];
          kecSelected = "";
          // Reload data when kab changes
          currentPage = 1;
          getDesa();
        })
        .catch((error) => {
          console.error("Error loading kecamatan:", error);
          kecList = [];
          kecSelected = "";
          currentPage = 1;
          getDesa();
        });
    } else {
      kecList = [];
      kecSelected = "";
      // Reload data when kab is cleared
      currentPage = 1;
      getDesa();
    }
  };

  // Watch for changes in kecSelected to reload data
  let initialLoad = true;
  $: if (kecSelected !== undefined && kabSelected && !initialLoad) {
    // Only reload if we have a kab selected and kec changes
    currentPage = 1;
    getDesa();
  }

  // Load IDM and Status options
  const loadFilterOptions = () => {
    idmList = [
      { value: "", label: "Semua IDM" },
      { value: "MAJU", label: "MAJU" },
      { value: "BERKEMBANG", label: "BERKEMBANG" },
      { value: "TERTINGGAL", label: "TERTINGGAL" },
      { value: "MANDIRI", label: "MANDIRI" },
    ];

    statusList = [
      { value: "", label: "Semua Status" },
      { value: "DESA", label: "DESA" },
      { value: "KELURAHAN", label: "KELURAHAN" },
    ];
  };

  // Load desa data and chart data
  const getDesa = async (suffix = null) => {
    preloader = true;
    let url = "";
    if (suffix) {
      // If suffix is a full URL, use it directly; otherwise prepend API URL
      if (suffix.startsWith('http')) {
        url = suffix;
      } else if (suffix.startsWith($urlApi)) {
        url = suffix;
      } else {
        url = $urlApi + suffix.replace($urlApi, '');
      }
    } else {
      const params = new URLSearchParams();
      if (idmSelected) params.append("status_idm_2024", idmSelected);
      if (statusSelected) params.append("status_desa", statusSelected);
      if (keyword) params.append("keyword", keyword);
      params.append("per_page", perPage.toString());
      params.append("page", currentPage.toString());

      // kodeWilayah is dynamically set based on kab/kec selections
      // Default: "16", With kab: "16{kab}", With kec: "16{kab}{kec}"
      url = `${$urlApi}wilayah/${kodeWilayah}/desa?${params.toString()}`;
    }

    // Call both APIs in parallel
    try {
      const [desaResponse, chartResponse] = await Promise.all([
        axios.get(url),
        axios.get(`${$urlApi}wilayah/${kodeWilayah}/rekap_desa`)
      ]);

      // Process desa data
      if (desaResponse.data && desaResponse.data.data) {
        // The API returns { data: [], meta: { from, to, total, links: [], ... } }
        const responseData = desaResponse.data.data;
        const meta = desaResponse.data.meta || {};
        // Get links from meta.links instead of data.links
        const links = meta.links || desaResponse.data.links || [];
        
        // Extract data array
        const dataArray = Array.isArray(responseData) ? responseData : [];
        
        // Extract pagination metadata
        const currentPageFromMeta = meta.current_page || currentPage;
        desa = {
          data: dataArray,
          links: links,
          from: meta.from || 0,
          to: meta.to || 0,
          total: meta.total || 0,
          current_page: currentPageFromMeta,
          per_page: meta.per_page || perPage,
          last_page: meta.last_page || 1
        };
        
        // Update currentPage to match API response
        currentPage = currentPageFromMeta;
      } else {
        desa = { data: [], links: [], from: 0, to: 0, total: 0 };
      }

      // Process chart data
      if (chartResponse.data && chartResponse.data.datas && Array.isArray(chartResponse.data.datas)) {
        const datas = chartResponse.data.datas;
        
        // Reset chart data
        const newChartData = {
          MAJU: 0,
          BERKEMBANG: 0,
          TERTINGGAL: 0,
          MANDIRI: 0
        };
        
        // Process data from datas array
        datas.forEach(item => {
          const status = item.status_idm_2024?.toUpperCase();
          const total = item.total || 0;
          if (status && newChartData.hasOwnProperty(status)) {
            newChartData[status] = total;
          }
        });
        
        // Update chartData
        chartData = newChartData;
        
        // Update chart immediately if it exists
        if (chartInstance) {
          updateChart();
        } else {
          // Chart doesn't exist yet, will be created when tab is shown
          const grafikTab = document.getElementById('grafik');
          if (grafikTab && grafikTab.classList.contains('show')) {
            createChart();
          }
        }
      }

      preloader = false;
    } catch (error) {
      console.error("Error loading data:", error);
      desa = { data: [], links: [], from: 0, to: 0, total: 0 };
      preloader = false;
    }
  };

  const applyFilters = () => {
    currentPage = 1;
    getDesa();
  };
  
  // Watch for chartData changes to update chart
  $: if (chartData && chartInstance) {
    // Update chart whenever data changes
    updateChart();
  }

  const resetFilters = () => {
    kabSelected = "";
    kecSelected = "";
    idmSelected = "";
    statusSelected = "";
    keyword = "";
    kecList = [];
    currentPage = 1;
    getDesa();
  };

  const getStatusBadgeClass = (status) => {
    const statusUpper = status?.toUpperCase() || "";
    if (statusUpper.includes("SANGAT TERTINGGAL")) return "badge bg-soft-red text-red";
    if (statusUpper.includes("TERTINGGAL")) return "badge bg-soft-orange text-orange";
    if (statusUpper.includes("BERKEMBANG")) return "badge bg-soft-yellow text-yellow";
    if (statusUpper.includes("MAJU")) return "badge bg-soft-teal text-teal";
    if (statusUpper.includes("MANDIRI")) return "badge bg-soft-green text-green";
    return "badge bg-soft-secondary text-secondary";
  };

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

  
  // Create or update pie chart
  const createChart = () => {
    const canvas = document.getElementById('idmChart');
    if (!canvas) {
      return;
    }
    
    // Check if canvas is visible (tab must be active)
    const grafikTab = document.getElementById('grafik');
    if (!grafikTab || !grafikTab.classList.contains('show')) {
      return;
    }
    
    // Destroy existing chart if it exists
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    
    try {
      const dataValues = Object.values(chartData);
      const total = dataValues.reduce((sum, val) => sum + val, 0);
      
      if (total === 0) {
        chartLoading = false;
        return;
      }
      
      chartInstance = new Chart(canvas, {
        type: 'pie',
        data: {
          labels: ['MAJU', 'BERKEMBANG', 'TERTINGGAL', 'MANDIRI'],
          datasets: [{
            data: dataValues,
            backgroundColor: [
              '#28a745', // MAJU - green
              '#ffc107', // BERKEMBANG - yellow
              '#dc3545', // TERTINGGAL - red
              '#007bff'  // MANDIRI - blue
            ],
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
      chartInitialized = true;
    } catch (error) {
      console.error("Error creating chart:", error);
      chartLoading = false;
    }
  };
  
  const updateChart = () => {
    if (chartInstance && chartData) {
      const dataValues = Object.values(chartData);
      const total = dataValues.reduce((sum, val) => sum + val, 0);
      
      if (total > 0) {
        chartInstance.data.datasets[0].data = dataValues;
        chartInstance.update('active'); // Use 'active' mode to show animation
      } else {
        chartInstance.data.datasets[0].data = [0, 0, 0, 0];
        chartInstance.update('active');
      }
    }
  };
  
  // Track if chart has been initialized to prevent multiple calls
  let chartInitialized = false;

  function loadJS(){
    const pluginsJS = document.createElement("script");
    pluginsJS.setAttribute("src", "/sandbox/js/plugins.js");
    document.head.appendChild(pluginsJS);

    const themeJS = document.createElement("script");
    themeJS.setAttribute("src", "/sandbox/js/theme.js");
    document.head.appendChild(themeJS);

    setTimeout(() => {
      theme.initWoHeader();
      TyperSetup();
    }, 100);
  }

  onMount(() => {
    loadKab();
    loadFilterOptions();
    // On first load, call API with kode_wilayah = 16
    getDesa().then(() => {
      initialLoad = false;
      setTimeout(() => loadJS(), 100);
    });
    
    // Listen for tab changes using Bootstrap events
    setTimeout(() => {
      const tabElements = document.querySelectorAll('a[data-bs-toggle="tab"]');
      tabElements.forEach(tab => {
        tab.addEventListener('shown.bs.tab', (e) => {
          const targetId = e.target.getAttribute('href');
          if (targetId === '#grafik') {
            activeTab = 'grafik';
            // Create or update chart when switching to grafik tab
            const canvas = document.getElementById('idmChart');
            if (canvas) {
              if (!chartInstance) {
                createChart();
              } else {
                // Force update with latest chartData
                updateChart();
              }
            }
          } else {
            activeTab = targetId.replace('#', '');
          }
        });
      });
    }, 500);
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/sandbox/css/plugins.css">
  <link rel="stylesheet" href="/sandbox/css/style.css">
  <link rel="stylesheet" href="/sandbox/css/preloader.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</svelte:head>

<div class="content-wrapper">
  {#if preloader}
    <PreLoader />
  {/if}
  <TopContent></TopContent>
  <section class="wrapper bg-light">
    <div class="container py-14 py-md-6">
      <!-- Filters -->
      <div class="row mb-3">
        <div class="col-xl-10 mx-auto">
          <div class="card shadow-sm">
            <div class="card-body p-2">
              <div class="row g-1" style="font-size: 0.75rem;">
                <div class="col-md-6 col-lg-4">
                  <label class="form-label mb-0" style="font-size: 0.75rem;">Kabupaten</label>
                  <select class="form-select form-select-sm" bind:value={kabSelected} on:change={() => { loadKec(); }} style="border-color: #943126; font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                    <option value="">Semua Kabupaten</option>
                    {#each kabList as kab}
                      <option value={kab.kode_wilayah}>{kab.nama}</option>
                    {/each}
                  </select>
                </div>
                <div class="col-md-6 col-lg-4">
                  <label class="form-label mb-0" style="font-size: 0.75rem;">Kecamatan</label>
                  <select class="form-select form-select-sm" bind:value={kecSelected} disabled={!kabSelected} on:change={() => { if (kabSelected) { currentPage = 1; applyFilters(); } }} style="border-color: #943126; font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                    <option value="">Semua Kecamatan</option>
                    {#each kecList as kec}
                      <option value={kec.kode_wilayah}>{kec.nama}</option>
                    {/each}
                  </select>
                </div>
                <div class="col-md-6 col-lg-4">
                  <label class="form-label mb-0" style="font-size: 0.75rem;">Status Desa</label>
                  <select class="form-select form-select-sm" bind:value={idmSelected} style="border-color: #943126; font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                    {#each idmList as idm}
                      <option value={idm.value}>{idm.label}</option>
                    {/each}
                  </select>
                </div>
                <div class="col-md-6 col-lg-4">
                  <label class="form-label mb-0" style="font-size: 0.75rem;">Pencarian Cepat</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Cari desa..."
                    bind:value={keyword}
                    on:keyup={(e) => {
                      if (e.key === "Enter") applyFilters();
                    }}
                    style="border-color: #943126; font-size: 0.75rem; padding: 0.25rem 0.5rem;"
                  />
                </div>
                <div class="col-12 d-flex gap-1 mt-1">
                  <button type="button" class="btn btn-sm text-white py-1 px-2" style="background-color:#943126; font-size: 0.75rem;" on:click={applyFilters}>
                    Terapkan
                  </button>
                  <button type="button" class="btn btn-sm btn-secondary py-1 px-2" style="font-size: 0.75rem;" on:click={resetFilters}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="row text-center mb-3">
        <div class="col-xl-10 mx-auto">
          <ul class="nav nav-tabs nav-tabs-bg justify-content-center" role="tablist" style="font-size: 0.875rem;">
            <li class="nav-item">
              <a class="nav-link active py-2 px-3" data-bs-toggle="tab" href="#tabel" role="tab" style="font-size: 0.875rem;" on:click={() => activeTab = 'tabel'}>Tabel</a>
            </li>
            <li class="nav-item">
              <a class="nav-link py-2 px-3" data-bs-toggle="tab" href="#grafik" role="tab" style="font-size: 0.875rem;">Grafik</a>
            </li>
            <li class="nav-item">
              <a class="nav-link py-2 px-3" data-bs-toggle="tab" href="#peta" role="tab" style="font-size: 0.875rem;" on:click={() => activeTab = 'peta'}>Peta</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <div class="tab-pane fade show active" id="tabel" role="tabpanel">
          <div class="row">
            <div class="col-xl-10 mx-auto">
              <!-- Table -->
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-2" style="font-size: 0.875rem;">
                    <div>
                      <label class="form-label me-2 mb-0" style="font-size: 0.875rem;">Tampilkan:</label>
                      <select class="form-select form-select-sm d-inline-block" style="width: auto; font-size: 0.875rem;" bind:value={perPage} on:change={applyFilters}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    <div>
                      {#if desa.from && desa.to && desa.total}
                        <span class="text-muted" style="font-size: 0.875rem;">Menampilkan {desa.from} - {desa.to} dari {desa.total} data</span>
                      {:else if desa.data && Array.isArray(desa.data) && desa.data.length > 0}
                        <span class="text-muted" style="font-size: 0.875rem;">Menampilkan {desa.data.length} data</span>
                      {:else}
                        <span class="text-muted" style="font-size: 0.875rem;">Tidak ada data</span>
                      {/if}
                    </div>
                  </div>

                  <div class="table-responsive">
                    <table class="table table-hover table-sm" style="font-size: 0.875rem;">
                      <thead>
                        <tr>
                          <th style="font-size: 0.875rem;">No</th>
                          <th style="font-size: 0.875rem;">Kabupaten</th>
                          <th style="font-size: 0.875rem;">Kecamatan</th>
                          <th style="font-size: 0.875rem;">Desa/Kelurahan</th>
                          <th style="font-size: 0.875rem;">Kode Desa</th>
                          <th style="font-size: 0.875rem;">IDM</th>
                          <th style="font-size: 0.875rem;">Status Desa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {#if desa.data && Array.isArray(desa.data) && desa.data.length > 0}
                          {#each desa.data as item, index}
                            <tr>
                              <td>{desa.from ? (desa.from - 1) + index + 1 : index + 1}</td>
                              <td>{item.nama_kabupaten || "-"}</td>
                              <td>{item.nama_kecamatan || "-"}</td>
                              <td>{item.nama || item.nama_desa || "-"}</td>
                              <td>{item.kode_wilayah || item.kode_desa || "-"}</td>
                              <td>{item.idm_2024 || "-"}</td>
                              <td>
                                {#if item.status_idm_2024}
                                  <span class="badge" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; {getStatusIdmBadgeStyle(item.status_idm_2024)}">
                                    {item.status_idm_2024}
                                  </span>
                                {:else}
                                  -
                                {/if}
                              </td>
                            </tr>
                          {/each}
                        {:else}
                          <tr>
                            <td colspan="7" class="text-center">Tidak ada data</td>
                          </tr>
                        {/if}
                      </tbody>
                    </table>
                  </div>

                  <!-- Pagination -->
                  {#if desa && desa.total > 0 && desa.links && desa.links.length > 0}
                    <div class="d-flex flex-column justify-content-center align-items-center gap-2 mt-4">
                      <nav aria-label="pagination idm">
                        <ul class="pagination mb-0" style="gap: 0.25rem;">
                          {#each desa.links as link}
                            {@const isPrevious = link.label && (link.label.toLowerCase().includes("previous") || link.label === "«" || link.label === "&laquo;" || link.label === "&lt;")}
                            {@const isNext = link.label && (link.label.toLowerCase().includes("next") || link.label === "»" || link.label === "&raquo;" || link.label === "&gt;")}
                            {@const isEllipsis = link.label && (link.label === "..." || link.label === "&hellip;")}
                            {@const isPageNumber = !isPrevious && !isNext && !isEllipsis && link.label && link.label.trim() !== ""}
                            
                            {#if isPrevious}
                              <!-- Previous Button -->
                              <li class="page-item {!link.url || link.active ? 'disabled' : ''}">
                                {#if link.url && !link.active}
                                  <a
                                    class="page-link"
                                    style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #495057; background: white; min-width: 2rem; text-align: center; cursor: pointer; white-space: nowrap;"
                                    on:click|preventDefault={() => getDesa(link.url)}
                                    href="#"
                                  >
                                    &lt;
                                  </a>
                                {:else}
                                  <span class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #6c757d; background: #f8f9fa; min-width: 2rem; text-align: center; cursor: not-allowed; white-space: nowrap;">
                                    &lt;
                                  </span>
                                {/if}
                              </li>
                            {:else if isNext}
                              <!-- Next Button -->
                              <li class="page-item {!link.url || link.active ? 'disabled' : ''}">
                                {#if link.url && !link.active}
                                  <a
                                    class="page-link"
                                    style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #495057; background: white; min-width: 2rem; text-align: center; cursor: pointer; white-space: nowrap;"
                                    on:click|preventDefault={() => getDesa(link.url)}
                                    href="#"
                                  >
                                    &gt;
                                  </a>
                                {:else}
                                  <span class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #6c757d; background: #f8f9fa; min-width: 2rem; text-align: center; cursor: not-allowed; white-space: nowrap;">
                                    &gt;
                                  </span>
                                {/if}
                              </li>
                            {:else if isEllipsis}
                              <!-- Ellipsis -->
                              <li class="page-item disabled">
                                <span class="page-link" style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #6c757d; background: white; min-width: 2rem; text-align: center; white-space: nowrap;">
                                  ...
                                </span>
                              </li>
                            {:else if isPageNumber}
                              <!-- Page Number -->
                              <li class="page-item {link.active ? 'active' : ''} {!link.url ? 'disabled' : ''}">
                                {#if link.url && !link.active}
                                  <a
                                    class="page-link"
                                    style="border-radius: 0.375rem; border: 1px solid #dee2e6; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: #495057; background: white; min-width: 2.5rem; text-align: center; cursor: pointer; white-space: nowrap;"
                                    on:click|preventDefault={() => getDesa(link.url)}
                                    href="#"
                                  >
                                    {@html link.label}
                                  </a>
                                {:else}
                                  <span
                                    class="page-link"
                                    style="border-radius: 0.375rem; border: 1px solid {link.active ? '#0d6efd' : '#dee2e6'}; padding: 0.375rem 0.5rem; font-size: 0.75rem; color: {link.active ? 'white' : '#6c757d'}; background: {link.active ? '#0d6efd' : '#f8f9fa'}; min-width: 2.5rem; text-align: center; cursor: default; white-space: nowrap;"
                                  >
                                    {@html link.label}
                                  </span>
                                {/if}
                              </li>
                            {/if}
                          {/each}
                        </ul>
                      </nav>
                      {#if desa.total > 0}
                        <div class="text-center" style="font-size: 0.875rem; color: #6c757d;">
                          Menampilkan {desa.from || 0} - {desa.to || 0} dari {desa.total} data
                        </div>
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-pane fade" id="grafik" role="tabpanel">
          <div class="row">
            <div class="col-xl-10 mx-auto">
              <div class="card shadow-sm">
                <div class="card-body">
                  {#if chartLoading}
                    <div class="text-center py-5">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <p class="text-muted mt-2">Memuat data grafik...</p>
                    </div>
                  {:else if chartInstance || Object.values(chartData).reduce((sum, val) => sum + val, 0) > 0}
                    <div class="mb-3">
                      <h5 class="card-title text-center mb-4" style="font-size: 1rem;">Distribusi Status IDM 2024</h5>
                      <div class="d-flex justify-content-center">
                        <canvas id="idmChart" style="max-width: 500px; max-height: 500px;"></canvas>
                      </div>
                    </div>
                  {:else}
                    <div class="text-center py-5">
                      <p class="text-muted">Tidak ada data untuk ditampilkan</p>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-pane fade" id="peta" role="tabpanel">
          <div class="row">
            <div class="col-xl-10 mx-auto">
              <div class="card shadow-sm">
                <div class="card-body">
                  <p class="text-muted">Peta akan ditampilkan di sini</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<Footer></Footer>
<BackToTop />
