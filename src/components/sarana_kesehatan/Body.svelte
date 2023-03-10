<script>
	// @ts-nocheck
	import { infoWilayah } from '../../stores/wilayahStores';
	import { labelLevel } from '../../helper/labelWilayah';
	import { infrastrukturKesehatan, dataKesehatan } from '../../stores/infraKesehatanStores';

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

	let infrastruktur_kesehatan = [];
	let sum_infrastruktur_kesehatan = 0;
	let sarana_ukbm = [];
	let sum_sarana_ukbm = 0;
	let tenaga_kesehatan = [];
	let sum_tenaga_kesehatan = 0;
	let klb = [];
	let sum_klb = 0;

	let rekapContent = [];

	infoWilayah.subscribe((value) => {
		if (value.kode_wilayah) {
			info_wilayah = value;
		}
	});

	infrastrukturKesehatan.subscribe((value) => {
		if (value.length>0) {
			infrastruktur_kesehatan = value;
			sum_infrastruktur_kesehatan = value.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
			rekapContent.push({
				total: sum_infrastruktur_kesehatan,
				label: 'Sarana Kesehatan',
				deskripsi: 'Mencakup sarana seperti Rumah Sakit, Puskesmas, Rumah Bersalin, dan lain sebagainya.'
			});
		}
	});

	dataKesehatan.subscribe((value) => {
		if (value.saranaUkbm.length>0) {
			sarana_ukbm = value.saranaUkbm;
			sum_sarana_ukbm = value.saranaUkbm.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
			tenaga_kesehatan = value.tenagaKesehatan;
			sum_tenaga_kesehatan = value.tenagaKesehatan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
			klb= value.klb;
			sum_klb = value.klb.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);

			rekapContent.push(
				{
					total: sum_tenaga_kesehatan,
					label: 'Tenaga Kesehatan',
					deskripsi: 'Jumlah tenaga kesehatan yang tinggal/menetap mencakup dokter, bidan, dokter gigi dan lain sebagainya.'
				},
				{
					total: sum_sarana_ukbm,
					label: 'Upaya Kesehatan Bersumberdaya Masyarakat (UKBM)',
					deskripsi: 'Mencakup sarana seperti Rumah Sakit, Puskesmas, Rumah Bersalin, dan lain sebagainya'
				},
				{
					total: sum_klb,
					label: 'Kejadian Luar Biasa',
					deskripsi: 'KLB atau wabah penyakit yang terjadi pada desa ini satu tahun terakhir'
				},
			);

			
		}
	});

</script>

<section class="wrapper bg-light" id="section_rekap">
	<div class="container pt-1 pt-md-6">
		<div class="row text-center">
			<div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
				<h3 class="display-4 mb-0 px-xl-10">Sarana Kesehatan</h3>
			</div>
			<!-- /column -->
		</div>
	  <!-- /.row -->
	<div class="position-relative">
		<div class="shape rounded-circle bg-soft-blue rellax w-16 h-16" data-rellax-speed="1" style="bottom: -0.5rem; right: -2.2rem; z-index: 0;"></div>
			<div class="shape bg-dot primary rellax w-16 h-17" data-rellax-speed="1" style="top: -0.5rem; left: -2.5rem; z-index: 0;"></div>
				<div class="row gx-md-5 gy-5 text-center">
					{#each rekapContent as item}
						<div class="col-md-6 col-xl-3">
							<div class="card shadow-lg">
								<div class="card-body">
									<span class="icon btn btn-circle btn-lg btn-soft-primary disabled">
										<span class="number">{ item.total }</span>
									</span>
									<h3 class="mt-2">{item.label}</h3>
									<p class="mb-2">{ item.deskripsi }</p>
								</div>
							</div>
						</div>
					{/each}
				<!--/column -->
			</div>
			<!--/.row -->
		</div>
	  <!-- /.position-relative -->
	</div>
	<!-- /.container -->
</section>

<section class="wrapper bg-light" id="section_faskes">
	<div class="container py-5">
		<div class="row">
			<div class="col-lg-12 ">
				<h2 class="display-4 mb-4">
					<span class="text-primary m-2">
						<i class="fa-solid fa-hospital"></i>
					</span>
					Fasilitas Kesehatan
				</h2>

				<ul class="icon-list mb-0">
					<div class="row gy-3 gx-xl-8">
						{#each infrastruktur_kesehatan as item, i}
							<div class="col-12 col-md-6 col-xl-4">
								<li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }">
									<i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>
									{#if ((item.nilai!=0 && item.nilai!=null)) }
										{item.nilai} unit
									{/if}
									{ item.nama_variabel.replace("Jumlah", "") }
								</li>
							</div>
						{/each}
					</div>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="wrapper bg-light" id="section_tenaga_kesehatan">
	<div class="container py-5">
		<div class="row">
			<div class="col-lg-12 ">
				<h2 class="display-5 mb-4">
					<span class="text-primary m-2">
						<i class="fa-solid fa-hospital"></i>
					</span>
					Tenaga Kesehatan yang tinggal/menetap di wilayah ini
				</h2>

				<ul class="icon-list mb-0">
					<div class="row gy-3 gx-xl-8">
						{#each tenaga_kesehatan as item, i}
							<div class="col-12 col-md-6 col-xl-4">
								<li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }">
									<i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>
									{#if ((item.nilai!=0 && item.nilai!=null)) }
										{item.nilai} orang
									{/if}
									{ item.nama_variabel.replace("Jumlah", "").replace("yang tinggal menetap", "") }
								</li>
							</div>
						{/each}
					</div>
				</ul>
			</div>
		</div>
	</div>
</section>


<section class="wrapper bg-light" id="section_ukbm">
	<div class="container py-5">
		<div class="row">
			<div class="col-lg-12 ">
				<h2 class="display-5 mb-4">
					<span class="text-primary m-2">
						<i class="fa-solid fa-hospital"></i>
					</span>
					Upaya Kesehatan Bersumberdaya Masyarakat (UKBM)
				</h2>

				<ul class="icon-list mb-0">
					<div class="row gy-3 gx-xl-8">
						{#each sarana_ukbm as item, i}
							<div class="col-12 col-md-6 col-xl-4">
								<li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }">
									<i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>
									{#if ((item.nilai!=0 && item.nilai!=null)) }
										{item.nilai} unit 
									{/if}
									{ item.nama_variabel.replace("Jumlah", "").replace("yang tinggal menetap", "") }
								</li>
							</div>
						{/each}
					</div>
				</ul>
			</div>
		</div>
	</div>
</section>


<section class="wrapper bg-light" id="section_klb">
	<div class="container py-5">
		<div class="row">
			<div class="col-lg-12 ">
				<h2 class="display-5 mb-4">
					<span class="text-primary m-2">
						<i class="fa-solid fa-hospital"></i>
					</span>
					Kejadian Luar Biasa (KLB) atau Wabah Penyakit
				</h2>

				<ul class="icon-list mb-0">
					<div class="row gy-3 gx-xl-8">
						{#each klb as item, i}
							<div class="col-12 col-md-6 col-xl-4">
								<li class=" icon-list bullet-bg { (item.nilai==2 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }">
									<i class="uil uil-{ (item.nilai==2 || item.nilai==null) ? 'multiply' : 'check' }"></i>
									{ item.nama_variabel.replace("Jumlah", "").replace("yang tinggal menetap", "") }
								</li>
							</div>
						{/each}
					</div>
				</ul>
			</div>
		</div>
	</div>
</section>