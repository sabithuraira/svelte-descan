<script>
  // @ts-nocheck
  	import { infoWilayah, deskripsi } from "../../stores/wilayahStores";
	import { pengurusLast } from '../../stores/pengurusStores';
	import { labelLevel, labelKepalaWilayah } from '../../helper/labelWilayah';

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
</script>

<section
  class="wrapper image-wrapper bg-image bg-overlay bg-overlay-900 bg-overlay-900 "
  data-image-src="/images/img/desa/desa_3.jpg"
>
	<div class="container pt-2 pt-md-15 pb-2">
		<div class="row gx-lg-8 gy-8 mt-1 mt-md-12 mt-lg-0 mb-1 align-items-center">
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
				<div data-cues="slideInDown" data-group="page-title">
				<h1
					class="display-1 text-white"
					style="display: inline-block;"
					id="desa_text"
				>
					{labelLevel(info_wilayah.kode_wilayah)}

					<span
					class="typer text-white"
					data-words={info_wilayah.nama}
					data-loop="false"
					/>
					<span class="cursor text-white" data-owner="typer" />
				</h1>
				<div data-cues="slideInDown" data-group="page-title">
					<p
					class="lead fs-24 lh-sm text-white mb-1"
					style="min-height: 280px;"
					>
					{$deskripsi}
					</p>
				</div>
				</div>
			</div>
		</div>
	</div>
</section>
