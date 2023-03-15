<script>
  // @ts-nocheck
  import {
    informasiInternet,
    menaraBTS,
    operatorSeluler,
    kantorPos,
    keberadaanSiaran,
    keluargaTeleponKabel,
    sinyalTelepon,
  } from "../../stores/infraKomunikasiInformasiStores";
  import { labelOption } from "../../helper/labelOption";

  let rekapContent = {
    informasiInternet: {},
    menaraBTS: {},
    operatorSeluler: {},
    kantorPos: {},
    keberadaanSiaran: {},
    keluargaTeleponKabel: {},
    sinyalTelepon: {},
  };

  informasiInternet.subscribe((value) => {
    if (value) {
      rekapContent.informasiInternet.judul = "Informasi Internet";
      rekapContent.informasiInternet.data = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
      }));
    }
  });

  menaraBTS.subscribe((value) => {
    if (value) {
      rekapContent.menaraBTS.judul = "Menara BTS";
      rekapContent.menaraBTS.data = value.map((v) => ({
        label:
          v.nama_variabel.replace("Jumlah ", "").charAt(0).toUpperCase() +
          v.nama_variabel.replace("Jumlah ", "").slice(1),
        nilai: v.nilai == 0 ? "Tidak Ada" : v.nilai + " Unit",
      }));
    }
  });

  operatorSeluler.subscribe((value) => {
    if (value) {
      rekapContent.operatorSeluler.judul = "Operator Seluler";
      rekapContent.operatorSeluler.data = value.map((v) => ({
        label:
          v.nama_variabel.replace("Jumlah ", "").charAt(0).toUpperCase() +
          v.nama_variabel.replace("Jumlah ", "").slice(1),
        nilai: v.nilai == 0 ? "Tidak Ada" : v.nilai + " Operator",
      }));
    }
  });

  kantorPos.subscribe((value) => {
    if (value) {
      rekapContent.kantorPos.judul = "Kantor Pos";
      rekapContent.kantorPos.data = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
      }));
    }
  });

  keberadaanSiaran.subscribe((value) => {
    if (value) {
      rekapContent.keberadaanSiaran.judul = "Siaran";
      rekapContent.keberadaanSiaran.data = value.map((v) => ({
        label:
          v.nama_variabel
            .replace("Program siaran televisi: ", "")
            .charAt(0)
            .toUpperCase() +
          v.nama_variabel.replace("Program siaran televisi: ", "").slice(1),
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
      }));
    }
  });

  keluargaTeleponKabel.subscribe((value) => {
    if (value) {
      rekapContent.keluargaTeleponKabel.judul = "Telepon Kabel";
      rekapContent.keluargaTeleponKabel.data = value.map((v) => ({
        label:
          v.nama_variabel.replace("Jumlah ", "").charAt(0).toUpperCase() +
          v.nama_variabel.replace("Jumlah ", "").slice(1),
        nilai: v.nilai == 0 ? "Tidak Ada" : v.nilai + " Keluarga",
      }));
    }
  });

  sinyalTelepon.subscribe((value) => {
    if (value) {
      rekapContent.sinyalTelepon.judul = "Sinyal Telepon";
      rekapContent.sinyalTelepon.data = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
      }));
    }
  });
</script>

{#each Object.entries(rekapContent) as [_, rekap]}
  <section class="wrapper bg-light">
    <div class="container py-6">
      <div class="row text-center">
        <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <h3 class="display-4 mb-4 px-xl-10">{rekap.judul}</h3>
        </div>
      </div>
      <div class="row gx-md-5 gy-5 text-center d-flex justify-content-center">
        {#each rekap.data as data}
          <div class="col-md-6 col-xl-3 d-flex align-items-stretch">
            <div class="card shadow-lg w-100">
              <div class="card-body">
                <span
                  class="icon btn rounded-pill btn-lg btn-outline-primary disabled"
                >
                  <span class="number">{data.nilai}</span>
                </span>
                <p class="my-2">{data.label}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
{/each}
