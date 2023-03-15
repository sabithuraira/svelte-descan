<script>
  // @ts-nocheck
  import { informasiPemerintahan } from "../../stores/infraPemerintahanStores";
  import { labelOption } from "../../helper/labelOption";
  import { setMapData } from "../../helper/mapConfiguration";
  import Maps from "../modals/Maps.svelte";

  const judul = "Sarana Pemerintahan";

  let rekapContent = [];

  informasiPemerintahan.subscribe((value) => {
    if (value) {
      console.log(value)
      rekapContent = value.map((v) => ({
        label: v.nama_variabel,
        nilai: labelOption(v.deskripsi_variabel, v.nilai),
        data: v,
      }));
    }
  });
</script>

<Maps />

<section class="wrapper bg-light">
  <div class="container py-6">
    <div class="row text-center">
      <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <h3 class="display-4 mb-4 px-xl-10">{judul}</h3>
      </div>
    </div>
    <div class="row gx-md-5 gy-5 text-center d-flex justify-content-center">
      {#each rekapContent as item}
        <div class="col-md-6 col-xl-3 d-flex align-items-stretch">
          <div class="card shadow-lg w-100">
            <div class="card-body">
              <span
                class="icon btn rounded-pill btn-lg btn-outline-primary"
                on:click={setMapData(
                  item.data.variabel_id,
                  item.data.kode_prov,
                  item.data.kode_kab,
                  item.data.kode_kec,
                  item.data.kode_desa,
                  item.data.nilai
                )}
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
