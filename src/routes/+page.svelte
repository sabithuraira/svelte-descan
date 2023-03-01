<script>
// @ts-nocheck
	import WilayahLogo from '../components/landing/WilayahLogo.svelte';
	import { urlApi, keywordSearch } from '../stores/generalStores';
 	import axios from 'axios'
	import { onMount } from 'svelte';
	
	let kabKotas = []; //as Wilayah[];
	let keyword = "";
	let randomNumberFoto = 1;
	let arrFoto = [
		'descan_1.jpeg',
		'descan_2.jpeg',
		'descan_3.jpeg',
		'descan_4.jpeg',
		'descan_5.jpeg',
		'descan_6.jpeg',
		'descan_7.jpeg',
		'descan_8.JPG',
		'descan_9.JPG',
		'descan_10.JPG',
		'descan_11.JPG',
		'descan_12.JPG',
	];

	async function loadWilayah(){
		await axios
			.get(`${$urlApi}wilayah/16`)
			.then(({data})=>{
				kabKotas = data.datas
			}).catch(({ response })=>{
				console.error(response)
			})
	}

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

	onMount(() => {
		loadWilayah();
		randomNumberFoto = getRandomInt(1,12);
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/sandbox/css/landing.css"/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
		integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
		crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<section class="wrapper image-wrapper bg-image bg-overlay bg-overlay-300"
	data-image-src="/images/landing/{arrFoto[randomNumberFoto]}"
	style="background-image: url('/images/landing/{arrFoto[randomNumberFoto]}');" >
	<div class="container pb-19 pt-md-18 pb-md-17 text-center">
		<div class="row">
			<div class="col-lg-8 col-xl-7 col-xxl-6 mx-auto"
				data-cues="slideInDown"
				data-group="page-title"
				data-disabled="true">
				<h1 class="display-1 text-white fs-60 px-md-15 px-lg-0"
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
				<p class="lead fs-24 text-white lh-sm mx-md-13 mx-lg-10"
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
					<figure class="img-responsive overlay overlay-1 hover-scale rounded mb-0">
						<a href="/profile/16">
							<img class="img-responsive"
								src="/images/prov-logo/logo1600.png"
								alt="" style="max-height:200px; width: auto" />
							<span class="bg"></span>
						</a>
						<figcaption>
							<h6 class="from-top mb-0">Kunjungi</h6>
						</figcaption>
					</figure>
				</div>

				<div class="col-lg-12 text-center">
					<form action="search">
						<div class="input-group mb-3">
							<input type="text" class="form-control" 
								bind:value={keyword}
								on:input={() => keywordSearch.set(keyword) }
								placeholder="Cari wilayah......" 
								aria-label="Search">
							<div class="input-group-append">
								<button type="submit" class="input-group-text"><i class="fa fa-search"></i></button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!-- /column -->
		</div>
	<!-- /.row -->
	</div>

<!-- /.container -->
	<div class="overflow-hidden">
		<div class="divider text-light mx-n2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60">
			<path fill="currentColor" d="M0,0V60H1440V0A5771,5771,0,0,1,0,0Z"></path>
			</svg>
		</div>
	</div>
</section>

<div class="row">
	<div class="col-lg mx-5 justify-content-between">
		<div class="row gx-md-5 gy-5 mt-n19 mb-14 mb-md-17" style="height: 200px">
			<div class="col-12 grid-margin stretch-card">
				<div class="d-sm-flex justify-content-between align-items-start">
					{#each kabKotas as kabKota}
						<WilayahLogo kodeWilayah="{ kabKota.kode_wilayah }" name="{ kabKota.nama }" />
					{/each}
				</div>
			</div>
		</div>
	<!-- /.tab-content -->
	</div>
<!-- /.container -->
</div>