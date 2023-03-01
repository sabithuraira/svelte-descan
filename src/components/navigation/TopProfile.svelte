<script>
  // @ts-nocheck
  import { infoWilayah, deskripsi } from "../../stores/wilayahStores";

  const labelLevel = (kodeWilayah) => {
    switch (kodeWilayah.length) {
      case 10:
        return "Desa/Kelurahan";
        break;
      case 7:
        return "Kecamatan";
        break;
      case 4:
        return "Kabupaten/Kota";
        break;
      case 2:
        return "Provinsi";
        break;
      default:
        return "-";
        break;
    }
  };

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
</script>

<section
  class="wrapper image-wrapper bg-image bg-overlay bg-overlay-900 bg-overlay-900 "
  data-image-src="/images/img/desa/desa_3.jpg"
>
  <div class="container pt-2 pt-md-15 pb-2">
    <div class="row gx-lg-8 gy-8 mt-1 mt-md-12 mt-lg-0 mb-1 align-items-center">
      <div class="col-lg-6 order-lg-2">
        <div class="row gx-md-5 gy-5" data-cues="fadeIn" data-group="images">
          <div class="col-md-6 text-center ">
            <figure class="rounded mx-4">
              <img
                src="/images/prov-logo/prov_logo.png"
                srcset="/images/prov-logo/prov_logo.png 2x"
                alt=""
                style="max-height: 300px; max-width: 200px; height:100% ; width: 100%;"
              />
            </figure>
          </div>
          <div class="col-md-6 text-center ">
            {#if info_wilayah.kode_kab != ""}
              <figure class="rounded mx-4">
                <img
                  src="/images/kabs-logo/logo{info_wilayah.kode_prov +
                    info_wilayah.kode_kab}.png"
                  srcset="/images/kabs-logo/logo{info_wilayah.kode_prov +
                    info_wilayah.kode_kab}.png 2x"
                  alt=""
                  style="max-height: 300px; max-width: 200px;  height:100% ; width: 100%;"
                />
              </figure>
            {/if}
          </div>
        </div>
      </div>

      <div class="col-lg-6 text-white">
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
