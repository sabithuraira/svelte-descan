<script>
  // @ts-nocheck
  import { informasiKomunikasiInformasi } from "../../stores/infraKomunikasiInformasiStores";

  let definisi_variabel = [
    {
      nama_variabel:
        "Keberadaan internet untuk warnet, game online, dan fasilitas lainnya",
      nilai: { 1: "Ada", 2: "Tidak Ada" },
    },
    {
      nama_variabel:
        "Sinyal internet telepon seluler handphone di sebagian besar",
      nilai: {
        1: "4G/LTE",
        2: "3G/H/H+/EVDO",
        3: "2,5G/E/GPRS",
        4: "Tidak ada sinyal internet",
      },
    },
    {
      nama_variabel:
        "Keberadaan internet untuk warnet, game online, dan fasilitas lainnya",
      nilai: {
        1: "Berfungsi",
        2: "Jarang berfungsi",
        3: "Tidak berfungsi",
        4: "Tidak ada",
      },
    },
  ];

  const judul = "Sarana Komunikasi dan Informasi";

  let rekapContent = [];

  informasiKomunikasiInformasi.subscribe((value) => {
    if (value) {
      rekapContent = definisi_variabel.map((v) => ({
        label: v.nama_variabel,
        nilai:
          v.nilai[
            value.find((n) => n.nama_variabel == v.nama_variabel)
              ? value.find((n) => n.nama_variabel == v.nama_variabel).nilai
              : ""
          ],
      }));
    }
  });
</script>

<section class="wrapper bg-light">
  <div class="container py-6">
    <div class="row text-center">
      <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <h3 class="display-4 mb-4 px-xl-10">{judul}</h3>
      </div>
    </div>
    <div class="row gx-md-5 gy-5 text-center d-flex justify-content-center">
      {#each rekapContent as item}
        <div class="col-md-6 col-xl-3">
          <div class="card shadow-lg">
            <div class="card-body">
              <span
                class="icon btn rounded-pill btn-lg btn-outline-primary disabled"
              >
                <span class="number">{item.nilai}</span>
              </span>
              <p class="my-2">{item.label}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
