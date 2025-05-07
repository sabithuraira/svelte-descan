<script>
// @ts-nocheck
	import { labelLevel, labelKepalaWilayah } from '../../helper/labelWilayah';
	import { goto } from '$app/navigation';

  export let infoWilayah, deskripsi, monografData, umkmData, infrastrukturKesehatan, pengurus;

  let sum_infrastruktur_ibadah = monografData.jumlah_infrastruktur_ibadah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  let sum_infrastruktur_pendidikan = monografData.jumlah_infrastruktur_pendidikan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  let sum_infrastruktur_ekonomi = monografData.jumlah_infrastruktur_ekonomi.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  let sum_lembaga_keuangan = monografData.jumlah_lembaga_keuangan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  let sum_penduduk = monografData.jumlah_penduduk.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  let sum_keluarga = monografData.jumlah_keluarga.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  let sum_luas_wilayah = monografData.luas_wilayah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  let sum_penyandang_disabilitas = monografData.penyandang_disabilitas.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

  let contentProfile = [
    { label: "Luas Wilayah", value: `${sum_luas_wilayah} Km<sup>2</sup>`, icon: "map", url:`/topografi/${infoWilayah.kode_wilayah}`},
    { label: "Penduduk", value: sum_penduduk, icon: "user", url: `/penduduk/${infoWilayah.kode_wilayah}`},
    { label: "Keluarga", value: sum_keluarga, icon: "users-alt", url: `/keluarga/${infoWilayah.kode_wilayah}`},
    { label: "Tempat Ibadah", value: sum_infrastruktur_ibadah, icon: "moon", url:"#"}, 
    { label: "Fasilitas Pendidikan", value: sum_infrastruktur_pendidikan, icon: "book", url:"#"}, 
    { label: "Fasilitas Ekonomi", value: sum_infrastruktur_ekonomi, icon: "store", url:"#"}, 
    { label: "Penyandang Disabilitas", value: sum_penyandang_disabilitas, icon: "wheelchair", url:"#"}, 
  ];

  let sum_industri = umkmData.industri.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  contentProfile.push(
    { label: "Industri Mikro & Kecil", value: sum_industri, icon: "building", url:`/umkm/${infoWilayah.kode_wilayah}`}, 
  );

  let sum_infrastruktur_kesehatan = infrastrukturKesehatan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
  contentProfile.push(
    { label: "Fasilitas Kesehatan", value: sum_infrastruktur_kesehatan, icon: "hospital", url:`/sarana_kesehatan/${infoWilayah.kode_wilayah}`}
  );
</script>

<section class="wrapper image-wrapper bg-image bg-overlay bg-overlay-900 bg-overlay-900 "
	data-image-src="/images/img/desa/desa_3.jpg">
	<div class="container pt-6 pt-md-15 pb-8">
		<div class="row gx-lg-8 gy-8 mt-5 mt-md-12 mt-lg-0 mb-8 align-items-center">
			<div class="col-lg-3 order-lg-2">
				<div class="row gx-md-5 gy-5 text-center" data-cues="fadeIn" data-group="images">
					{#if pengurus.path_foto != '' && pengurus.path_foto != null && pengurus.path_foto != 'null'}
						<figure class="rounded mx-4 text-center">
							<img src="{pengurus.foto}"
							srcset="{pengurus.foto} 2x" alt=""
							style="max-height: 300px; max-width: 200px;  height:100% ; width: 100%;">
						</figure>

						<div class="card mx-4">
							<h4 class="mb-0 text-nowrap">
								{labelKepalaWilayah(infoWilayah.kode_wilayah)}
							</h4>
							<p class="fs-14 mb-0">{pengurus.nama_ketua}</p>
						</div>
						  <!-- /section -->
					{:else}
						{#if infoWilayah.kode_kab!=''}
						<figure class="rounded mx-4">
							<img src="/images/kabs-logo/logo{infoWilayah.kode_prov+infoWilayah.kode_kab}.png"
							srcset="/images/kabs-logo/logo{infoWilayah.kode_prov+infoWilayah.kode_kab}.png 2x" alt=""
							style="max-height: 300px; max-width: 200px;  height:100% ; width: 100%;">
						</figure>
						{/if}
					{/if}
				</div>
			</div>

			<div class="col-lg-9 text-white">
				<h1 class="display-1 text-white" style="display: inline-block;" id="desa_text">
					{labelLevel(infoWilayah.kode_wilayah)}
					<span class="typer text-white" data-words={infoWilayah.nama} data-loop="false"/>
					<span class="cursor text-white" data-owner="typer" />
				</h1>
				
				<p class="lead fs-lg mb-8 pe-xxl-2">{ deskripsi }</p>
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
