<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
 	import axios from 'axios'
	import { urlApi } from '../../stores/generalStores';
	import leaflet from "leaflet";

	export let kode_wilayah = '';

	let map;
	let markerMap
	let tooltipMap;
	let keluarga = { data: [], links: [] };
	let listStatusKesejahteraanKeluarga = {};
	let listStatusKesejahteraanKeluargaPersentase = {};
	let statusKesejahteraanSelected = '';
	const statusKesejahteraanLabel = {1: "Sangat Miskin", 2: "Miskin", 3: "Tidak Miskin"};
	let jKeluarga = 0;


	const createMap = () => {
            // map = leaflet.map(document.getElementById("petaKemiskinan"), {
            //   	attributionControl: false,
            // }).setView([-2.990934, 104.756554], 7);

            // leaflet.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
            //   	subdomains: ["mt0", "mt1", "mt2", "mt3"],
            // }).addTo(map);

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
            else url = `${$urlApi}keluarga_miskin/${kode_wilayah}/list?status_kesejahteraan=${statusKesejahteraanSelected}`;
            
			axios.get(url).then((d) => {
              	keluarga = d.data.datas;
            });
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

    onMount(() => {
		getStatusKesejahteraanKeluarga();
		getKeluarga();
        createMap();
    });
</script>

<section class="wrapper bg-light">
	<div class="container py-6 py-md-8">
		<div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 mb-4">
            <div class="col-lg-4">
				<h3 class="display-4 mb-3 pe-xl-10">Jumlah Keluarga</h3>
				<h1 class="display-1 mb-0 pe-xxl-10">{ jKeluarga }</h1>
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
							<div class="col-12">
								<div class="table-responsive" id="tabelKemiskinan">
								<table class="table table-hover">
									<thead>
									<tr>
										<th>No KK</th>
										<th>Nama Kepala Keluarga</th>
										<th>Jumlah Anggota Keluarga</th>
										<th>Satuan Lingkungan Setempat</th>
										<th>Alamat</th>
										<th>Status Kesejahteraan</th>
									</tr>
									</thead>
									<tbody>
										{#each keluarga.data as item}
											<tr on:click={ getLokasi(item.latitude, item.longitude, item.nama_kepala) }>
												<td>{ item.no_kk }</td>
												<td>{ item.nama_kepala }</td>
												<td>{ item.jumlah_art }</td>
												<td>{ item.nama_sls }</td>
												<td>{ item.alamat }</td>
												<td>{ statusKesejahteraanLabel[item.status_kesejahteraan] }</td>
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
											{#each keluarga.links as item}
												<li class="page-item disabled:{ item.active || !item.url }">
													<a class="page-link" href="#" on:click={ getKeluarga(item.url) }>
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
	</div>
</section>