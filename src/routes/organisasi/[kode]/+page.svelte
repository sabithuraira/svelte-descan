<script>
	// @ts-nocheck
  	import PreLoader from "../../../components/navigation/PreLoader.svelte";
	import Header from '../../../components/navigation/Header.svelte';
	import Footer from '../../../components/navigation/Footer.svelte';
	import TopProfile from '../../../components/navigation/TopProfile.svelte';
	import Body from '../../../components/organisasi/Body.svelte';
  	import BackToTop from "../../../components/navigation/BackToTop.svelte";

	import { onMount } from 'svelte';
 	import axios from 'axios';

	/** @type {import('./$types').PageData} */
	export let data;

	import { infoWilayah, parentWilayah, childWilayah, deskripsi } from '../../../stores/wilayahStores';
	import { pengurusLast } from '../../../stores/pengurusStores';
	import { urlApi } from '../../../stores/generalStores';

	let preloader = true;
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
					console.error(response)
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

<div class="content-wrapper">
	{#if preloader}
		<PreLoader />
	{/if}
    <Header kode="{$infoWilayah.kode_wilayah}"></Header>
    <TopProfile></TopProfile>
    <Body></Body>
</div>

<Footer></Footer>

<BackToTop />
