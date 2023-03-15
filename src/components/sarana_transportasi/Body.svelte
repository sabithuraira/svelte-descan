<script>
	// @ts-nocheck
	import { infrastrukturTransportasi } from '../../stores/infraTransportasiStores';
	import { labelOption } from "../../helper/labelOption";
	import Maps from '../modals/Maps.svelte';

	// $tags = ['sarana_transportasi', 'angkutan_umum'
    //                 ,'angkutan_umum_rutin', 'angkutan_umum_jam'];

	let infrastruktur_transportasi = {
		saranaTransportasi: {},
		angkutanUmum: {},
		angkutanUmumRutin: {},
		angkutanUmumJam: {},
	};
	let rekapContent = [];

	infrastrukturTransportasi.subscribe((value) => {
		if(value.angkutanUmum.nilai){
			infrastruktur_transportasi = value;
			rekapContent = [
				{
					total: labelOption(infrastruktur_transportasi.saranaTransportasi.deskripsi_variabel, infrastruktur_transportasi.saranaTransportasi.nilai),
					label: 'Lalu Lintas',
					deskripsi: 'Lalu lintas antar wilayah menggunakan'
				},
				{
					total: labelOption(infrastruktur_transportasi.angkutanUmum.deskripsi_variabel, infrastruktur_transportasi.angkutanUmum.nilai),
					label: 'Angkutan Umum',
					deskripsi: 'Keberadaan angkutan umum pada wilayah ini.'
				},
				{
					total: ((infrastruktur_transportasi.angkutanUmum.nilai!=3) ? labelOption(infrastruktur_transportasi.angkutanUmumRutin.deskripsi_variabel, infrastruktur_transportasi.angkutanUmumRutin.nilai) : "-"),
					label: 'Rutinitas Angkutan Umum',
					deskripsi: 'Jika memiliki keberadaan umum, seberapa rutin'
				},
				{
					total: ((infrastruktur_transportasi.angkutanUmum.nilai!=3) ? labelOption(infrastruktur_transportasi.angkutanUmumJam.deskripsi_variabel, infrastruktur_transportasi.angkutanUmumJam.nilai) : "-"),
					label: 'Jam Operasional',
					deskripsi: 'Jika memiliki keberadaan umum, kapan jam operasional angkutan umum utama'
				},
			];
		}
	});
</script>

<Maps />

<section class="wrapper bg-light" id="section_faskes">
	<div class="container pt-1 pt-md-6">
		<div class="row text-center">
			<div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
				<h3 class="display-4 mb-0 px-xl-10">Sarana Tranportasi</h3>
			</div>
		</div>

		<div class="row gx-md-5 gy-5 text-center">
			{#each rekapContent as item}
				<div class="col-md-6 col-xl-3">
					<div class="card shadow-lg">
						<div class="card-body">
							<span class="icon btn rounded-pill btn-lg btn-outline-primary disabled">
								<span class="number">{ item.total }</span>
							</span>
							<h3 class="mt-2">{item.label}</h3>
							<p class="mb-2">{ item.deskripsi }</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
