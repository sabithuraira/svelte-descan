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
					Pusat Informasi dan Data Desa<br />
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
            <img class="img-responsive"
              src="/images/prov-logo/logo1600.png"
              alt="" style="max-height:200px; width: auto" />
            <span class="bg"></span>
					</figure>
				</div>

				<div class="col-lg-12 text-center">
					<form action="search">
						<div class="input-group mb-3">
							<input type="text" class="form-control" 
								bind:value={keyword}
								on:input={() => keywordSearch.set(keyword) }
								placeholder="Ketik nama desa......" 
								aria-label="Search">
							<div class="input-group-append">
								<button type="submit" class="input-group-text"><i class="uil uil-search"></i></button>
							</div>
						</div>
					</form>
				</div>

        {#if descanLoaded && !descanShow}
          <div class="col-lg-12 text-center">
            <button type="button" class="btn btn-outline-light mt-8" on:click={showDescan}>Tampilkan Desa Cinta Statistik</button>
          </div>
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
  </div>
  <Peta desa={descan}/>
  <div class="text-center text-secondary mt-8">
    <p class="display-1 fs-30">Cari Desa Lainnya...</p>
  </div>
  <SearchWilayah />
{/if}
