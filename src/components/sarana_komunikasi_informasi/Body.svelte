<script>
  // @ts-nocheck
  import { informasiKomunikasiInformasi } from "../../stores/infraKomunikasiInformasiStores";
  import { labelOption } from "../../helper/labelOption";

  const judul = "Sarana Komunikasi dan Informasi";

  let rekapContent = [];

  informasiKomunikasiInformasi.subscribe((value) => {
    if (value) {
      rekapContent = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
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
