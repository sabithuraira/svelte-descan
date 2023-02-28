<script>
// @ts-nocheck
	import { page } from '$app/stores';
	import Footer from '../../components/navigation/Footer.svelte';

	import { onMount } from 'svelte';
 	import axios from 'axios';
	import { urlApi, keywordSearch } from '../../stores/generalStores';

	let keyword = "";
	let listWilayah = []

	keywordSearch.subscribe((value) => {
		keyword = value;
	});

	const search = async(event) => {
		if(event===undefined || event.key=='Enter'){
			keywordSearch.set(keyword)
			
			await axios.post(`${$urlApi}wilayah/search`, {
						keyword: $keywordSearch,
					}).
					then(({data}) => {
						if(data.status=='success') listWilayah = data.datas;
						else console.log("Data gagal disimpan, silahkan ulangi lagi")
					});
		}
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

    onMount(() => {
		if($keywordSearch!=''){
			search()
		}
		console.log($keywordSearch);
		// console.log(keyword);
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/sandbox/css/plugins.css">
    <link rel="stylesheet" href="/sandbox/css/style.css">
	<script src="/sandbox/js/theme.js"></script>
</svelte:head>

<div class="content-wrapper">
    <section class="wrapper bg-light">
		<div class="container py-14 py-md-16">
		  <div class="row text-center">
			<div class="col-xl-10 mx-auto">
			  <h3 class="display-4 mb-5 px-xxl-15">Cari Wilayah</h3>
			</div>
			<!-- /column -->
		  </div>
		  <!-- /.row -->
		  <div class="row">
			<div class="col-xl-10 mx-auto">
				<div class="row">
				  <div class="form-floating mb-4 px-2">
					<input id="textInputExample" type="text" class="form-control" bind:value={keyword} 
						placeholder="Masukkan kata kunci..." on:keyup={search}>
					<label for="textInputExample">Masukkan kata kunci...</label>
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

<div class="progress-wrap">
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
</div>
