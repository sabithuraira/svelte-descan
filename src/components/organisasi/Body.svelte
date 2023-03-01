<script>
// @ts-nocheck
	import { urlApi } from '../../stores/generalStores';
	import { infoWilayah } from '../../stores/wilayahStores';
 	import axios from 'axios';
	// import { onMount } from 'svelte';

	let info_wilayah = { kode_wilayah: ''};
	infoWilayah.subscribe(value => {
		if(value.kode_wilayah!=undefined){
			info_wilayah = value;
			loadPengurus();
		}
	});
	let listPengurus = [];

	const labelKetua = ()  => {
		switch(info_wilayah.kode_wilayah.length){
			case 10: return  'Kepala Desa/Lurah'; break;
			case 7: return  'Camat'; break;
			case 4: return 'Bupati/Walikota'; break;
			case 2: return 'Gubernur'; break;
			default: return "-"; break;
		}
	};

	const labelWilayah = ()  => {
		switch(info_wilayah.kode_wilayah.length){
			case 10: return  'Desa/Kelurahan'; break;
			case 7: return  'Kecamatan'; break;
			case 4: return 'Kabupaten/Kota'; break;
			case 2: return 'Provinsi'; break;
			default: return "-"; break;
		}
	};

	async function loadPengurus(){
		await axios
			.get(`${$urlApi}pengurus/${$infoWilayah.kode_wilayah}/list`)
			.then(({data})=>{
				listPengurus = data.datas.data;
			}).catch(({ response })=>{
				console.error(response)
			})
	}
</script>

<section class="wrapper bg-light">
	<div class="container px-2 py-6 py-md-6">
		<div class="row mb-3">
			<div class="col-md-10 col-xl-9 col-xxl-7 mx-auto text-center">
				<h2 class="display-4 mb-3 ">Riwayat Keorganisasian <br>{ labelWilayah() } { $infoWilayah.nama }
				</h2>
			</div>
			<!--/column -->
		</div>
		{#each listPengurus as item}
			<div class="row gx-lg-8 gx-xl-12 gy-12 align-items-center px-4 mb-3">
				<div class="card border border-secondary">
					<div class="card-body px-0">
						<div class="row">
							<div class="col-5 col-lg-2 position-relative">
								<figure class="rounded text-center"><img src={item.foto}
										srcset={item.foto} alt="" style="max-height: 200px; max-width: 200px;
										height: auto;  width: auto; ">
								</figure>
							</div>
							<div class="col-7 col-lg-8 ">
								<div class="row mb-3">
									<div class="col-12 col-lg-4">
										{ labelKetua() } :
									</div>
									<div class="col-12 col-lg-7">
										<b> { item.nama_ketua } </b>
									</div>
								</div>
								<div class="row mb-3">
									<div class="col-12 col-lg-4">
										Wakil { labelKetua() } :
									</div>
									<div class="col-12 col-lg-7">
										<b> { item.nama_wakil } </b>
									</div>
								</div>
								<div class="row mb-3">
									<div class="col-12 col-lg-4">
										Sekretaris { labelKetua() } :
									</div>
									<div class="col-12 col-lg-7">
										<b> { item.nama_sekretaris } </b>
									</div>
								</div>
								<div class="accordion accordion-wrapper" :id="'accordion'+pengurus.id">
									<div class="card plain accordion-item">
										<div class="card-header" :id="'heading'+pengurus.id">
											<button class="collapsed" data-bs-toggle="collapse"
												:data-bs-target="'#collapse'+pengurus.id" aria-expanded="false"
												:aria-controls="'collapse'+pengurus.id"> Pengurus Lainnya
											</button>
										</div>
										<div :id="'collapse'+pengurus.id" class="accordion-collapse collapse"
											:aria-labelledby="'heading'+pengurus.id"
											:data-bs-parent="'#accordion'+pengurus.id">
											<div class="card-body">
												<p v-html="pengurus.pengurus_lainnya"></p>
											</div>
										</div>
									</div>

								</div>
							</div>

							<div class="col-12 col-md-6 col-lg-2 d-flex align-items-center justify-content-center">
								<div class="text-center ">
									<b> { item.periode_awal_aktif }
										<br>
										s.d
										<br>
										{ item.periode_akhir_aktif }
									</b>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>