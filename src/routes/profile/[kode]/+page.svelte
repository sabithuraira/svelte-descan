<script>
// @ts-nocheck
  	import PreLoader from "../../../components/navigation/PreLoader.svelte";
	import Header from '../../../components/navigation/Header.svelte';
	import Footer from '../../../components/navigation/Footer.svelte';
  	import BackToTop from "../../../components/navigation/BackToTop.svelte";

	import { onMount } from 'svelte';
 	import axios from 'axios';

	/** @type {import('./$types').PageData} */
	export let data;

	import { infoWilayah, parentWilayah, childWilayah, deskripsi } from '../../../stores/wilayahStores';
	import { urlApi } from '../../../stores/generalStores';
	import { pengurusLast } from '../../../stores/pengurusStores';

	const labelLevel = (kodeWilayah)  => {
		switch(kodeWilayah.length){
			case 10: return  'Desa/Kelurahan'; break;
			case 7: return  'Kecamatan'; break;
			case 4: return 'Kabupaten/Kota'; break;
			case 2: return 'Provinsi'; break;
			default: return "-"; break;
		}
	};

	let preloader = true;

	async function loadWilayah(){
		if(data.kode!=info_wilayah.kode_wilayah){
			await axios
				.get(`${$urlApi}wilayah/${data.kode}/show`)
				.then(({data})=>{
					infoWilayah.set(data.datas.result);
					parentWilayah.set(data.datas.info_induk);
					childWilayah.set(data.datas.info_child);
				}).catch(({ response })=>{
					console.error(response)
				})

			await axios
				.get(`${$urlApi}wilayah/${data.kode}/deskripsi`)
				.then(({data})=>{
					deskripsi.set(data.datas.deskripsi);
				}).catch(({ response })=>{
					console.error(JSON.stringify(response))
				})

			await axios
				.get(`${$urlApi}pengurus/${data.kode}/last`)
				.then(({data})=>{
					pengurusLast.set(data.datas);
				}).catch(({ response })=>{
					console.error(response)
				})
		}
	}

    let info_wilayah = {
        kode_prov: '',
        kode_kab: '',
        kode_kec: '',
        kode_desa: '',
        kode_wilayah: '',
        nama: '',
        nama_prov: '',
        nama_kab: '',
        nama_kec: ''
    };

	infoWilayah.subscribe((value) => {
        if(value.kode_wilayah){
            info_wilayah = value;
        }
	});

	function loadJS(){
		const pluginsJS = document.createElement("script");
		pluginsJS.setAttribute("src", "/sandbox/js/plugins.js");
		document.head.appendChild(pluginsJS);

		const themeJS = document.createElement("script");
		themeJS.setAttribute("src", "/sandbox/js/theme.js");
		document.head.appendChild(themeJS);

		setTimeout(() => {
			theme.init();
			TyperSetup();
		}, 100);
	}

    onMount(() => {
		loadWilayah()
      		.then(() => setTimeout(() => loadJS(), 100))
      		.then(() => (preloader = false));;
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/sandbox/css/plugins.css">
    <link rel="stylesheet" href="/sandbox/css/style.css">
    <link rel="stylesheet" href="/sandbox/css/preloader.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
		integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
		crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<div class="content-wrapper" id="body-layout">
	{#if preloader}
		<PreLoader />
	{/if}
    <Header kode="{$infoWilayah.kode_wilayah}"></Header>

	<section class="wrapper">
		<div class="container pt-6 pt-md-15 pt-xl-18  pb-8 pb-xl-21">
			<div class="row gx-lg-8 gy-8 mt-5 mt-md-12 mt-lg-0 mb-8 align-items-center">
			<div class="col-lg-6 order-lg-2">
				<div class="row gx-md-5 gy-5" data-cues="fadeIn" data-group="images">
				<div class="col-md-6 text-center ">
					<figure class="rounded mx-4"><img src="/images/prov-logo/prov_logo.png"
						srcset="/images/prov-logo/prov_logo.png 2x" alt=""
						style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"></figure>
				</div>
				<div class="col-md-6 text-center ">
					{#if info_wilayah.kode_kab!=''}
					<figure class="rounded mx-4"><img src="/images/kabs-logo/logo{info_wilayah.kode_prov+info_wilayah.kode_kab}.png"
						srcset="/images/kabs-logo/logo{info_wilayah.kode_prov+info_wilayah.kode_kab}.png 2x" alt=""
						style="max-height: 300px; max-width: 200px;  height:100% ; width: 100%;"></figure>
					{/if}
				</div>
				</div>
			</div>
			<div class="col-lg-6 text-white">
				<div data-cues="slideInDown" data-group="page-title" data-delay="600">
				<h1 class="display-1 text-white mb-4 h-20 mb-5" style="display: inline-block;" id="desa_text">
					Selamat Datang di { labelLevel(info_wilayah.kode_wilayah) } 
					<span class="typer text-white"
						data-words="<br>{ info_wilayah.nama }"
						data-loop="false"></span>
					<span class="cursor text-white" data-owner="typer"></span>
				</h1>
				<div data-cues="slideInDown" data-group="page-title" data-delay="600">
					<p class="lead fs-24 lh-sm text-white mb-5 " style="min-height: 300px;">{ $deskripsi }</p>
				</div>

				<div>
					<a class="btn btn-lg btn-sky rounded" id="btn_lanjutkan" href="/monograph/{ $infoWilayah.kode_wilayah }">Selengkapnya</a>
				</div>
				</div>
			</div>
			</div>
		</div>
	</section>
</div>

<Footer></Footer>

<BackToTop />

<style>
	#body-layout {
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/img/desa/desa_3.jpg') no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
    }
</style>