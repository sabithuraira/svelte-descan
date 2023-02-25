<script >
// @ts-nocheck
	import WilayahLogo from '../components/landing/WilayahLogo.svelte';
	import { urlApi } from '../stores/generalStores';
 	import axios from 'axios'
	import { onMount } from 'svelte';
	// import type { Wilayah } from "../models/Wilayah"
	
	let kabKotas =  []; //as Wilayah[];

	async function loadWilayah(){
		await axios
			.get(`${$urlApi}wilayah/16`)
			.then(({data})=>{
				kabKotas = data.datas
			}).catch(({ response })=>{
				console.error(response)
			})
	}

	onMount(() => {
		loadWilayah();
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/sandbox/css/landing.css"/>
</svelte:head>

<section class="wrapper image-wrapper bg-image bg-overlay bg-overlay-300"
	data-image-src="https://webapps.bps.go.id/sumsel/tematik/images/footage/img_(8).jpg" >
	<div class="container pt-17 pb-19 pt-md-18 pb-md-17 text-center">
		<div class="row">
			<div class="col-lg-8 col-xl-7 col-xxl-6 mx-auto"
				data-cues="slideInDown"
				data-group="page-title"
				data-disabled="true">
			<h1
				class="display-1 text-white fs-60 mb-4 px-md-15 px-lg-0"
				data-cue="slideInDown"
				data-group="page-title"
				data-show="true"
				style="
				animation-name: slideInDown;
				animation-duration: 700ms;
				animation-timing-function: ease;
				animation-delay: 0ms;
				animation-direction: normal;
				animation-fill-mode: both;
				"
			>
				Desa Bumi <span class="underline-3 style-2 yellow">Sriwijaya</span>
			</h1>
			<p
				class="lead fs-24 text-white lh-sm mb-7 mx-md-13 mx-lg-10"
				data-cue="slideInDown"
				data-group="page-title"
				data-show="true"
				style="
				animation-name: slideInDown;
				animation-duration: 700ms;
				animation-timing-function: ease;
				animation-delay: 300ms;
				animation-direction: normal;
				animation-fill-mode: both;
				"
			>
				Peta Tematik Desa Cinta Statistik <br />
				Provinsi Sumatera Selatan.
			</p>
			<div
				data-cue="slideInDown"
				data-group="page-title"
				data-show="true"
				style="
				animation-name: slideInDown;
				animation-duration: 700ms;
				animation-timing-function: ease;
				animation-delay: 600ms;
				animation-direction: normal;
				animation-fill-mode: both;
				"
			>
				<figure class="img-responsive overlay overlay-1 hover-scale rounded mb-0">
				<a href="/monograph">
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
			</div>
			<!-- /column -->
		</div>
	<!-- /.row -->
	</div>
<!-- /.container -->
	<div class="overflow-hidden">
		<div class="divider text-light mx-n2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60">
			<path
				fill="currentColor"
				d="M0,0V60H1440V0A5771,5771,0,0,1,0,0Z"
			></path>
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