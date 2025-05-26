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
	<div class="container pb-8 pt-md-7 pb-md-6 text-center">
		<div class="row">
			<div class="col-lg-8 col-xl-7 col-xxl-6 mx-auto"
				data-cues="slideInDown"
				data-group="page-title"
				data-disabled="true">
				<h1 class="display-7 text-white fs-60 px-md-15 px-lg-0"
					data-cue="slideInDown"
					data-group="page-title"
					data-show="true"
					style="animation-name: slideInDown;
						animation-duration: 700ms;
						animation-timing-function: ease;
						animation-delay: 0ms;
						animation-direction: normal;
						animation-fill-mode: both;" >
					Desa Bumi <span class="underline-3 style-2 yellow">Sriwijaya</span>
				</h1>
				<p class="lead fs-36 text-white lh-sm mx-md-13 mx-lg-10"
					data-cue="slideInDown"
					data-group="page-title"
					data-show="true"
					style="animation-name: slideInDown;
					animation-duration: 700ms;
					animation-timing-function: ease;
					animation-delay: 300ms;
					animation-direction: normal;
					animation-fill-mode: both;">
					Satu Data Desa Indonesia (SDDI)<br />
					Provinsi Sumatera Selatan.
				</p>
				<div data-cue="slideInDown"
					data-group="page-title"
					data-show="true"
					style="animation-name: slideInDown;
					animation-duration: 700ms;
					animation-timing-function: ease;
					animation-delay: 600ms;
					animation-direction: normal;
					animation-fill-mode: both;">
					<figure class="img-responsive hover-scale rounded mb-8">
            <img class="img-responsive mr-2"
              src="/images/prov-logo/logo1600.png"
              alt="" style="max-height:200px; width: auto" />
            <img class="img-responsive ml-2"
              src="/images/bps-logo/logo_bps.png"
              alt="" style="max-height:150px; width: auto" />
					</figure>
				</div>

				<div class="col-lg-12 text-center">
					<form action="search">
						<div class="input-group mb-3">
							<input type="text" class="form-control" 
								bind:value={keyword}
								on:input={() => keywordSearch.set(keyword) }
								placeholder="Ketik nama desa..." 
								aria-label="Search">
							<div class="input-group-append">
								<button type="submit" class="input-group-text"><i class="uil uil-search"></i></button>
							</div>
						</div>
					</form>
				</div>

        {#if descanLoaded}
          {#if !descanShow}
            <div class="col-lg-12 text-center">
              <button type="button" class="btn btn-outline-light mt-4" on:click={showDescan}>Tampilkan Desa Cinta Statistik</button>
            </div>
          {/if}
          {#if !sddiShow}
          <div class="col-lg-12 text-center">
            <button type="button" class="btn btn-outline-light mt-4" on:click={showSddi}>Tampilkan Satu Desa Data Indonesia (SDDI)</button>
          </div>
          {/if}
        {/if}
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
          <p class="text-justify">Untuk membangun data dari level desa, BPS telah melakukan pembinaan kepada Desa/Kelurahan Cinta Statistik secara mandiri. BPS telah berupaya menjangkau desa dengan status Tertinggal, sangat tertinggal, berkembang hingga maju dan mandiri. Agar upaya ini dapat menjangkau seluruh desa kelurahan, maka BPS perlu melakukan kolaborasi dengan membuat program Satu Data Desa Indonesia (SDDI). SDDI bertujuan untuk Pembinaan statistik sektoral di tingkat kabupaten/kota untuk memenuhi data desa secara top down dengan memenuhi prinsip Satu Data Indonesia (SDI). Pelaksanaan SDDI dilaksanakan melalui kegiatan Pembinaan Statistik Sektoral ke seluruh desa/kelurahan dalam satu kabupaten/kota.</p>
        </div>
      </div>
    </div>
    <p class="display-1 fs-24 mt-4 mb-0">Cari Desa...</p>
  </div>
  <div class="container">
    <SearchWilayah />
  </div>
{/if}
