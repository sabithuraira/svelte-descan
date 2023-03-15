<script>
  // @ts-nocheck
  import { infrastrukturPendidikan } from "../../stores/infraPendidikanStores";
  import { setMapData } from "../../helper/mapConfiguration";
  import Maps from "../modals/Maps.svelte";

  let infrastruktur_pendidikan = [];
  let sum_infrastruktur_pendidikan = 0;
  const judul = "Sarana Pendidikan";

  $: rekapContent = [
    {
      total: sum_infrastruktur_pendidikan,
      label: "Infrastruktur Pendidikan",
      deskripsi:
        "Mencakup infrastruktur seperti SD, SMP, SMA, dan lain sebagainya.",
      data: infrastruktur_pendidikan,
    },
  ];

  infrastrukturPendidikan.subscribe((value) => {
    if (value) {
      infrastruktur_pendidikan = value;
      sum_infrastruktur_pendidikan = value.reduce((acc, item) => {
        return acc + Number(item.nilai);
      }, 0);
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
                class="icon btn btn-circle btn-lg btn-soft-primary disabled"
              >
                <span class="number">{item.total}</span>
              </span>
              <h3 class="mt-2">{item.label}</h3>
              <p class="mb-2">{item.deskripsi}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

{#each rekapContent as rekap}
  <section class="wrapper bg-light">
    <div class="container pb-6">
      <div class="row">
        <div class="col-lg-12">
          <h2 class="display-4 text-center mb-4">
            {rekap.label}
          </h2>
          <div class="card">
            <div class="card-body">
              <ul class="icon-list mb-0">
                <div class="row gy-3 gx-xl-8">
                  {#each rekap.data as data}
                    <div class="col-12 col-md-6 col-xl-4">
                      <li
                        class="icon-list bullet-bg {!data.nilai ||
                        data.nilai == 0
                          ? 'bullet-soft-red'
                          : 'bullet-soft-green'}"
                        on:click={setMapData(
                          data.variabel_id,
                          data.kode_prov,
                          data.kode_kab,
                          data.kode_kec,
                          data.kode_desa,
                          data.nilai
                        )}
                      >
                        <i
                          class="uil uil-{!data.nilai || data.nilai == 0
                            ? 'multiply'
                            : 'check'}"
                        />
                        {#if data.nilai > 0}
                          {data.nilai} Unit
                        {/if}
                        {data.nama_variabel.replace("Jumlah", "")}
                      </li>
                    </div>
                  {/each}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
{/each}
