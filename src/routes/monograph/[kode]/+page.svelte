<script>
// @ts-nocheck

	import Header from '../../../components/navigation/Header.svelte';
	import CenterMenu from '../../../components/navigation/CenterMenu.svelte';
	import Footer from '../../../components/navigation/Footer.svelte';
	import TopContent from '../../../components/monograph/TopContent.svelte';
	import Body from '../../../components/monograph/Body.svelte';

	import { onMount } from 'svelte';
 	import axios from 'axios'

	/** @type {import('./$types').PageData} */
	export let data;

	import { infoWilayah, parentWilayah, childWilayah, deskripsi } from '../../../stores/wilayahStores';
	import { monografData } from '../../../stores/monografStores';
	import { pengurusLast } from '../../../stores/pengurusStores';
	import { urlApi } from '../../../stores/generalStores';

	async function loadWilayah(){
		await axios
			.get(`${$urlApi}wilayah/${data.kode}/show`)
			.then(({data})=>{
				infoWilayah.set(data.datas.result);
				parentWilayah.set(data.datas.info_induk);
				childWilayah.set(data.datas.info_child);
				deskripsi.set(data.datas.deskripsi);

			}).catch(({ response })=>{
				console.error(response)
			})

		await axios
			.get(`${$urlApi}dashboard/${data.kode}/monograph`)
			.then(({data})=>{
				let tempData = data.datas;
				monografData.set({
					luas_wilayah: tempData.filter(item => item.kategori_variabel=='luas_wilayah'),  
					ketinggian_wilayah: tempData.filter(item => item.kategori_variabel=='ketinggian_wilayah'), 
					batas_wilayah: tempData.filter(item => item.kategori_variabel=='batas_wilayah'),
					jumlah_penduduk: tempData.filter(item => item.kategori_variabel=='jumlah_penduduk'), 
					jumlah_keluarga: tempData.filter(item => item.kategori_variabel=='jumlah_keluarga'), 
					jumlah_infrastruktur_pendidikan: tempData.filter(item => item.kategori_variabel=='jumlah_infrastruktur_pendidikan'),
					jumlah_infrastruktur_kesehatan: tempData.filter(item => item.kategori_variabel=='jumlah_infrastruktur_kesehatan'),
					jumlah_infrastruktur_ibadah: tempData.filter(item => item.kategori_variabel=='jumlah_infrastruktur_ibadah'),
					informasi_internet: tempData.filter(item => item.kategori_variabel=='informasi_internet'),
					jumlah_lembaga_keuangan: tempData.filter(item => item.kategori_variabel=='jumlah_lembaga_keuangan'),
					jumlah_infrastruktur_ekonomi: tempData.filter(item => item.kategori_variabel=='jumlah_infrastruktur_ekonomi'),
					jumlah_industri: tempData.filter(item => item.kategori_variabel=='jumlah_industri'),
					keunggulan_wilayah: tempData.filter(item => item.kategori_variabel=='keunggulan_wilayah'),
					pangan_unggulan: tempData.filter(item => item.kategori_variabel=='pangan_unggulan'),
					hortikultura_unggulan: tempData.filter(item => item.kategori_variabel=='hortikultura_unggulan'),
				});

			}).catch(({ response })=>{
				console.error(response)
			})

		await axios
			.get(`${$urlApi}pengurus/${data.kode}/last`)
			.then(({data})=>{
				pengurusLast.set(data.datas);
				console.log(data)
			}).catch(({ response })=>{
				console.error(response)
			})
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
		// theme.counterUp();
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
	<script src="/sandbox/js/theme.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
		integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
		crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<div class="content-wrapper">
    <Header></Header>
    <TopContent></TopContent>
	<CenterMenu kode_wilayah={data.kode}
		name_page="monograph"></CenterMenu>
    <Body></Body>
</div>

<Footer></Footer>

<div class="progress-wrap">
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
</div>
