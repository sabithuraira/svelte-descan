<script>
// @ts-nocheck
	import { infoWilayah, parentWilayah, childWilayah } from '../../stores/wilayahStores';
	import { monografData } from '../../stores/monografStores';
	import { infrastrukturKesehatan } from '../../stores/infraKesehatanStores';
	import { pengurusLast } from '../../stores/pengurusStores';
	import { labelKepalaWilayah } from '../../helper/labelWilayah';

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

	const metadataIbadah = (data) => {
		switch (true) {
			case data.includes("Balai Basarah"):
				return { logo: 'gopuram', label: 'Balai Basarah'};
				break;
			case data.includes("Lainnya"):
				return { logo: 'peace', label: 'Tempat Ibadah Lainnya'};
				break;
			case data.includes("Masjid"):
				return { logo: 'mosque', label: 'Masjid'};
				break;
			case data.includes("Kapel"):
				return { logo: 'church', label: 'Kapel'};
				break;
			case data.includes("Mushola"):
				return { logo: 'mosque', label: 'Surau/Langgar/Mushola'};
				break;
			case data.includes("Pura"):
				return { logo: 'gopuram', label: 'Pura'};
				break;
			case data.includes("Gereja Kristen"):
				return { logo: 'church', label: 'Gereja Kristen'};
				break;
			case data.includes("Wihara"):
				return { logo: 'vihara', label: 'Wihara'};
				break;
			case data.includes("Gereja Katolik"):
				return { logo: 'church', label: 'Gereja Katolik'};
				break;
			case data.includes("Kelenteng"):
				return { logo: 'vihara', label: 'Kelenteng'};
				break;
			default:
				return { logo: '', label: ''};
		}
	}

	let infrastruktur_ibadah = [];

	let infrastruktur_kesehatan = [];

	let infrastruktur_pendidikan = [];

	let infrastruktur_ekonomi = [];

	let lembaga_keuangan = [];

	let penduduk = [];
	let sum_penduduk = '0';
	let sum_luas_wilayah = '0';

	infoWilayah.subscribe((value) => {
		if (value.kode_wilayah) {
			info_wilayah = value;
		}
	});

	monografData.subscribe((value) => {
		infrastruktur_ibadah = value.jumlah_infrastruktur_ibadah.sort((a,b) => { return b.nilai - a.nilai; });	
		infrastruktur_pendidikan = value.jumlah_infrastruktur_pendidikan//.sort((a,b) => { return b.nilai - a.nilai; });
		infrastruktur_ekonomi = value.jumlah_infrastruktur_ekonomi//.sort((a,b) => { return b.nilai - a.nilai; });
		lembaga_keuangan = value.jumlah_lembaga_keuangan.sort((a,b) => { return b.nilai - a.nilai; });
	
		penduduk = value.jumlah_penduduk.sort((a,b) => { return b.nilai - a.nilai; });
		sum_penduduk = value.jumlah_penduduk.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

		sum_luas_wilayah = value.luas_wilayah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
	});

	pengurusLast.subscribe((value) => {
		pengurus = value;
	});

	infrastrukturKesehatan.subscribe((value) => {	
		infrastruktur_kesehatan = value//.sort((a,b) => { return b.nilai - a.nilai; });
	});
</script>

	<section class="wrapper bg-light" id="section_penduduk">
		<div class="container py-5">
			<div class="row gx-lg-8 gx-xl-12 gy-10 align-items-center">

				<div class="col-md-8 col-lg-6 col-xl-6 order-lg-2 position-relative">
					<div class="row gx-md-5 gy-5 align-items-center">
						<div class="col-6 text-center">
							<img class="img-fluid" src="/images/img/illustrations/i1.png"
							srcset="/images/img/illustrations/i1@2x.png 2x" alt="" style="height:200px; width: auto;" />
							<h2>Laki-Laki</h2>
							<h1>
								{#if penduduk[0] }
									{ penduduk[0].nilai==null ? 0 : penduduk[0].nilai }
								{:else}
									0
								{/if}
							</h1>
						</div>
						<div class="col-6 text-center">
							<img class="img-fluid" src="/images/img/illustrations/i7.png"
							srcset="/images/img/illustrations/i7@2x.png 2x" alt="" style="height:200px; width: auto" />
							<h2>Perempuan</h2>
							<h1>
								{#if penduduk[1] }
									{ penduduk[1].nilai==null ? 0 : penduduk[1].nilai }
								{:else}
									0
								{/if}
							</h1>
						</div>
					</div>
				</div>
				
				<div class="col-lg-6">
					<h2 class="display-4 mb-3">Penduduk</h2>
					<p class="lead fs-lg">Jumlah Penduduk di { info_wilayah.nama } sebanyak 
					<span class="fs-30">{ sum_penduduk }</span> jiwa</p>

					<p class="mb-6">Karakteristik penduduk di Desa/Bandar jaya cenderung <b>didominasi</b> oleh 	
						laki-laki
					</p>
				</div>
				
			</div>
		</div>
	</section>

	<section class="wrapper bg-light" id="section_faskes">
		<div class="container py-5">
			<div class="row">
				<div class="col-lg-12 ">
					<h2 class="display-4 text-center">
						<span class="text-primary m-2">
							<i class="fa-solid fa-hospital"></i>
						</span>
						Fasilitas Kesehatan
					</h2>

					<div class="p-2 text-center mx-5">
						<i class="fa fa-quote-left text-black"></i>
						<i class="font-italic ml-2">Kita kembalikan lagi kepada pola hidup sehat masyarakat kita. Entah pola makan, entah pola olahraga, itu yang digerakkan kesana. Entah lingkungannya, sanitasi, air bersih - <b>Joko Widodo</b></i>
					</div>

					<p class="lead fs-lg mb-5 text-center">
						Berikut adalah daftar ketersediaan fasilitas kesehatan di { info_wilayah.nama }
					</p>

					<ul class="icon-list mb-0">
						<div class="row gy-3 gx-xl-8">
							{#each infrastruktur_kesehatan as item, i}
								<div class="col-12 col-md-6 col-xl-4">
									<li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }">
										<i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>{ item.nama_variabel.replace("Jumlah", "") }
									</li>
								</div>
							{/each}
						</div>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="wrapper bg-light" id="section_tempat_ibadah">
		<div class="container py-5">
			<div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 ">

				<div class="col-lg-4">
					<h3 class="display-4 mb-3 pe-xl-10">Fasilitas Peribadatan</h3>
					<p class="mb-0 pe-xxl-10">
						{#if infrastruktur_ibadah.length>0}
							{metadataIbadah(infrastruktur_ibadah[0].nama_variabel).label} menjadi fasilitas ibadah terbanyak di { info_wilayah.nama }
						{/if}
					</p>
					<div class="mt-2">
						<button class=" btn btn-soft-primary" data-bs-toggle="modal" data-bs-target="#modal_ibadah">Selengkapnya</button>
					</div>
				</div>

				<div class="col-lg-8 mt-lg-2">
					<div class="row align-items-center counter-wrapper gy-6 text-center">
						{#if infrastruktur_ibadah.length>0}
							{#each Array(3) as _, i}
								<div class="col-md-4">
									<button class="btn" data-bs-toggle="modal" data-bs-target="#modal_ibadah">
										<div>
											<span class="text-primary">
											<i class="fa-solid fa-{metadataIbadah(infrastruktur_ibadah[i].nama_variabel).logo} fa-4x" width="70px"></i>
											</span>
											<h3 class="counter">{ infrastruktur_ibadah[i].nilai }</h3>
											<p class="text-navy">{metadataIbadah(infrastruktur_ibadah[i].nama_variabel).label}</p>
										</div>
									</button>
								</div>
							{/each}
						{/if}
					</div>
				</div>
				<!-- /.row -->
		</div>
	</section>

	<section class="wrapper bg-light" id="section_pendidikan">
		<div class="container py-5">
			<div class="row">
				<div class="col-lg-12 ">
					<h2 class="display-4 text-center">
						<span class="text-primary m-2">
							<i class="fa-solid fa-book"></i>
						</span>
						Fasilitas Pendidikan
					</h2>

					<div class="p-2 text-center mx-5">
						<i class="fa fa-quote-left text-black"></i>
						<i class="font-italic ml-2">Pendidikan mempunyai akar yang pahit, tapi buahnya manis - <b>Aristoteles</b></i>
					</div>

					<p class="lead fs-lg mb-5 text-center"> 
						Berikut adalah daftar ketersediaan fasilitas pendidikan di { info_wilayah.nama }
					</p>

					<ul class="icon-list mb-0">
						<div class="row gy-4 gx-xl-12">
							{#each infrastruktur_pendidikan as item}
								<div class="col-12 col-md-6 col-xl-4">
									<li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }">
										<i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>{ item.nama_variabel.replace("Jumlah", "") }
									</li>
								</div>
							{/each}
						</div>
					</ul>
				</div>
			</div>
		</div>
	</section>

    <section class="wrapper bg-soft-primary" id="section_keuangan">
		<div class="container pt-5 my-3">
			<div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 align-items-center">
				<div class="col-lg-4 text-center text-lg-start">
					<h3 class="display-4 mb-3 pe-xxl-15">Infrastruktur Keuangan & Ekonomi</h3>

					<div class="mt-2">
						<button class=" btn btn-soft-primary" data-bs-toggle="modal" data-bs-target="#modal_keuangan">Selengkapnya</button>
					</div>
				</div>
				<!-- /column -->
				<div class="col-lg-8 mt-lg-2">
					<div class="row align-items-center counter-wrapper gy-6 text-center">

						{#if lembaga_keuangan.length>0}
							{#each Array(3) as _, i}
								<div class="col-md-4">
									<h3 class="counter counter-lg">
										{#if lembaga_keuangan[i].nilai!='' && lembaga_keuangan[i].nilai!=null}
											{lembaga_keuangan[i].nilai}
										{:else}
											0
										{/if}
									</h3>
									<p>{ lembaga_keuangan[i].nama_variabel.replace("Jumlah", "") }</p>
								</div>
							{/each}
						{/if}
					</div>
					<!--/.row -->
				</div>
				<!-- /column -->
			</div>
		  <!-- /.row -->
		</div>

		<div class="container pb-5 pt-3">
			<div class="row">
				<div class="col-lg-12 ">
					<ul class="icon-list mb-0">
						<div class="row gy-4 gx-xl-12">
							{#each infrastruktur_ekonomi as item}
								<div class="col-12 col-md-6 col-xl-4">
									<li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }">
										<i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>{ item.nama_variabel.replace("Jumlah", "") }
									</li>
								</div>
							{/each}
						</div>
					</ul>
				</div>
			</div>
		</div>
		<!-- /.container -->
	</section>

	<section class="wrapper bg-light" id="section_luas_wilayah">
		<div class="container py-12 py-md-3 py-md-5">
			<div class="row gx-lg-8 gx-xl-12 gy-10 align-items-center">
				<div class="col-lg-8 mt-0">
					<!-- <h2 class="fs-15 text-uppercase text-line text-primary text-center mb-3">Meet the Team</h2> -->
					<h3 class="display-5 mb-5">{ info_wilayah.nama }</h3>
					<p>Luas Wilayah: {sum_luas_wilayah} Km<sup>2</sup></p>
					<p>Batas Wilayah: Desa Sumber Jaya, Desa Sumber Terang</p>
					<p>Keunggulan Wilayah: Tanah Gembur</p>
					<p>Komoditas Tanaman Pangan Unggulan: Padi</p>
					<div class="row counter-wrapper gy-6">
						<div class="col-md-4">
							<h3 class="counter text-primary">2184</h3>
							<p>Luas Tanam Padi</p>
						</div>
						<div class="col-md-4">
							<h3 class="counter text-primary">7518</h3>
							<p>Luas Panen Padi</p>
						</div>

						<div class="col-md-4">
							<h3 class="counter text-primary">3472</h3>
							<p>Produktifitas</p>
						</div>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="swiper-container text-center mb-6" data-margin="30" data-dots="true" data-items-xl="1"
						data-items-md="1" data-items-xs="1">
					<div class="swiper">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								{#if pengurus }
									<img class="rounded-circle w-20 h-20 mx-auto mb-4" src="{pengurus.foto}"
									srcset="{pengurus.foto} 2x" alt="" />
									<h4 class="mb-1">{ pengurus.nama_ketua }</h4>
									<div class="meta mb-2">{ labelKepalaWilayah(info_wilayah.kode_wilayah) }</div>
									<p class="mb-2">{ pengurus.periode_awal_aktif } s/d {pengurus.periode_akhir_aktif}</p>
								{/if}
								<nav class="nav social justify-content-center text-center mb-0">
								<a href="https://www.facebook.com/people/Bps-Provinsi-Sumatera-Selatan/100015484759318/"
									target="_blank" rel="noreferrer"><i class="uil uil-facebook-f"></i></a>
								<a href="https://www.instagram.com/bpssumsel/?hl=en" target="_blank" rel="noreferrer"><i
									class="uil uil-instagram"></i></a>
								<a href="https://www.youtube.com/channel/UC-9WQN-5cNTVTGDF8Rkiu6A" target="_blank" rel="noreferrer"><i
									class="uil uil-youtube"></i></a>
								</nav>
								<!-- /.social -->
							</div>
							<!--/.swiper-slide -->
						</div>
						<!--/.swiper-wrapper -->
					</div>
					<!-- /.swiper -->
					</div>
					<!-- /.swiper-container -->
				</div>
			</div>
 		</div>
	</section>

	<div class="modal" id="modal_ibadah" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered modal-md">
			<div class="modal-content text-center">
				<div class="modal-body">
				<button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				<div class="col d-flex mb-2">
					<h2 class="me-2">Fasilitas Ibadah</h2>
					<div class="icon btn btn-circle disabled btn-primary me-4"> <i class="fa-solid fa-peace"></i>
					</div>
				</div>

				<table class="table table-bordered table-responsive table-sm table-striped table-hover table-primary text-start" style="border: #00000034;">
					<thead>
						<tr>
							<th class="text-center bg-primary text-white">No</th>
							<th scope="col" class="bg-primary  text-center  text-white">Fasilitas</th>
							<th scope="col" class="bg-primary text-center text-white ">Jumlah</th>
						</tr>
					</thead>
					<tbody style="border: #00000034;">
						{#each infrastruktur_ibadah as item, i}
							<tr>
								<th scope="row" class="text-center">{i+1}</th>
								<td>{metadataIbadah(item.nama_variabel).label}</td>
								<td class="text-center">{item.nilai}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				</div>
				<!--/.modal-body -->
			</div>
		<!--/.modal-content -->
		</div>
		<!--/.modal-dialog -->
	</div>

	<div class="modal" id="modal_keuangan" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered modal-md">
			<div class="modal-content text-center">
				<div class="modal-body">
				<button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				<div class="col d-flex mb-2">
					<h2 class="me-2">Fasilitas Keuangan</h2>
				</div>

				<table class="table table-bordered table-responsive table-sm table-striped table-hover table-primary text-start" style="border: #00000034;">
					<thead>
						<tr>
							<th class="text-center bg-primary text-white">No</th>
							<th scope="col" class="bg-primary  text-center  text-white">Fasilitas</th>
							<th scope="col" class="bg-primary text-center text-white ">Jumlah</th>
						</tr>
					</thead>
					<tbody style="border: #00000034;">
						{#each lembaga_keuangan as item, i}
							<tr>
								<th scope="row" class="text-center">{i+1}</th>
								<td>{ item.nama_variabel.replace("Jumlah", "") }</td>
								<td class="text-center">{item.nilai}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				</div>
				<!--/.modal-body -->
			</div>
		<!--/.modal-content -->
		</div>
		<!--/.modal-dialog -->
	</div>