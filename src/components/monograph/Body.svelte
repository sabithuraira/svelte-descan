<script>
// @ts-nocheck
	import { infoWilayah, parentWilayah, childWilayah } from '../../stores/wilayahStores';
	import { monografData } from '../../stores/monografStores';
	import { pengurusLast } from '../../stores/pengurusStores';

	let info_wilayah = [];
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

		let infrastruktur_ibadah = [];
		let sum_infrastruktur_ibadah = '0';

		let infrastruktur_kesehatan = [];
		let sum_infrastruktur_kesehatan = '0';

		let penduduk = [];
		let sum_penduduk = '0';
		let sum_luas_wilayah = '0';

		infoWilayah.subscribe((value) => {
			info_wilayah = value;
		});

		monografData.subscribe((value) => {
			infrastruktur_ibadah = value.jumlah_infrastruktur_ibadah.sort((a,b) => { return a.nilai - b.nilai; });
			sum_infrastruktur_ibadah = value.jumlah_infrastruktur_ibadah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

			infrastruktur_kesehatan = value.jumlah_infrastruktur_kesehatan.sort((a,b) => { return a.nilai - b.nilai; });
			sum_infrastruktur_kesehatan = value.jumlah_infrastruktur_kesehatan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

			penduduk = value.jumlah_penduduk.sort((a,b) => { return a.nilai - b.nilai; });
			sum_penduduk = value.jumlah_penduduk.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

			sum_luas_wilayah = value.luas_wilayah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		});

		pengurusLast.subscribe((value) => {
			pengurus = value;
		});
	</script>

	<section class="wrapper bg-light" id="section_penduduk">
		<div class="container py-5 py-md-8">
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

	<section class="wrapper bg-light" id="section_tempat_ibadah">
	<div class="container py-5 py-md-8">
		<div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 ">
		<div class="col-lg-8 mt-lg-2">
			<div class="row align-items-center counter-wrapper gy-6 text-center">

				<div class="col-md-4">
					<button class="btn" data-bs-toggle="modal" data-bs-target="#modal_ibadah">
						<div>
							<span class="text-primary">
							<i class="fa-solid fa-mosque fa-4x" width="70px"></i>
							</span>
							<h3 class="counter">10</h3>
							<p>Masjid</p>
						</div>
					</button>
				</div>

			<div class="col-md-4">
				<button class="btn" data-bs-toggle="modal" data-bs-target="#modal_ibadah">
				<div>
					<span class="text-primary">
					<i class="fa-solid fa-church fa-4x" width="70px"></i>
					</span>
					<h3 class="counter">2</h3>
					<p>Gereja</p>
				</div>
				</button>
			</div>

			<div class="col-md-4">
				<button class="btn" data-bs-toggle="modal" data-bs-target="#modal_ibadah">
				<div>
					<span class="text-primary">
					<i class="fa-solid fa-vihara fa-4x" width="70px"></i>
					</span>
					<h3 class="counter">1</h3>
					<p>Wihara</p>
				</div>
				</button>
			</div>

			</div>

		</div>
		<div class="col-lg-4">
			<h3 class="display-4 mb-3 pe-xl-10">Fasilitas Peribadatan</h3>
			<p class="lead fs-lg mb-0 pe-xxl-10">Masjid menjadi fasilitas ibadah terbanyak di { info_wilayah.nama }
			</p>
			<div class="mt-2">
			<button class=" btn btn-soft-primary" data-bs-toggle="modal" data-bs-target="#modal_ibadah">Lihat Lebih
				Banyak</button>
			</div>
		</div>

		</div>
		<!-- /.row -->
	</div>
	</section>

	<section class="wrapper bg-light" id="section_faskes">
	<div class="container py-5 py-md-7">
		<div class="row">
		<div class="col-lg-12 ">
			<h2 class="display-4 text-center">Fasilitas Kesehatan</h2>
			<div class="row my-3">
			<div class="col-md-9 col-12 ">
				Fasilitas Kesehatan pada Desa/Kelurahan Bandar Jaya lebih terdepan dari desa/kelurahan lainnya di
				Kecamatan Sialang
			</div>
			<div class="col-md-3 col-12 text-center p-2">
				<span class="text-primary">
				<i class="fa-solid fa-hospital fa-3x"></i>
				</span>
			</div>
			</div>

			<ul class="icon-list mb-0">
			<div class="row gy-3 gx-xl-8">
				<div class="col-12 col-md-6 col-xl-4">
				<li class=" icon-list bullet-bg bullet-soft-red">
					<i class="uil uil-multiply "></i>Rumah Sakit
				</li>
				</div>
				<div class="col-12 col-md-6 col-xl-4">
				<li class=" icon-list bullet-bg bullet-soft-green">
					<span> <i class="uil uil-check "></i></span><span>Puskesmas</span>
				</li>
				</div>
				<div class="col-12 col-md-6 col-xl-4">
				<li class=" icon-list bullet-bg bullet-soft-green">
					<span> <i class="uil uil-check "></i></span><span>Poliklinik</span>
				</li>
				</div>
				<div class="col-12 col-md-6 col-xl-4">
				<li class=" icon-list bullet-bg bullet-soft-green">
					<span> <i class="uil uil-check "></i></span><span>Puskesdes</span>
				</li>
				</div>
				<div class="col-12 col-md-6 col-xl-4">
				<li class=" icon-list bullet-bg bullet-soft-green">
					<span> <i class="uil uil-check "></i></span><span>Pustu</span>
				</li>
				</div>
			</div>
			</ul>




		</div>

		</div>
	</div>
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
					<img class="rounded-circle w-20 h-20 mx-auto mb-4" src="{pengurus.foto}"
					srcset="{pengurus.foto} 2x" alt="" />
					<h4 class="mb-1">{ pengurus.nama_ketua }</h4>
					<div class="meta mb-2">Kepala Desa</div>
					<p class="mb-2">{ pengurus.periode_awal_aktif } s/d {pengurus.periode_akhir_aktif}</p>
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
  <!-- /.container -->
</section>