<script>
// @ts-nocheck
	import WilayahLogo from '../components/landing/WilayahLogo.svelte';
	import DescanLogo from '../components/landing/DescanLogo.svelte';
	import SearchWilayah from '../components/landing/SearchWilayah.svelte';
	import Peta from '../components/landing/Peta.svelte';
	import { urlApi, keywordSearch } from '../stores/generalStores';
 	import axios from 'axios'
	import { onMount } from 'svelte';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	
	inject({ mode: dev ? 'development' : 'production' });
	
	let kabKotas = []; //as Wilayah[];
  let descan = [];
	let keyword = "";
	let randomNumberFoto = 1;
	let arrFoto = [
		'descan_1.jpeg',
		'descan_2.jpeg',
		'descan_3.jpeg',
		'descan_4.jpeg',
		'descan_5.jpeg',
		'descan_6.jpeg',
		'descan_7.JPG',
		'descan_8.JPG',
		'descan_9.JPG',
		'descan_10.JPG',
		'descan_11.JPG',
		'descan_12.JPG',
	];
  let descanLoaded = false;
  let descanShow = false;
  let sddiShow = false;
  let bigScreen = false;

	async function loadWilayah(){
		await axios
			.get(`${$urlApi}wilayah/16`)
			.then(({data})=>{
				kabKotas = data.datas
			}).catch(({ response })=>{
				console.error(response)
			})
	}

	async function loadDescan(){
		await axios
			.get(`${$urlApi}descan/16`)
			.then(({data})=>{
        const d = new Date()
        let year = d.getFullYear()
				descan = data.datas
        descan = descan.filter((dc) => dc.tahun == year)
        descanLoaded = true;
			}).catch(({ response })=>{
				console.error(response)
			})
	}

  function showDescan(){
    descanShow = true;
    sddiShow = false;
    setTimeout(() => {
      window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  function showSddi(){
    sddiShow = true;
    descanShow = false;
    setTimeout(() => {
      window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

	onMount(() => {
		loadWilayah();
    loadDescan();
		randomNumberFoto = getRandomInt(1,12);
    bigScreen = window.innerHeight > 700;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/sandbox/css/landing.css"/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</svelte:head>

<section class="wrapper image-wrapper bg-image {bigScreen ? 'h-100' : ''}"
	data-image-src="/images/landing/songket.png"
	style="background-image: url('/images/landing/songket.png');" >
  <div class="m-2">
    <img
      class="img-responsive ml-2"
      src="/images/prov-logo/logo1600.png"
      alt=""
      style="max-height:60px; width: auto"
    />
    <img
      class="img-responsive ml-2"
      src="/images/bps-logo/logo_bps_sumsel.png"
      alt=""
    />
  </div>
	<div class="container pb-8 pt-md-7 pb-md-6 text-center">
		<div class="row">
			<div class="col-lg-8 col-xl-7 col-xxl-6 mx-auto">
				<h1 class="display-7 text-white fs-60 px-md-15 px-lg-0 mb-4">
					Desa Bumi <span class="underline-3 style-2 yellow">Sriwijaya</span>
				</h1>
				<p class="lead fs-36 text-white lh-sm mx-md-13 mx-lg-10 mb-4">
					Satu Data Desa Indonesia (SDDI)<br />
					Provinsi Sumatera Selatan
				</p>

        <div class="card shadow-none mb-4" style="background-color:#943126;">
          <div class="card-body">
            <div class="col-lg-12 text-center">
              <p class="lead fs-24 text-white fw-bold mb-2">Cari Desa di Provinsi Sumatera Selatan</p>
              <form action="search">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" 
                    bind:value={keyword}
                    on:input={() => keywordSearch.set(keyword) }
                    placeholder="Nama desa..." 
                    aria-label="Search">
                  <div class="input-group-append">
                    <button type="submit" class="input-group-text"><i class="uil uil-search"></i>&nbsp;<span>Cari</span></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
			</div>
			<!-- /column -->
		</div>
	<!-- /.row -->
	</div>

<!-- /.container -->
</section>

<!-- <div class="d-flex flex-wrap justify-content-center alignmx-5 mt-n19 mb-14">
	{#each kabKotas as kabKota}
		<WilayahLogo kodeWilayah="{ kabKota.kode_wilayah }" name="{ kabKota.nama }" />
	{/each}
</div> -->

<div class="container text-center mt-4">
  <h2 class="fw-bold" style="color:#943126;">Program Unggulan</h2>
  <p class="mb-4">Program pembangunan desa yang menjadi fokus utama dalam<br>pengembangan potensi desa di Sumatera Selatan</p>
  <div class="row align-items-stretch">
    <div class="col-xl-6">
      <div class="card shadow-none mb-4" style="border-color:#943126;">
        <div class="card-body">
          <div class="text-start">
            <button class="d-flex flex-row btn text-start disabled" style="opacity:1;">
              <div class="icon btn btn-circle btn-lg disabled me-2" style="background-color:#943126;">
                <i class="uil uil-analytics text-white"></i>
              </div>
              <h5 style="color:#943126;">Desa Cinta Statistik { new Date().getFullYear() }</h5>
            </button>
            <p>Program peningkatan kapasitas desa dalam hal data/statistik, mulai dari perencanaan, pengumpulan, hingga diseminasi data statistik untuk pembangunan desa yang berkelanjutan.</p>
            <ul class="list-unstyled">
              <li>✔️ Pelatihan perangkat desa</li>
              <li>✔️ Pendampingan pengumpulan data</li>
              <li>✔️ Visualisasi data desa</li>
            </ul>
          </div>
          {#if descanLoaded}
            <button type="button" class="btn text-white" style="background-color:#943126;" on:click={showDescan}>Pelajari Lebih Lanjut</button>
          {:else}
            <button type="button" class="btn text-white" style="background-color:#943126;" disabled>Memuat...</button>
          {/if}
        </div>
      </div>
    </div>
    <div class="col-xl-6">
      <div class="card shadow-none mb-4" style="border-color:#943126;">
        <div class="card-body">
          <div class="text-start">
            <button class="d-flex flex-row btn text-start disabled" style="opacity:1;">
              <div class="icon btn btn-circle btn-lg disabled me-2" style="background-color:#943126;">
                <i class="uil uil-cloud text-white"></i>
              </div>
              <h5 style="color:#943126;">Satu Data Desa Indonesia (SDDI)</h5>
            </button>
            <p>Integrasi data desa dalam satu platform nasional untuk mendukung perencanaan pembangunan desa yang tepat sasaran dan berbasis bukti.</p>
            <ul class="list-unstyled mb-10">
              <li>✔️ Integrasi data lintas sektor</li>
              <li>✔️ Dashboard monitoring desa</li>
              <li>✔️ Akses data terbuka</li>
            </ul>
          </div>
        <button type="button" class="btn text-white" style="background-color:#943126;" on:click={showSddi}>Pelajari Lebih Lanjut</button>
        </div>
      </div>
    </div>
  </div>
</div> 
{#if descanShow}
  <div class="text-center mt-8">
    <p class="display-1 fs-36">
    Desa Cinta Statistik<br />
    Provinsi Sumatera Selatan Tahun { new Date().getFullYear() }
    </p>
    <div class="container">
      <div class="card shadow-none bg-pale-yellow card-border-bottom border-soft-yellow">
        <div class="card-body">
          <p class="text-justify">Program Desa Cinta Statistik (Desa Cantik) dilatarbelakangi kondisi dimana saat ini desa/kelurahan tidak lagi dianggap sebagai obyek pembangunan, melainkan ditempatkan sebagai subyek dan ujung tombak pembangunan dalam peningkatan kesejahteraan masyarakat. Badan Pusat Statistik (BPS) sebagai leading sector dalam pengembangan statistik membuat Program Desa Cantik yang merupakan program pembinaan statistik sektoral di tingkat desa/kelurahan secara berkesinambungan dan komprehensif. Provinsi Sumatera Selatan telah mencanangkan 100 persen Desa di Sumatera Selatan sebagai Desa Cinta Statistik.</p>
        </div>
      </div>
    </div>
  </div>
  <Peta desa={descan}/>
{/if}
{#if sddiShow}
  <div class="text-center text-secondary mt-8">
    <p class="display-1 fs-36">
    Satu Data Desa Indonesia (SDDI)<br />
    Provinsi Sumatera Selatan Tahun { new Date().getFullYear() }
    </p>
    <div class="container">
      <div class="card shadow-none bg-pale-yellow card-border-bottom border-soft-yellow">
        <div class="card-body">
          <p class="text-justify">Desa dan potensinya harus tersaji dengan baik sebagai informasi kewilayahan, guna mendukung pembangunan pada tingkat pemerintahan terkecil. Pemerintah Provinsi Sumatera Selatan dan Badan Pusat Statistik Provinsi Sumatera Selatan hadir bersama berkolaborasi mewujudkan ”Satu Data Desa Indonesia” dalam wujud “Desa Bumi Sriwijaya”.</p>
          <p class="text-justify">“Desa Bumi Sriwijaya” menyajikan informasi lengkap tentang potensi ekonomi dan kondisi infrastruktur desa dan kelurahan di seluruh wilayah Sumatera Selatan sebagai upaya meningkatkan literasi masyarakat desa untuk mengerti, memahami, dan memanfaatkan data untuk membangun desanya. Dengan “Desa Bumi Sriwijaya”, mewujudkan kebijakan berbasis data untuk desa yang lebih maju menuju Sumsel terus maju untuk semua.</p>
        </div>
      </div>
    </div>
    <p class="display-1 fs-24 mt-4 mb-0">Cari Desa...</p>
  </div>
  <div class="container">
    <SearchWilayah />
  </div>
{/if}
