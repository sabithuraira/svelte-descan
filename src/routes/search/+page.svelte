<script>
// @ts-nocheck
  	import PreLoader from "../../components/navigation/PreLoader.svelte";
	import Footer from '../../components/navigation/Footer.svelte';
	import TopContent from '../../components/search/TopContent.svelte';
  	import BackToTop from "../../components/navigation/BackToTop.svelte";

	import { onMount } from 'svelte';
 	import axios from 'axios';
	import { urlApi, keywordSearch } from '../../stores/generalStores';

	let keyword = "";
	let listWilayah = []
	let preloader = false;

	keywordSearch.subscribe((value) => {
		keyword = value;
	});

	const search = async() => {
		keywordSearch.set(keyword)
		preloader = true;
		await axios.post(`${$urlApi}wilayah/search`, {
					keyword: $keywordSearch,
				}).
				then(({data}) => {
					if(data.status=='success') listWilayah = data.datas;
					else console.log("Data gagal disimpan, silahkan ulangi lagi")
				});

		preloader = false;
	};

	const labelLevel = (kodeWilayah)  => {
		switch(kodeWilayah.length){
			case 10: return  'Desa/Kelurahan'; break;
			case 7: return  'Kecamatan'; break;
			case 4: return 'Kabupaten/Kota'; break;
			case 2: return 'Provinsi'; break;
			default: return "-"; break;
		}
	};

	const pathWilayah = (wilayah)  => {
		switch(wilayah.kode_wilayah.length){
			case 10: return `${wilayah.nama_prov} - ${wilayah.nama_kab} - ${wilayah.nama_kec}`; break;
			case 7: return  `${wilayah.nama_prov} - ${wilayah.nama_kab}`; break;
			case 4: return `${wilayah.nama_prov}`; break;
			case 2: return ''; break;
			default: return "-"; break;
		}
	};

	function loadJS(){
		const pluginsJS = document.createElement("script");
		pluginsJS.setAttribute("src", "/sandbox/js/plugins.js");
		document.head.appendChild(pluginsJS);

		const themeJS = document.createElement("script");
		themeJS.setAttribute("src", "/sandbox/js/theme.js");
		document.head.appendChild(themeJS);

		setTimeout(() => {
			theme.initWoHeader();
			TyperSetup();
		}, 100);
	}

    onMount(() => {
		if($keywordSearch!=''){
			search()
				.then(() => setTimeout(() => loadJS(), 100));
		}
		else{
			setTimeout(function () {
				loadJS();
			}, 100)
		}
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/sandbox/css/plugins.css">
    <link rel="stylesheet" href="/sandbox/css/style.css">
    <link rel="stylesheet" href="/sandbox/css/preloader.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</svelte:head>

<div class="content-wrapper">
	{#if preloader}
	<PreLoader />
	{/if}
	<TopContent></TopContent>
    <section class="wrapper bg-light">
		<div class="container py-14 py-md-6">
		  <div class="row text-center">
			<div class="col-xl-10 mx-auto">
			  <h3 class="">Cari Wilayah</h3>
			</div>
			<!-- /column -->
		  </div>
		  <!-- /.row -->
		  <div class="row">
			<div class="col-xl-10 mx-auto">
				<div class="row">
				  <div class="form-floating mb-4 px-2">

					<div class="input-group mb-3">
						<input type="text" class="form-control" 
							bind:value={keyword}
							on:keyup={(e) => { 
								if(e.key=='Enter'){
									search();
								}
							}}
							placeholder="Cari wilayah......" 
							aria-label="Search">
						<div class="input-group-append">
							<button on:click={() => search() } class="input-group-text"><i class="uil uil-search"></i></button>
						</div>
					</div>
				  </div>
				</div>
			  
			  <div class="job-list mb-10">

				{#each listWilayah as item}
					<a href="/profile/{item.kode_wilayah}" class="card shadow-lg mb-4 lift h-100">
						<div class="card-body px-5 py-2 d-flex flex-row">
							<div>
								<span class="badge bg-pale-blue text-blue mb-1">{ labelLevel(item.kode_wilayah) }</span>
								<h4 class="mb-0">{ item.nama }</h4>
								<p class="mb-0 text-body">{ pathWilayah(item) }</p>
							</div>
						</div>
					</a>	
				{/each}
  				<!-- /.card -->
			  </div>
			</div>
			<!-- /column -->
		  </div>
		  <!-- /.row -->
		</div>
		<!-- /.container -->
	  </section>
</div>

<Footer></Footer>
<BackToTop />