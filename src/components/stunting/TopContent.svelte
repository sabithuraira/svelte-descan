<script>
	import { infoWilayah, parentWilayah, childWilayah } from '../../stores/wilayahStores';

	let info_wilayah = null;

	infoWilayah.subscribe((value) => {
		info_wilayah = value;
	});
</script>

<section class="wrapper image-wrapper bg-image bg-overlay bg-overlay-900 bg-overlay-900"
	data-image-src="/images/img/desa/desa_1.jpg">
	<div class="container pt-6 pt-md-15 pb-8">
		<div class="row gx-lg-8 gy-8 mt-5 mt-md-12 mt-lg-0 mb-8 align-items-center">
			<div class="col-lg-6 order-lg-2">
			<div class="row gx-md-5 gy-5" data-cues="fadeIn" data-group="images">
				<div class="col-md-6 text-center">
				<figure class="rounded mx-4">
					<img
					src="/images/prov-logo/prov_logo.png"
					srcset="/images/prov-logo/prov_logo.png 2x"
					alt=""
					style="
						max-height: 300px;
						max-width: 200px;
						height: 100%;
						width: 100%;
					"
					/>
				</figure>
				</div>
				<div class="col-md-6 text-center">
					{#if info_wilayah.kode_kab}
					<figure class="rounded mx-4"><img src="/images/kabs-logo/logo{info_wilayah.kode_prov+info_wilayah.kode_kab}.png"
						srcset="/images/kabs-logo/logo{info_wilayah.kode_prov+info_wilayah.kode_kab}.png 2x" alt=""
						style="max-height: 300px; max-width: 200px;  height:100% ; width: 100%;"></figure>
					{/if}
				</div>
			</div>
			</div>
			<div class="col-lg-6 text-white">
			<div
				data-cues="slideInDown"
				data-group="page-title"
				data-delay="600"
			>
				<h1 class="display-1 text-white mb-4">{ info_wilayah.nama }
				</h1>
				<p class="lead fs-24 lh-sm text-white mb-7">
				Desa Penghasil Karet Terbanyak di Kabupaten Ogan Komering Ulu
				</p>
			</div>
			</div>
		</div>
	</div>
</section>