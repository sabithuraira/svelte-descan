<script>
// @ts-nocheck
  import PreLoader from "../../../components/navigation/PreLoader.svelte";
	import Header from '../../../components/navigation/Header.svelte';
	import Footer from '../../../components/navigation/Footer.svelte';
	import TopContent from '../../../components/monograph/TopContent.svelte';
	import Body from '../../../components/monograph/Body.svelte';
  import BackToTop from "../../../components/navigation/BackToTop.svelte";

	import { onMount } from 'svelte';
 	import axios from 'axios';

	/** @type {import('./$types').PageData} */
	export let data;

	let preloader = true;
  let dataLoaded = false;
  let urlApi = 'https://descan.bpssumsel.com/api/';
  let infoWilayah, parentWilayah, childWilayah, deskripsi;
  let monografData, umkmData, infrastrukturKesehatan, pengurusLast;

	async function loadWilayah(){
    await axios
      .get(`${urlApi}wilayah/${data.kode}/show`)
      .then(({data})=>{
        infoWilayah = data.datas.result;
        parentWilayah = data.datas.info_induk;
        childWilayah = data.datas.info_child;
      }).catch(({ response })=>{
        console.error(response)
      })

    await axios
      .get(`${urlApi}wilayah/${data.kode}/deskripsi`)
      .then(({data})=>{
        deskripsi = data.datas.deskripsi;
      }).catch(({ response })=>{
        console.error(response)
      })

    await axios
      .get(`${urlApi}pengurus/${data.kode}/last`)
      .then(({data})=>{
        pengurusLast = data.datas;
      }).catch(({ response })=>{
        console.error(response)
      })

		await axios
			.get(`${urlApi}dashboard/${data.kode}/monograph`)
			.then(({data})=>{
				let tempData = data.datas;
				monografData = {
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
					keunggulan_wilayah: tempData.filter(item => item.kategori_variabel=='keunggulan_wilayah'),
					pangan_unggulan: tempData.filter(item => item.kategori_variabel=='pangan_unggulan'),
					hortikultura_unggulan: tempData.filter(item => item.kategori_variabel=='hortikultura_unggulan'),
					penyandang_disabilitas: tempData.filter(item => item.kategori_variabel=='penyandang_disabilitas'),
				};

				umkmData = {
					industri: tempData.filter(item => item.kategori_variabel=='jumlah_industri'),
				};

				infrastrukturKesehatan = tempData.filter(item => item.kategori_variabel=='jumlah_infrastruktur_kesehatan');

			}).catch(({ response })=>{
				console.error(response)
			})
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
		}, 500);
	}

  onMount(() => {
    loadWilayah()
          .then(() => setTimeout(() => loadJS(), 100))
          .then(() => (dataLoaded = true))
          .then(() => (preloader = false));
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
    <Header kode="{data.kode}"></Header>
    {#if dataLoaded}
    <TopContent
      infoWilayah={infoWilayah}
      deskripsi={deskripsi}
      monografData={monografData}
      umkmData={umkmData}
      infrastrukturKesehatan={infrastrukturKesehatan}
      pengurus={pengurusLast}>
    </TopContent>
    <Body
      infoWilayah={infoWilayah}
      monografData={monografData}
      infrastrukturKesehatan={infrastrukturKesehatan}
      pengurus={pengurusLast}>
    </Body>
    {/if}
</div>

<Footer></Footer>

<BackToTop />
