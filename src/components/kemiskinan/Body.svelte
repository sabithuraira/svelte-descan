<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
 	import axios from 'axios'
	import leaflet from "leaflet";
	import Swal from 'sweetalert2';

	import { urlApi } from '../../stores/generalStores';

	export let kode_wilayah = '';

	let map;
	let markerMap
	let tooltipMap;
	let keluarga = { data: [], links: [] };
	let listStatusKesejahteraanKeluarga = {};
	let bantuan = [];
    let kategoriBantuan =  {};
	let listStatusKesejahteraanKeluargaPersentase = {};
	let statusKesejahteraanSelected = '';
	const statusKesejahteraanLabel = {1: "Sangat Miskin", 2: "Miskin", 3: "Tidak Miskin"};
	let jKeluarga = 0;
	let keyword = "";

	const createMap = () => {
			map = leaflet.map("petaKemiskinan").setView([-2.9655006, 104.7335063], 13);
			leaflet
				.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
					maxZoom: 19,
					attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				})
				.addTo(map);
        };

	const createChart = () => {
        const chart = new Chart(document.getElementById("persentaseKemiskinan"), {  //$refs["persentaseKemiskinan"], {
				type: "pie",
				data: {
					labels: Object.values(statusKesejahteraanLabel),
					datasets: [
						{ data: Object.values(listStatusKesejahteraanKeluarga) },
					],
				},
				options: {
					offset: 20,
					onClick: (e) => {
					const points = chart.getElementsAtEventForMode(
						e,
						"point",
						{ intersect: true },
						true
					);
					if (points.length)
						for (let k in statusKesejahteraanLabel){
							if (statusKesejahteraanLabel[k] == chart.data.labels[points[0].index])
								statusKesejahteraanSelected = k;
						}
						getKeluarga();
						document.getElementById("tabelKemiskinan").scrollIntoView({  //$refs["tabelKemiskinan"].scrollIntoView({
							behavior: "smooth",
							block: "start",
							inline: "start",
						});
					},
					plugins: {
						tooltip: {
							enabled: true,
							callbacks: {
							label: (context) => {
								var index = context.dataset.data.indexOf(context.raw);
								return (
								Object.values(listStatusKesejahteraanKeluarga)[
									index
								] +
								" (" +
								Object.values(
									listStatusKesejahteraanKeluargaPersentase
								)[index] +
								"%)"
								);
							},
							},
						},
					},
				},
            });
        };


     let getStatusKesejahteraanKeluarga = () => {
            listStatusKesejahteraanKeluarga = "";
            axios
				.get(`${$urlApi}keluarga_miskin/${kode_wilayah}/sum_status_kesejahteraan`)
				.then((d) => {
					listStatusKesejahteraanKeluarga = d.data.datas[0];

					jKeluarga = Object.values(listStatusKesejahteraanKeluarga).reduce((acc, item) => {
						return acc + Number(item)
					}, 0);


					listStatusKesejahteraanKeluargaPersentase = {};
					for (let idx in listStatusKesejahteraanKeluarga){
						listStatusKesejahteraanKeluargaPersentase[idx] = Math.round(
							(Number(listStatusKesejahteraanKeluarga[idx]) /
								Number(jKeluarga)) *
								100 *
								100
							) / 100;
					}
                	createChart();
              });
          };


	const getKeluarga = (suffix)  => {
            let url = "";
            if (suffix) url = kode_wilayah + suffix;
            else url = `${$urlApi}keluarga_miskin/${kode_wilayah}/list?status_kesejahteraan=${statusKesejahteraanSelected}&keyword=${keyword}`;
            
			axios.get(url).then((d) => {
              	keluarga = d.data.datas;
            });
        };

	const getKategoriBantuan = async() => {
            await axios.get(`${$urlApi}master_bantuan`).then((d) => {
              	kategoriBantuan = d.data.datas;
            });
        };

	const getBantuan = (param_bantuan) => {
            bantuan = param_bantuan;

            if (bantuan.length != 0) {
				setTimeout(() =>
					document.getElementById("tabelBantuan").scrollIntoView({
						behavior: "smooth",
						block: "start",
						inline: "start",
					}), 100
				);
            } else{
				Swal.fire({
					text: "Tidak ada bantuan",
					toast: true,
					showConfirmButton: false,
					position: "center",
					timer: 1000,
					timerProgressBar: true,
				});
			}
		};
	
    const getLokasi = (lat, lng, nama) => {
		if (markerMap) map.removeLayer(markerMap);
		if (tooltipMap) map.removeLayer(tooltipMap);
		if (lat && lng) {
			markerMap = leaflet.marker([lat, lng]).addTo(map);
			tooltipMap = leaflet.tooltip([lat, lng], {
				content: nama,
				permanent: true,
			}).addTo(map);
			map.setView([lat, lng], 20);
			// $refs["petaKemiskinan"].scrollIntoView({
			document.getElementById("petaKemiskinan").scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "start",
			});
		} 
		else map.setView([-2.990934, 104.756554], 7);
	};

	const nameKategoriBantuan = (id, tag) => {
			const bantuan = kategoriBantuan.find((b) => b.id == id);
			if (bantuan) return bantuan[tag];
			else return "";
		};

    onMount(() => {
		getStatusKesejahteraanKeluarga();
		getKeluarga();
        createMap();
		getKategoriBantuan();
    });
</script>

<section class="wrapper bg-light">
	<div class="container py-6 py-md-8">
		<div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 mb-4">
            <div class="col-lg-4">
				<h3 class="display-4 mb-3 pe-xl-10">Jumlah Keluarga</h3>
				<h1 class="display-1 mb-0 pe-xxl-10 counter">{ jKeluarga }</h1>
            </div>
            <!-- /column -->
            <div class="col-lg-8 mt-lg-2">
				<div class="row align-items-center counter-wrapper gy-6 text-center">
					<div class="col-md-4">
						<img src="/images/img/icons/lineal/group.svg"
							class="icon-svg icon-svg-md text-primary mb-3"
							alt="" />
						<h3 class="counter">
							{ listStatusKesejahteraanKeluarga ?
							listStatusKesejahteraanKeluarga.sangat_miskin + " (" +
							listStatusKesejahteraanKeluargaPersentase.sangat_miskin + "%) "
							: "" }
						</h3>
						<p>Sangat Miskin</p>
					</div>
					<!--/column -->
					<div class="col-md-4">
						<img src="/images/img/icons/lineal/savings.svg"
							class="icon-svg icon-svg-md text-primary mb-3"
							alt="" />
						<h3 class="counter">
							{ listStatusKesejahteraanKeluarga ?
							listStatusKesejahteraanKeluarga.miskin + " (" +
							listStatusKesejahteraanKeluargaPersentase.miskin + "%) " : "" }
						</h3>
						<p>Miskin</p>
					</div>
					<!--/column -->
					<div class="col-md-4">
						<img
							src="/images/img/icons/lineal/tie.svg"
							class="icon-svg icon-svg-md text-primary mb-3"
							alt=""
						/>
						<h3 class="counter">
							{ listStatusKesejahteraanKeluarga ?
							listStatusKesejahteraanKeluarga.tidak_miskin + " (" +
							listStatusKesejahteraanKeluargaPersentase.tidak_miskin + "%) " :
							"" }
						</h3>
						<p>Tidak Miskin</p>
					</div>
					<!--/column -->
				</div>
              <!--/.row -->
            </div>
            <!-- /column -->
        </div>

		<hr class="my-4" />
		<h3 class="display-4 mb-3 text-center">Keluarga</h3>
		<p class="lead fs-lg mb-10 text-center">Berdasarkan Tingkat Kesejahteraan</p>
		<div class="row">
			<div class="col-lg-6 mb-6 d-flex align-items-stretch">
				<div class="card w-100">
					<div class="card-body d-flex justify-content-center align-items-center">
						<canvas id="persentaseKemiskinan"></canvas>
					</div>
				</div>
			</div>
			<!--/column -->
			<div class="col-lg-6 mb-6 d-flex align-items-stretch">
				<div class="card w-100">
					<div class="card-body">
						<div id="petaKemiskinan" class='d-flex' style="height: 600px"></div>
					</div>
					<!--/.card-body -->
				</div>
				<!--/.card -->
			</div>
		<!--/column -->




		<div class="col-12">
			<div class="card">
				<div class="card-body">
					<div class="row">
					<div class="col-xl-11 col-lg-10 col-md-9 col-sm-8 mb-2">
						<div class="form-floating">
						<input id="pencarian" type="text"
							class="form-control" placeholder="Pencarian"
							bind:value={keyword}
							on:keyup={(event) => {
								if(event===undefined || event.key=='Enter'){
									getKeluarga();
								}
							}}
						/>
						<label for="pencarian">Pencarian</label>
						</div>
					</div>
					<div class="col-xl-1 col-lg-2 col-md-3 col-sm-4 mb-2">
						<button class="btn btn-primary rounded-0" on:click={ getKeluarga() }>Cari!</button>
					</div>
					<div class="col-12 mb-2">
						<div class="table-responsive" ref="tabelKemiskinan">
						<table class="table table-hover">
							<thead>
							<tr>
								<th>No KK</th>
								<th>Nama Kepala Keluarga</th>
								<th>Jumlah Anggota Keluarga</th>
								<th>Satuan Lingkungan Setempat</th>
								<th>Alamat</th>
								<th>Status Kesejahteraan</th>
								<th>Lokasi</th>
								<th>Bantuan</th>
							</tr>
							</thead>
							<tbody>
								{#each keluarga.data as data}
									<tr>
										<td>{ data.no_kk }</td>
										<td>{ data.nama_kepala }</td>
										<td>{ data.jumlah_art }</td>
										<td>{ data.nama_sls }</td>
										<td>{ data.alamat }</td>
										<td>{ statusKesejahteraanLabel[data.status_kesejahteraan] }</td>
										<td>
											<a class="btn btn-outline-primary btn-sm rounded-0"
												on:click={ getLokasi(data.latitude, data.longitude, data.nama_kepala) }>Lokasi</a>
										</td>
										<td>
											<a class="btn btn-outline-primary btn-sm rounded-0" 
												on:click={ getBantuan(data.bantuan) }>Bantuan</a>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
						</div>
					</div>
					<div class="col-12 d-flex justify-content-center">
						<div class="table-responsive">
						<nav aria-label="pagination keluarga">
							<ul class="pagination">
								{#each keluarga.links as data}
									<li class="page-item disabled:' { data.active || !data.url }">
										<a class="page-link" on:click={ getKeluarga(data.url) }>
											<span>{@html data.label.replace('Previous', '').replace('Next', '')}</span>
										</a>
									</li>
								{/each}
							</ul>
						</nav>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
		
			<!--/column -->
		</div>

		{#if bantuan.length>0}
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
						<div class="col-12">
							<div class="table-responsive" id="tabelBantuan">
								<table class="table table-hover">
									<thead>
										<tr>
											<th>No KK</th>
											<th>NIK Penerima Bantuan</th>
											<th>Nama Kepala Keluarga</th>
											<th>Nama Bantuan</th>
											<th>Deskripsi Bantuan</th>
											<th>Bentuk Bantuan</th>
											<th>Instansi Pemberi Bantuan</th>
											<th>Waktu Bantuan</th>
											<th>Jumlah Bantuan</th>
											<th>Satuan Bantuan</th>
										</tr>
									</thead>

									<tbody>
										{#each bantuan as item}
											<tr>
												<td>{ item.no_kk }</td>
												<td>{ item.nik }</td>
												<td>{ item.nama_kepala }</td>
												<td>{ nameKategoriBantuan(item.bantuan_id,"nama_bantuan") }</td>
												<td>{ nameKategoriBantuan(item.bantuan_id,"deskripsi_bantuan") }</td>
												<td>{ nameKategoriBantuan(item.bantuan_id, "bentuk_bantuan") }</td>
												<td>{ nameKategoriBantuan(item.bantuan_id,"instansi_pemberi") }</td>
												<td>{ item.waktu_bantuan }</td>
												<td>{ item.jumlah_bantuan }</td>
												<td>{ item.satuan_bantuan }</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>