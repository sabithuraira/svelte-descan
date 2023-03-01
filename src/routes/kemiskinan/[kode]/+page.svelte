<script>
// @ts-nocheck
	import Header from '../../../components/navigation/Header.svelte';
	import Footer from '../../../components/navigation/Footer.svelte';
	import TopProfile from '../../../components/navigation/TopProfile.svelte';
	import Body from '../../../components/kemiskinan/Body.svelte';

	import { onMount } from 'svelte';
 	import axios from 'axios';
 	import * as jq from 'jquery';

	/** @type {import('./$types').PageData} */
	export let data;

	import { infoWilayah, parentWilayah, childWilayah, deskripsi } from '../../../stores/wilayahStores';
	import { urlApi } from '../../../stores/generalStores';

	async function loadWilayah(){
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
				console.error(response)
			})

		jq('.preloader').hide();
	}

    onMount(() => {
		theme.stickyHeader();
		theme.subMenu();
		// theme.offCanvas();
		// theme.isotope();
		// theme.onepageHeaderOffset();
		// theme.anchorSmoothScroll();
		// theme.svgInject();
		theme.backgroundImage();
		// theme.backgroundImageMobile();
		// theme.imageHoverOverlay();
		// theme.rellax();
		theme.scrollCue();
		// theme.swiperSlider();
		// theme.lightbox();
		// theme.plyr();
		// theme.progressBar();
		// theme.pageProgress();
		theme.counterUp();
		// theme.bsTooltips();
		// theme.bsPopovers();
		// theme.bsModal();
		// theme.iTooltip();
		// theme.forms();
		// theme.passVisibility();
		// theme.pricingSwitcher();
		// theme.textRotator();
		// theme.codeSnippet();

		loadWilayah();
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/sandbox/css/plugins.css">
    <link rel="stylesheet" href="/sandbox/css/style.css">
    <link rel="stylesheet" href="/sandbox/css/preloader.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"/>
	
	<script src="/sandbox/js/plugins.js"></script>
	<script src="/sandbox/js/theme.js"></script>

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
		integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
		crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<div class="content-wrapper">
	<div class="preloader">
		<img src="/images/logo/loader-logo.gif" alt="spinner" class="h-10">
	</div>
    <Header kode="{$infoWilayah.kode_wilayah}"></Header>
    <TopProfile></TopProfile>
    <Body kode_wilayah={data.kode}></Body>
</div>

<Footer></Footer>

<div class="progress-wrap">
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
</div>
