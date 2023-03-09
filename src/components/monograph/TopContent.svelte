<script>
// @ts-nocheck

	import { infoWilayah, deskripsi } from '../../stores/wilayahStores';
	import { monografData } from '../../stores/monografStores';
	import { pengurusLast } from '../../stores/pengurusStores';
	import { labelLevel, labelKepalaWilayah } from '../../helper/labelWilayah';
	import { goto } from '$app/navigation';

	let deskripsiLabel = '';
	let sum_infrastruktur_ibadah = '0';

	// let infrastruktur_kesehatan = [];
	let sum_infrastruktur_kesehatan = '0';

	// let infrastruktur_pendidikan = [];
	let sum_infrastruktur_pendidikan = '0';

	// let infrastruktur_ekonomi = [];
	let sum_infrastruktur_ekonomi = '0';

	// let lembaga_keuangan = [];
	let sum_lembaga_keuangan = '0';
	let sum_industri = '0';
	let sum_penyandang_disabilitas = '0';

	// let penduduk = [];
	let contentProfile = []
	let sum_penduduk = '0';
	let sum_keluarga = '0';
	let sum_luas_wilayah = '0';

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

	infoWilayah.subscribe((value) => {
		if (value.kode_wilayah) {
			info_wilayah = value;
		}
	});

	deskripsi.subscribe((value) => {
		deskripsiLabel = value;
	});

	let pengurus = {
		kode_prov: '',
		kode_kab: '',
		kode_kec: '',
		kode_desa: '',
		nama_ketua: '',
		path_foto: '',
		foto: '',
		nama_wakil: '',
		nama_sekretaris: '',
		pengurus_lainnya: '',
		periode_awal_aktif: '',
		periode_akhir_aktif: '',
		status_aktif: 0,
		encId: ''
	};

	pengurusLast.subscribe((value) => {
		pengurus = value;
	});

	monografData.subscribe((value) => {
		// infrastruktur_ibadah = value.jumlah_infrastruktur_ibadah.sort((a,b) => { return a.nilai - b.nilai; });
		sum_infrastruktur_ibadah = value.jumlah_infrastruktur_ibadah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

		// infrastruktur_kesehatan = value.jumlah_infrastruktur_kesehatan.sort((a,b) => { return a.nilai - b.nilai; });
		sum_infrastruktur_kesehatan = value.jumlah_infrastruktur_kesehatan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

		// infrastruktur_pendidikan = value.jumlah_infrastruktur_pendidikan//.sort((a,b) => { return b.nilai - a.nilai; });
		sum_infrastruktur_pendidikan = value.jumlah_infrastruktur_pendidikan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

		// infrastruktur_ekonomi = value.jumlah_infrastruktur_ekonomi//.sort((a,b) => { return b.nilai - a.nilai; });
		sum_infrastruktur_ekonomi = value.jumlah_infrastruktur_ekonomi.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

		// lembaga_keuangan = value.jumlah_lembaga_keuangan.sort((a,b) => { return b.nilai - a.nilai; });
		sum_lembaga_keuangan = value.jumlah_lembaga_keuangan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

		// penduduk = value.jumlah_penduduk.sort((a,b) => { return a.nilai - b.nilai; });
		sum_penduduk = value.jumlah_penduduk.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_keluarga = value.jumlah_keluarga.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

		sum_luas_wilayah = value.luas_wilayah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_industri = value.jumlah_industri.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_penyandang_disabilitas = value.penyandang_disabilitas.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

		contentProfile = [
			{ label: "Luas Wilayah", value: `${sum_luas_wilayah} Km<sup>2</sup>`, icon: "map", url:"#"},
			{ label: "Penduduk", value: sum_penduduk, icon: "user", url: `/penduduk/${info_wilayah.kode_wilayah}`},
			{ label: "Fasilitas Kesehatan", value: sum_infrastruktur_kesehatan, icon: "hospital", url:"#"},
			{ label: "Keluarga", value: sum_keluarga, icon: "users-alt", url: `/keluarga/${info_wilayah.kode_wilayah}`},
			{ label: "Tempat Ibadah", value: sum_infrastruktur_ibadah, icon: "moon", url:"#"}, 
			{ label: "Fasilitas Pendidikan", value: sum_infrastruktur_pendidikan, icon: "book", url:"#"}, 
			{ label: "Fasilitas Ekonomi", value: sum_infrastruktur_ekonomi, icon: "store", url:"#"}, 
			{ label: "Industrik Mikro & Kecil", value: sum_industri, icon: "building", url:"#"}, 
			{ label: "Penyandang Disabilitas", value: sum_penyandang_disabilitas, icon: "wheelchair", url:"#"}, 
		];
	});
</script>

<section class="wrapper image-wrapper bg-image bg-overlay bg-overlay-900 bg-overlay-900 "
	data-image-src="/images/img/desa/desa_3.jpg">
	<div class="container pt-6 pt-md-15 pb-8">
		<div class="row gx-lg-8 gy-8 mt-5 mt-md-12 mt-lg-0 mb-8 align-items-center">
			<div class="col-lg-3 order-lg-2">
				<div class="row gx-md-5 gy-5 text-center" data-cues="fadeIn" data-group="images">
					{#if pengurus }
						<figure class="rounded mx-4 text-center">
							<img src="{pengurus.foto}"
							srcset="{pengurus.foto} 2x" alt=""
							style="max-height: 300px; max-width: 200px;  height:100% ; width: 100%;">
						</figure>

						<div class="card mx-4">
							<h4 class="mb-0 text-nowrap">
								{labelKepalaWilayah(info_wilayah.kode_wilayah)}
							</h4>
							<p class="fs-14 mb-0">{pengurus.nama_ketua}</p>
						</div>
						  <!-- /section -->
					{:else}
						{#if info_wilayah.kode_kab!=''}
						<figure class="rounded mx-4">
							<img src="/images/kabs-logo/logo{info_wilayah.kode_prov+info_wilayah.kode_kab}.png"
							srcset="/images/kabs-logo/logo{info_wilayah.kode_prov+info_wilayah.kode_kab}.png 2x" alt=""
							style="max-height: 300px; max-width: 200px;  height:100% ; width: 100%;">
						</figure>
						{/if}
					{/if}
				</div>
			</div>

			<div class="col-lg-9 text-white">
				<h1 class="display-1 text-white" style="display: inline-block;" id="desa_text">
					{labelLevel(info_wilayah.kode_wilayah)}
					<span class="typer text-white" data-words={info_wilayah.nama} data-loop="false"/>
					<span class="cursor text-white" data-owner="typer" />
				</h1>
				
				<p class="lead fs-lg mb-8 pe-xxl-2">{ deskripsiLabel }</p>
				<div class="row gx-xl-10 gy-6" data-cues="slideInUp" data-group="services">
					{#each contentProfile as item}
						<div class="col-md-4 col-lg-12 col-xl-4 text-left">
							<button class="d-flex flex-row btn text-start p-0" on:click={() => goto(item.url)}>
								<div>
									<div class="icon btn btn-circle btn-lg btn-soft-primary disabled me-5">
									<i class="uil uil-{item.icon}"></i>
									</div>
								</div>
								<div>
									<h4 class="mb-1 text-white">{item.label}</h4>
									<h2 class="mb-0  text-white">{@html item.value}</h2>
								</div>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>