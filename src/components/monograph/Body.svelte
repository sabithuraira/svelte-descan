<script>
// @ts-nocheck
 	import axios from 'axios'
	import { urlApi } from '../../stores/generalStores';
	import { infoWilayah, parentWilayah, childWilayah } from '../../stores/wilayahStores';
	import { monografData } from '../../stores/monografStores';
	import { infrastrukturKesehatan } from '../../stores/infraKesehatanStores';
	import { pengurusLast } from '../../stores/pengurusStores';
	import { labelKepalaWilayah } from '../../helper/labelWilayah';
  import Peta from './Peta.svelte';
  import { utils, writeFile } from 'xlsx';

  let desa = [];

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
  let info_wilayah_loaded = false;

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

	let infrastruktur_olahraga = [];

	let penduduk = [];

  let sum_infrastruktur_ibadah = 0;

  let sum_infrastruktur_pendidikan = 0;

  let sum_infrastruktur_ekonomi = 0;

  let sum_lembaga_keuangan = 0;

	let sum_infrastruktur_olahraga = 0;

  let sum_penduduk = 0;

  let sum_keluarga = 0;

  let sum_luas_wilayah = 0;

  let sum_penyandang_disabilitas = 0;

	infoWilayah.subscribe((value) => {
		if (value.kode_wilayah) {
			info_wilayah = value;
      info_wilayah_loaded = true;
      loadOtherDesa();
		}
	});

	monografData.subscribe((value) => {
		infrastruktur_ibadah = value.jumlah_infrastruktur_ibadah.sort((a,b) => { return b.nilai - a.nilai; });	
		infrastruktur_pendidikan = value.jumlah_infrastruktur_pendidikan.sort((a,b) => { return Number(a.variabel_id) - Number(b.variabel_id); }).sort((a,b) => { return b.nilai - a.nilai; });
		infrastruktur_ekonomi = value.jumlah_infrastruktur_ekonomi.sort((a,b) => { return b.nilai - a.nilai; });
		lembaga_keuangan = value.jumlah_lembaga_keuangan.sort((a,b) => { return b.nilai - a.nilai; });
		infrastruktur_olahraga = value.jumlah_infrastruktur_olahraga.map((item) => {
      let kondisi = '';
      if (Number(item.nilai) == 1) {
        kondisi = 'baik';
      } else if (Number(item.nilai) == 2) {
        kondisi = 'rusak sedang';
      } else if (Number(item.nilai) == 3) {
        kondisi = 'rusak parah';
      } else {
        kondisi = '';
      }
      return { ...item, kondisi: kondisi }; 
    }).sort((a,b) => { return a.nilai - b.nilai; });
		penduduk = value.jumlah_penduduk.sort((a,b) => { return b.nilai - a.nilai; });
		sum_infrastruktur_ibadah = value.jumlah_infrastruktur_ibadah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_infrastruktur_pendidikan = value.jumlah_infrastruktur_pendidikan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_infrastruktur_ekonomi = value.jumlah_infrastruktur_ekonomi.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_lembaga_keuangan = value.jumlah_lembaga_keuangan.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_infrastruktur_olahraga = value.jumlah_infrastruktur_olahraga.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_penduduk = value.jumlah_penduduk.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_keluarga = value.jumlah_keluarga.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_luas_wilayah = value.luas_wilayah.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
		sum_penyandang_disabilitas = value.penyandang_disabilitas.reduce((acc,item) => { return acc + Number(item.nilai); }, 0);
	});

	pengurusLast.subscribe((value) => {
		pengurus = value;
	});

	infrastrukturKesehatan.subscribe((value) => {	
		infrastruktur_kesehatan = value.sort((a,b) => { return b.nilai - a.nilai; });
	});

  let content = "";

  function downloadPDF(){
    setTimeout(() => {
      html2pdf(content, {
        filename: `${info_wilayah.nama}.pdf`,
        pagebreak: { mode: "avoid-all" },
        jsPDF: { format: "legal", orientation: "landscape" },
      });
    }, 500);
  }

  function downloadExcel() {
    let rows = [];
    rows.push({
      variabel: "Luas Wilayah",
      niai: sum_luas_wilayah,
    });
    rows.push({
      variabel: "Jumlah Penduduk",
      niai: sum_penduduk,
    });
    rows.push({
      variabel: "Jumlah Keluarga",
      niai: sum_keluarga,
    });
    rows.push({
      variabel: "Jumlah Tempat Ibadah",
      niai: sum_infrastruktur_ibadah,
    });
    rows.push({
      variabel: "Jumlah Fasilitas Pendidikan",
      niai: sum_infrastruktur_pendidikan,
    });
    rows.push({
      variabel: "Jumlah Fasilitas Ekonomi",
      niai: sum_infrastruktur_ekonomi,
    });
    rows.push({
      variabel: "Jumlah Penyandang Disabilitas",
      niai: sum_penyandang_disabilitas,
    });
    rows.push({
      variabel: penduduk[0].nama_variabel,
      niai: penduduk[0].nilai,
    });
    rows.push({
      variabel: penduduk[1].nama_variabel,
      niai: penduduk[1].nilai,
    });
    infrastruktur_kesehatan.forEach((item) => {
      rows.push({
        variabel: item.nama_variabel,
        niai: item.nilai,
      });
    });
    infrastruktur_ibadah.forEach((item) => {
      rows.push({
        variabel: item.nama_variabel,
        niai: item.nilai,
      });
    });
    infrastruktur_pendidikan.forEach((item) => {
      rows.push({
        variabel: item.nama_variabel,
        niai: item.nilai,
      });
    });
    lembaga_keuangan.forEach((item) => {
      rows.push({
        variabel: item.nama_variabel,
        niai: item.nilai,
      });
    });
    infrastruktur_ekonomi.forEach((item) => {
      rows.push({
        variabel: item.nama_variabel,
        niai: item.nilai,
      });
    });

    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const max_width = rows.reduce((w, r) => Math.max(w, r.variabel.length), 30);
    worksheet["!cols"] = [ { wch: max_width } ];
    writeFile(workbook, `${info_wilayah.nama}.xlsx`);
  } 

	async function loadOtherDesa(){
		await axios
			.get(`${$urlApi}wilayah/${info_wilayah.kode_prov}${info_wilayah.kode_kab}${info_wilayah.kode_kec}`)
			.then(({data})=>{
				desa = data.datas;
        desa = desa.filter((item) => item.kode_wilayah != info_wilayah.kode_wilayah);
			}).catch(({ response })=>{
				console.error(response);
			});
	}
</script>

<section class="wrapper bg-light" id="section_download">
  <div class="container pt-8">
    <div class="d-flex flex-row-reverse">
      <a href="" class="btn mx-1 text-white" style="background-color: #943126;" data-bs-toggle="modal" data-bs-target="#modalDownload">Download</a>
    </div>
  </div>
</section>

<div bind:this={content}>
  {#if info_wilayah_loaded}
    <section class="wrapper bg-light" id="section_peta">
      <div class="container py-5">
        <Peta infoWilayah={ info_wilayah } />
      </div>
    </section>
  {/if}

  <section class="wrapper bg-light" id="section_data">
    <div class="container py-5">
      <ul class="nav nav-tabs" id="dataTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="penduduk-tab" data-bs-toggle="tab" data-bs-target="#penduduk" type="button" role="tab" aria-controls="penduduk" aria-selected="true">Penduduk</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="kesehatan-tab" data-bs-toggle="tab" data-bs-target="#kesehatan" type="button" role="tab" aria-controls="kesehatan" aria-selected="false">Kesehatan</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="peribadatan-tab" data-bs-toggle="tab" data-bs-target="#peribadatan" type="button" role="tab" aria-controls="peribadatan" aria-selected="false">Peribadatan</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="pendidikan-tab" data-bs-toggle="tab" data-bs-target="#pendidikan" type="button" role="tab" aria-controls="pendidikan" aria-selected="false">Pendidikan</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="keuangan_ekonomi-tab" data-bs-toggle="tab" data-bs-target="#keuangan_ekonomi" type="button" role="tab" aria-controls="keuangan_ekonomi" aria-selected="false">Keuangan dan Ekonomi</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="olahraga-tab" data-bs-toggle="tab" data-bs-target="#olahraga" type="button" role="tab" aria-controls="olahraga" aria-selected="false">Olahraga</button>
        </li>
      </ul>
    </div>
  </section>

  <div class="tab-content mb-8" id="dataTabContent">
    <div class="tab-pane fade show active" id="penduduk" role="tabpanel" aria-labelledby="penduduk-tab">
      <section class="wrapper bg-light" id="section_penduduk">
        <div class="container py-5">
          <div class="row gx-lg-8 gx-xl-12 gy-10 align-items-center">

            <div class="col-md-8 col-lg-6 col-xl-6 order-lg-2 position-relative">
              <div class="row gx-md-5 gy-5 align-items-center">
                <div class="col-6 text-center">
                  <img class="img-fluid" src="/images/img/illustrations/i1.png"
                  srcset="/images/img/illustrations/i1@2x.png 2x" alt="" style="height:200px; width: auto;" />
                  <h2 class="display-5">Laki-Laki</h2>
                  <h1 style="color: #943126;">
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
                  <h2 class="display-5">Perempuan</h2>
                  <h1 style="color: #943126;">
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
              <h2 class="display-4 mb-3" style="color:#943126;">Penduduk</h2>
              <p class="lead fs-lg">Jumlah Penduduk di { info_wilayah.nama } sebanyak 
              <span class="fs-30" style="color:#943126;">{ sum_penduduk }</span> jiwa</p>

              <p class="mb-6">Karakteristik penduduk di Desa/Kelurahan { info_wilayah.nama } cenderung <b>didominasi</b> oleh
                {#if penduduk[0].nilai > penduduk[1].nilai}
                  <span style="color:#943126;">laki-laki</span>
                {:else}
                  <span style="color:#943126;">perempuan</span>.
                {/if}
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </div>

    <div class="tab-pane fade" id="kesehatan" role="tabpanel" aria-labelledby="kesehatan-tab">
      <section class="wrapper bg-light" id="section_kesehatan">
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
                <i class="font-italic ml-2">Mens Sana In Corpore Sano – Didalam Tubuh Yang Sehat Terdapat Jiwa Yang Kuat</i>
                <i class="fa fa-quote-right text-black"></i>
              </div>

              <p class="lead fs-lg mb-5 text-center">
                Berikut adalah daftar ketersediaan fasilitas kesehatan di { info_wilayah.nama }
              </p>

              <ul class="icon-list mb-0">
                <div class="row gy-3 gx-xl-8">
                  {#each infrastruktur_kesehatan as item, i}
                    <div class="col-12 col-md-6 col-xl-4">
                      <li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Sumber: { (item.sumber=='' || item.sumber==null) ? '-' : item.sumber }">
                        <i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>{ (item.nilai==0 || item.nilai==null) ? item.nama_variabel.replace("Jumlah", "") : `${item.nilai} ${item.nama_variabel.replace("Jumlah", "")}` }
                      </li>
                    </div>
                  {/each}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="tab-pane fade" id="peribadatan" role="tabpanel" aria-labelledby="peribadatan-tab">
      <section class="wrapper bg-light" id="section_peribadatan">
        <div class="container py-5">
          <div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 ">

            <div class="col-12 text-center mb-8">
              <h3 class="display-4 mb-3 pe-xl-10">Fasilitas Peribadatan</h3>
              <p class="mb-0 pe-xxl-10">
                {#if infrastruktur_ibadah.length>0}
                  {metadataIbadah(infrastruktur_ibadah[0].nama_variabel).label} menjadi fasilitas ibadah terbanyak di { info_wilayah.nama }
                {/if}
              </p>
            </div>

            <div class="col-12">
              <div class="row align-items-center justify-content-center counter-wrapper gy-6 text-center">
                {#each infrastruktur_ibadah as item}
                  <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Sumber: { (item.sumber=='' || item.sumber==null) ? '-' : item.sumber }">
                        <span class="text-primary">
                        <i class="fa-solid fa-{metadataIbadah(item.nama_variabel).logo} fa-4x mb-2" width="70px"></i>
                        </span>
                        <h3 class="counter">{ item.nilai }</h3>
                        <p class="text-navy">{metadataIbadah(item.nama_variabel).label}</p>
                      </div>
                  </div>
                {/each}
              </div>
            </div>
            <!-- /.row -->
        </div>
      </section>
    </div>

    <div class="tab-pane fade show" id="pendidikan" role="tabpanel" aria-labelledby="pendidikan-tab">
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
                <i class="font-italic ml-2">Pendidikan mempunyai akar yang pahit, tapi buahnya manis</i>
                <i class="fa fa-quote-right text-black"></i>
              </div>

              <p class="lead fs-lg mb-5 text-center"> 
                Berikut adalah daftar ketersediaan fasilitas pendidikan di { info_wilayah.nama }
              </p>

              <ul class="icon-list mb-0">
                <div class="row gy-4 gx-xl-12">
                  {#each infrastruktur_pendidikan as item}
                    <div class="col-12 col-md-6 col-xl-4">
                      <li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Sumber: { (item.sumber=='' || item.sumber==null) ? '-' : item.sumber }">
                        <i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>{ (item.nilai==0 || item.nilai==null) ? item.nama_variabel.replace("Jumlah", "") : `${item.nilai} ${item.nama_variabel.replace("Jumlah", "")}` }
                      </li>
                    </div>
                  {/each}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="tab-pane fade" id="keuangan_ekonomi" role="tabpanel" aria-labelledby="keuangan_ekonomi-tab">
      <section class="wrapper bg-light" id="section_keuangan_ekonomi">
        <div class="container pt-5 my-3">
          <div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 align-items-center">
            <div class="col-lg-4 text-center text-lg-start">
              <h3 class="display-4 mb-3 pe-xxl-15">Infrastruktur Keuangan & Ekonomi</h3>
            </div>
            <!-- /column -->
            <div class="col-lg-8 mt-lg-2">
              <div class="row align-items-start justify-content-center counter-wrapper gy-6 text-center">

                {#each lembaga_keuangan as item}
                  <div class="col-md-4" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Sumber: { (item.sumber=='' || item.sumber==null) ? '-' : item.sumber }">
                    <h3 class="counter counter-lg">
                      {#if item.nilai!='' && item.nilai!=null}
                        {item.nilai}
                      {:else}
                        0
                      {/if}
                    </h3>
                    <p>{ item.nama_variabel.replace("Jumlah", "") }</p>
                  </div>
                {/each}
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
                      <li class=" icon-list bullet-bg { (item.nilai==0 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Sumber: { (item.sumber=='' || item.sumber==null) ? '-' : item.sumber }">
                        <i class="uil uil-{ (item.nilai==0 || item.nilai==null) ? 'multiply' : 'check' }"></i>{ (item.nilai==0 || item.nilai==null) ? item.nama_variabel.replace("Jumlah", "") : `${item.nilai} ${item.nama_variabel.replace("Jumlah", "")}` }
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
    </div>

    <div class="tab-pane fade" id="olahraga" role="tabpanel" aria-labelledby="olahraga-tab">
      <section class="wrapper bg-light" id="section_olahraga">
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-12 ">
              <h2 class="display-4 text-center">
                <span class="text-primary m-2">
                  <i class="fa-solid fa-running"></i>
                </span>
                Fasilitas Olahraga
              </h2>

              <div class="p-2 text-center mx-5">
                <i class="fa fa-quote-left text-black"></i>
                <i class="font-italic ml-2">Kita tidak berhenti berolahraga karena menjadi renta. Kita menjadi renta karena berhenti berolahraga</i>
                <i class="fa fa-quote-right text-black"></i>
              </div>

              <p class="lead fs-lg mb-5 text-center"> 
                Berikut adalah daftar ketersediaan fasilitas olahraga di { info_wilayah.nama }
              </p>

              <ul class="icon-list mb-0">
                <div class="row gy-4 gx-xl-12">
                  {#each infrastruktur_olahraga as item}
                    <div class="col-12 col-md-6 col-xl-4">
                      <li class=" icon-list bullet-bg { (item.nilai==4 || item.nilai==null) ? 'bullet-soft-red' : 'bullet-soft-green' }" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Sumber: { (item.sumber=='' || item.sumber==null) ? '-' : item.sumber }">
                        <i class="uil uil-{ (item.nilai==4 || item.nilai==null) ? 'multiply' : 'check' }"></i>{ (item.nilai==4 || item.nilai==null) ? item.nama_variabel.replace("Ketersediaan fasilitas lapangan: ", "") : `${item.nama_variabel.replace("Ketersediaan fasilitas lapangan: ", "")} (kondisi ${item.kondisi})` }
                      </li>
                    </div>
                  {/each}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div class="modal fade" id="modalDownload" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content text-center">
        <div class="modal-body">
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <p>Download halaman ini dengan format:</p>
          <a href="" class="btn text-white" style="background-color: #943126;" data-bs-dismiss="modal" on:click={downloadPDF}>PDF</a>
          <a href="" class="btn text-white" style="background-color: #943126;" data-bs-dismiss="modal" on:click={downloadExcel}>Excel</a>
        </div>
        <!--/.modal-body -->
      </div>
      <!--/.modal-content -->
    </div>
    <!--/.modal-dialog -->
  </div>
  <!--/.modal -->
  
  <section class="wrapper bg-light">
    <div class="container pb-14 pb-md-16">
      <div class="row mb-3">
        <div class="col-md-10 col-xl-9 col-xxl-7 mx-auto text-center">
          <h1 class="display-7 fs-40 fw-bold" style="color:#943126;">Jelajahi Desa Lainnya</h1>
          <p class="mb-4">Temukan keunikan dan potensi desa-desa di Sumatera Selatan</p>
        </div>
        <!--/column -->
      </div>
      <!--/.row -->
      <div class="position-relative">
        <div class="shape rounded-circle bg-soft-yellow rellax w-16 h-16" data-rellax-speed="1" style="bottom: 0.5rem; right: -1.7rem;"></div>
        <div class="shape rounded-circle bg-line red rellax w-16 h-16" data-rellax-speed="1" style="top: 0.5rem; left: -1.7rem;"></div>
        <div class="swiper-container dots-closer mb-6" data-margin="0" data-dots="true" data-items-xxl="4" data-items-lg="3" data-items-md="2" data-items-xs="1">
          <div class="swiper">
            <div class="swiper-wrapper align-items-center">
              {#each desa as item}
                <div class="swiper-slide">
                  <div class="item-inner">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="mb-2" style="color:#943126;">{item.nama}</h4>
                        <p class="mb-4">{item.deskripsi.slice(0, 200).split(' ').slice(0, -1).join(' ')} ...</p>
                        <a href="/monograph/{item.kode_wilayah}" class="btn btn-sm text-white" style="background-color:#943126;" on:click={() => goto(`/desa/${item.slug}`)}>Selengkapnya</a>
                      </div>
                      <!--/.card-body -->
                    </div>
                    <!-- /.card -->
                  </div>
                  <!-- /.item-inner -->
                </div>
                <!--/.swiper-slide -->
              {/each}
              <div class="swiper-slide">
                <div class="item-inner">
                  <a href="/search"><h2 class="mb-2" style="color:#943126;">Desa/Kelurahan Lainnya...</h2></a>
                </div>
                <!-- /.item-inner -->
              </div>
              <!--/.swiper-slide -->
            </div>
            <!--/.swiper-wrapper -->
          </div>
          <!-- /.swiper -->
        </div>
        <!-- /.swiper-container -->
      </div>
      <!-- /.position-relative -->
    </div>
    <!-- /.container -->
  </section>
  <!-- /section -->
</div>
