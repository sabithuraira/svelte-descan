<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
 	import axios from 'axios'
	import { infoWilayah, parentWilayah, childWilayah } from '../../stores/wilayahStores';
	import { urlApi } from '../../stores/generalStores';

	export let kode_wilayah = '';
	let info_wilayah = [];

	infoWilayah.subscribe((value) => {
		info_wilayah = value;
	});

	let kategori= [];
	let penduduk = { data: [], links: [] };
	let statusStuntingSelected = "";
// 
	// const statusStuntingSelected = () => {
	// 	getPenduduk();
	// 	document.getElementById("tabelStunting").scrollIntoView({
	// 		behavior: "smooth",
	// 		block: "start",
	// 		inline: "start",
	// 	});
	// }
	const getKategori = async() => {
            try {
				let total = await axios.get(url + "kategori");
				total = total.data.datas.total;
				await axios.get(`${$urlApi}` + "kategori?per_page=" + total).then((d) => {
					kategori = d.data.datas.data;
				});
            } catch (error) {}
        };

	const nameKategori = (kode, tag) => {
			let kategoriByTag = kategori.filter((k) => k.tag == tag);
			let kategoriGetKode = kategoriByTag.find((k) => k.kode == kode);
			if (kategoriGetKode) return kategoriGetKode.name;
			else return "";
		};
          
	const getPenduduk = (suffix) => {
            var url = "";
            if (suffix) url = $urlApi + suffix;
            else url = $urlApi + "penduduk/" + kode_wilayah + "/list?status_stunting=" + statusStuntingSelected;
            axios.get(url).then((d) => {
              	penduduk = d.data.datas;
				console.log(penduduk.data)
            });
		};
	
	const setStatusStuntingSelected = (value) => {
		statusStuntingSelected = value;
	}
	
	onMount(() => {
		getKategori().then(() => getPenduduk());
    });
</script>

<section class="wrapper bg-light">
	<div class="container py-6 py-md-8">
		<div class="row text-center">
			<div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
				<h3 class="display-4 mb-2 px-xl-10">Penduduk Stunting</h3>
				<p>
				<b><i>Stunting</i></b> adalah gangguan pertumbuhan dan
				perkembangan anak akibat kekurangan gizi kronis dan infeksi
				berulang, yang ditandai dengan panjang atau tinggi badannya
				berada di bawah standar
				</p>
			</div>
		<!-- /column -->
		</div>
		<!-- /.row -->
		<div class="position-relative mb-14 mb-md-17">
			<div class="shape rounded-circle bg-soft-primary rellax w-16 h-16"
				data-rellax-speed="1"
				style="bottom: -0.5rem; right: -2.5rem; z-index: 0"></div>
		<div class="shape bg-dot primary rellax w-16 h-17"
			data-rellax-speed="1"
			style="top: -0.5rem; left: -2.5rem; z-index: 0"
		></div>
		
		<div class="row gx-md-5 gy-5 text-center">
			<div class="col-md-6 col-xl-4">
			<div class="card">
				<div class="card-body">
				<div
					class="icon btn btn-circle btn-lg btn-primary disabled mb-3"
				>
					<i class="uil uil-phone-volume"></i>
				</div>
				<h4>Stunting</h4>
				<h1 class="display-1 mb-2">100</h1>
				<a
					class="more hover link-primary" href="#" on:click={ statusStuntingSelected = 1}>Lihat</a
				>
				</div>
				<!--/.card-body -->
			</div>
			<!--/.card -->
			</div>
			<!--/column -->
			<div class="col-md-6 col-xl-4">
			<div class="card">
				<div class="card-body">
					<div class="icon btn btn-circle btn-lg btn-primary disabled mb-3" >
					<i class="uil uil-shield-exclamation"></i>
				</div>
				<h4>Potensi Stunting</h4>
				<h1 class="display-1 mb-2">50</h1>
				<a class="more hover link-primary" href="#" on:click={ statusStuntingSelected = 2 }
					>Lihat</a>
				</div>
				<!--/.card-body -->
			</div>
			<!--/.card -->
			</div>
			<!--/column -->
			<div class="col-md-6 col-xl-4">
			<div class="card">
				<div class="card-body">
				<div class="icon btn btn-circle btn-lg btn-primary disabled mb-3">
					<i class="uil uil-laptop-cloud"></i>
				</div>
				<h4>Tidak Stunting</h4>
				<h1 class="display-1 mb-2">1500</h1>
				<a class="more hover link-primary" href="#" on:click={ statusStuntingSelected = 0 }>Lihat</a>
				</div>
				<!--/.card-body -->
			</div>
			<!--/.card -->
			</div>
			<!--/column -->
		</div>

		<!--/.row -->
		<hr class="my-6" />
		<h3 class="display-4 mb-6 text-center">Penduduk</h3>
		<div class="row">
			<div class="col-12">
			<div class="card">
				<div class="card-body">
				<div class="row">
					<div class="col-12 mb-2">
					<div class="table-responsive" ref="tabelStunting">
						<table class="table table-striped">
						<thead>
							<tr>
							<th>NIK</th>
							<th>No KK</th>
							<th>Nama Lengkap</th>
							<th>Jenis Kelamin</th>
							<th>Tempat Lahir</th>
							<th>Tanggal Lahir</th>
							<th>Umur</th>
							<th>Pendidikan Terakhir</th>
							<th>Status Pekerjaan</th>
							<th>Pekerjaan</th>
							<th>Jenis Pekerjaan</th>
							<th>Nama SLS</th>
							<th>Alamat</th>
							<th>Status Stunting</th>
							</tr>
						</thead>
						<tbody>
							{#each penduduk.data as item}
							<tr>
								<td>{ item.nik }</td>
								<td>{ item.no_kk }</td>
								<td>{ item.nama_lengkap }</td>
								<td>{ nameKategori(item.jenis_kelamin,"jenis_kelamin") }</td>
								<td>{ item.tempat_lahir }</td>
								<td>{ item.tanggal_lahir }</td>
								<td>{ item.umur }</td>
								<td>{ nameKategori(item.pendidikan_terakhir,"pendidikan") }</td>
								<td>{ item.status_pekerjaan == 1 ? "Bekerja" : "Tidak Bekerja" }</td>
								<td>{ item.pekerjaan }</td>
								<td>{ nameKategori(item.jenis_pekerjaan, "lap_usaha") }</td>
								<td>{ item.nama_sls }</td>
								<td>{ item.alamat }</td>
								<td>{ nameKategori(item.status_stunting, "stunting") }</td>
							</tr>
							{/each}
						</tbody>
						</table>
					</div>
					</div>
					<div class="col-12 d-flex justify-content-center">
					<div class="table-responsive">
						<nav aria-label="pagination penduduk">
						<ul class="pagination">
							{#each penduduk.links as item}
								<li class="page-item disabled:{ item.active || !item.url }">
									<a class="page-link" href="#" on:click={ getPenduduk(item.url)}>
										<span>{@html item.label.replace('Previous', '').replace('Next', '')}</span>
									</a>
								</li>
							{/each}
						</ul>
						</nav>
					</div>
					</div>
				</div>
				</div>
				<!--/.card-body -->
			</div>
			<!--/.card -->
			</div>
			<!--/column -->
		</div>
		<!--/.row -->
		</div>
		<!-- /.position-relative -->
	</div>
  <!-- /.container -->
</section>