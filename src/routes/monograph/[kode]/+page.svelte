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

	import { infoWilayah, parentWilayah, childWilayah, deskripsi } from '../../../stores/wilayahStores';
	import { monografData } from '../../../stores/monografStores';
	import { umkmData } from '../../../stores/umkmStores';
	import { infrastrukturKesehatan } from "../../../stores/infraKesehatanStores";
	import { pengurusLast } from '../../../stores/pengurusStores';
	import { urlApi } from '../../../stores/generalStores';
  import { subscribe } from "svelte/internal";

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
					keunggulan_wilayah: tempData.filter(item => item.kategori_variabel=='keunggulan_wilayah'),
					pangan_unggulan: tempData.filter(item => item.kategori_variabel=='pangan_unggulan'),
					hortikultura_unggulan: tempData.filter(item => item.kategori_variabel=='hortikultura_unggulan'),
					penyandang_disabilitas: tempData.filter(item => item.kategori_variabel=='penyandang_disabilitas'),
				});

				umkmData.set({
					industri: tempData.filter(item => item.kategori_variabel=='jumlah_industri'),
				});

				infrastrukturKesehatan.set(tempData.filter(item => item.kategori_variabel=='jumlah_infrastruktur_kesehatan'));

			}).catch(({ response })=>{
				console.error(response)
			})

		await axios
			.get(`${$urlApi}penduduk/${data.kode}/list?jenis_kelamin=1`)
			.then(({data})=>{
				let tempData = data.datas.total;
				monografData.update((value) => {
					let idx = value.jumlah_penduduk.findIndex(item => item.nama_variabel == 'Jumlah penduduk laki-laki');
					value.jumlah_penduduk[idx].nilai = tempData;					
					return value;
				});
			}).catch(({response})=>{
				console.error(response)
			})

		await axios
			.get(`${$urlApi}penduduk/${data.kode}/list?jenis_kelamin=2`)
			.then(({data})=>{
				let tempData = data.datas.total;
				monografData.update((value) => {
					let idx = value.jumlah_penduduk.findIndex(item => item.nama_variabel == 'Jumlah penduduk perempuan');
					value.jumlah_penduduk[idx].nilai = tempData;					
					return value;
				});
			}).catch(({response})=>{
				console.error(response)
			})

		await axios
			.get(`${$urlApi}keluarga_miskin/${data.kode}/list`)
			.then(({data})=>{
				console.log(data)
				let tempData = data.datas.total;
				monografData.update((value) => {
					let idx = value.jumlah_keluarga.findIndex(item => item.nama_variabel == 'Jumlah keluarga');
					value.jumlah_keluarga[idx].nilai = tempData;					
					return value;
				});
			}).catch(({response})=>{
				console.error(response)
			})
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

<div class="content-wrapper">
	{#if preloader}
		<PreLoader />
	{/if}
    <Header kode="{$infoWilayah.kode_wilayah}"></Header>
    <TopContent></TopContent>
    <Body></Body>
</div>

<Footer></Footer>

<BackToTop />
