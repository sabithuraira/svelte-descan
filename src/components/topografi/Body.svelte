<script>
	// @ts-nocheck
	import Chart, { layouts } from "chart.js/auto";
	import L from "leaflet";
	import Swal from "sweetalert2";

	import { infoWilayah } from '../../stores/wilayahStores';
	import { topografiData } from "../../stores/topografiStores";
	import { labelLevel } from '../../helper/labelWilayah';

	let map;
	let chart;
	let pointMap = { marker: {}, tooltip: {} };
	let show = false;

	let dataTopografi = {
		luas_wilayah: "0", 
		topografi: "0", 
		koordinat_wilayah: "0",
		ketinggian_wilayah: "0", 
		berbatasan_laut: "0", 
		kawasan_hutan: "0",
		pemanfaatan_laut: "0",
		fungsi_hutan: "0"
	};

	let info_wilayah = {
		kode_prov: "",
		kode_kab: "",
		kode_kec: "",
		kode_desa: "",
		kode_wilayah: "",
		nama: "",
		nama_prov: "",
		nama_kab: "",
		nama_kec: "",
	};

	topografiData.subscribe((value) => {
		dataTopografi.koordinat_wilayah = value.koordinat_wilayah.sort((a,b) => { return b.nilai - a.nilai; });

		if(value.luas_wilayah.length>0) dataTopografi.luas_wilayah = value.luas_wilayah[0].nilai;
		if(value.topografi.length>0) dataTopografi.topografi = value.topografi[0].nilai;
		if(value.ketinggian_wilayah.length>0) dataTopografi.ketinggian_wilayah = value.ketinggian_wilayah[0].nilai;
		if(value.berbatasan_laut.length>0) dataTopografi.berbatasan_laut = value.berbatasan_laut[0].nilai;
		if(value.kawasan_hutan.length>0) dataTopografi.kawasan_hutan = value.kawasan_hutan[0].nilai;
		if(value.pemanfaatan_laut.length>0) dataTopografi.pemanfaatan_laut = value.pemanfaatan_laut[0].nilai;
		if(value.fungsi_hutan.length>0) dataTopografi.fungsi_hutan = value.fungsi_hutan[0].nilai;
	});

	infoWilayah.subscribe((value) => {
		if (value.kode_wilayah) {
			info_wilayah = value;
		}
	});

	const createMap = () => {
		if (map) map.remove();

		map = L.map("petaKemiskinan", {
		attributionControl: false,
		}).setView([-2.990934, 104.756554], 15);

		L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
		}).addTo(map);
	};
</script>

<section class="wrapper bg-light" id="section_penduduk">
	<div class="container py-5">
		<div class="row gx-lg-8 gx-xl-12 gy-10 align-items-center">
			<div class="col-lg-6 order-lg-2">
				<div class="card me-lg-6">
					<div class="card-body p-6">
						<div class="d-flex flex-row">
							<div>
								<span class="icon btn btn-circle btn-lg btn-soft-primary disabled me-4">
									<span class="number">{ dataTopografi.luas_wilayah }</span>
								</span>
							</div>
							<div>
								<h4 class="mb-1">Luas</h4>
								<p class="mb-0">Luas wilayah dalam km <sup>2</sup></p>
							</div>
						</div>
					</div>
					<!--/.card-body -->
				</div>
				<!--/.card -->
				<div class="card ms-lg-13 mt-6">
					<div class="card-body p-6">
					<div class="d-flex flex-row">
						<div>
							<span class="icon btn btn-circle btn-lg btn-soft-primary disabled me-4"><span class="number">{ dataTopografi.ketinggian_wilayah }</span></span>
						</div>
						<div>
						<h4 class="mb-1">Altitude</h4>
						<p class="mb-0">Ketinggian Letak (Altitude) diatas permukaan laut dalam satuan mdpl</p>
						</div>
					</div>
					</div>
					<!--/.card-body -->
				</div>
			<!--/.card -->
			</div>
			<!--/column -->
			<div class="col-lg-6">
				<h2 class="display-6 mb-3">Topografi</h2>
				<p class="lead fs-lg pe-lg-5">{labelLevel(info_wilayah.kode_wilayah)} {info_wilayah.nama}</p>
				<p>
					Topografi sebagian besar wilayah {labelLevel(info_wilayah.kode_wilayah)} {info_wilayah.nama} adalah 
					{#if dataTopografi.topografi==1}
						Puncak/Tebing
					{:else if dataTopografi.topografi==2}
						Lereng
					{:else if dataTopografi.topografi==3}
						Dataran
					{:else if dataTopografi.topografi==4}
						Lembah
					{/if}. Terletak pada 
					{#each dataTopografi.koordinat_wilayah as item, i}
						{item.nama_variabel} adalah {item.nilai}
						{#if i==0}
							sedangkan &nbsp;
						{/if}
					{/each}
					. 
				</p>
				<p class="mb-6">
					{labelLevel(info_wilayah.kode_wilayah)} {info_wilayah.nama} memiliki total luas wilayah sebesar {dataTopografi.luas_wilayah} km <sup>2</sup> 
					dengan ketinggian letak (altitude) lokasi kegiatan pemerintahan adalah {dataTopografi.ketinggian_wilayah} mdpl.
					{#if dataTopografi.berbatasan_laut==1}
						Wilayah ini berbatasan langsung dengan laut. 
					{:else}
						Wilayah ini tidak berbatasan langsung dengan laut. 
					{/if}
				</p>
			</div>
			<!--/column -->
		</div>
	</div>
</section>