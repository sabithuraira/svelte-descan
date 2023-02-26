<script>
// @ts-nocheck

	import { infoWilayah, deskripsi } from '../../stores/wilayahStores';
	import { monografData } from '../../stores/monografStores';

	let info_wilayah = { kode_prov: '16',  kode_kab: '', nama: '' };

	let deskripsiLabel = '';
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

	deskripsi.subscribe((value) => {
		deskripsiLabel = value;
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
</script>

<section class="wrapper image-wrapper bg-image bg-overlay bg-overlay-900 bg-overlay-900 "
	data-image-src="/images/img/desa/desa_1.jpg">
	<div class="container pt-6 pt-md-15 pb-8">
		<div class="row gx-lg-8 gy-8 mt-5 mt-md-12 mt-lg-0 mb-8 align-items-center">
			<div class="col-lg-6 order-lg-2">
				<div class="row gx-md-5 gy-5" data-cues="fadeIn" data-group="images">
				<div class="col-md-6 text-center ">
					<figure class="rounded mx-4"><img src="/images/prov-logo/prov_logo.png"
						srcset="/images/prov-logo/prov_logo.png 2x" alt=""
						style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"></figure>
				</div>
				<div class="col-md-6 text-center ">
						{#if info_wilayah.kode_kab!=''}
						<figure class="rounded mx-4"><img src="/images/kabs-logo/logo{info_wilayah.kode_prov+info_wilayah.kode_kab}.png"
							srcset="/images/kabs-logo/logo{info_wilayah.kode_prov+info_wilayah.kode_kab}.png 2x" alt=""
							style="max-height: 300px; max-width: 200px;  height:100% ; width: 100%;"></figure>
						{/if}
					</div>
				</div>
			</div>
			<div class="col-lg-6 text-white">
				<h2 class="display-4 mb-3 text-white">{ info_wilayah.nama }</h2>
				<p class="lead fs-lg mb-8 pe-xxl-2">{ deskripsiLabel }</p>
				<div class="row gx-xl-10 gy-6" data-cues="slideInUp" data-group="services">
				<div class="col-md-6 col-lg-12 col-xl-6">
					<button class="d-flex flex-row btn text-start p-0" id="btn_luas_wilayah">
					<div>
						<div class="icon btn btn-circle btn-lg btn-soft-primary disabled me-5">
						<i class="uil uil-map"></i>
						</div>
					</div>
					<div>
						<h4 class="mb-1 text-white">Luas Wilayah</h4>
						<h2 class="mb-0  text-white">{sum_luas_wilayah} Km<sup>2</sup></h2>
					</div>
					</button>
				</div>

				<!--/column -->
				<div class="col-md-6 col-lg-12 col-xl-6">
					<button class="d-flex flex-row btn text-start p-0" id="btn_penduduk">
					<div>
						<div class="icon btn btn-circle btn-lg btn-soft-primary disabled me-5">
						<i class="uil uil-users-alt"></i>
						</div>
					</div>
					<div>
						<h4 class="mb-1 text-white">Penduduk</h4>
						<h2 class="mb-0  text-white">{sum_penduduk} jiwa</h2>
					</div>

					</button>
				</div>
				<!--/column -->
				<div class="col-md-6 col-lg-12 col-xl-6">
					<button class="d-flex flex-row btn text-start p-0" id="btn_faskes">
					<div>
						<div class="icon btn btn-circle btn-lg btn-soft-primary disabled me-5">
						<i class="uil uil-hospital"></i>
						</div>
					</div>
					<div>
						<h4 class="mb-1 text-white">Fasilitas Kesehatan</h4>
						<h2 class="mb-0  text-white">{ sum_infrastruktur_kesehatan }</h2>
					</div>

					</button>
				</div>
				<!--/column -->
				<div class="col-md-6 col-lg-12 col-xl-6">
					<button class="d-flex flex-row btn text-start p-0" id="btn_tempat_ibadah">
					<div>
						<div class="icon btn btn-circle btn-lg btn-soft-primary disabled me-5">
						<i class="uil uil-moon"></i>
						</div>
					</div>
					<div>
						<h4 class="mb-1 text-white">Tempat Ibadah</h4>
						<h2 class="mb-0  text-white">{ sum_infrastruktur_ibadah }</h2>
					</div>
					</button>
				</div>
				</div>
			</div>
		</div>
	</div>
</section>