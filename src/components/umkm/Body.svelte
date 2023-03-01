<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import axios from "axios";

  import { urlApi } from "../../stores/generalStores";

  export let kode = "";

  let kategori = [];
  let umkm = { data: [], links: [] };
  let keyword = "";
  let show = false;

  const getKategori = async () => {
    let total = await axios.get($urlApi + "kategori");

    total = total.data.datas.total;

    await axios.get(`${$urlApi}kategori?per_page=${total}`).then((d) => {
      kategori = d.data.datas.data;
    });
  };

  const nameKategori = (kode, tag) => {
    let kategoriByTag = kategori.filter((k) => k.tag == tag);
    let kategoriGetKode = kategoriByTag.find((k) => k.kode == kode);
    if (kategoriGetKode) return kategoriGetKode.name;
    else return "";
  };

  const getUMKM = async (suffix) => {
    var url = "";

    if (suffix) url = $urlApi + suffix;
    else url = `${$urlApi}umkm/${kode}/list?keyword=${keyword}`;

    await axios.get(url).then((d) => {
      umkm = d.data.datas;

      show = umkm.data.length != 0 ? true : false;
    });
  };

  onMount(() => {
    getKategori().then(() => getUMKM());
  });
</script>

{#if show}
  <section class="wrapper bg-light">
    <div class="container py-6 py-md-8">
      <div class="row text-center">
        <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <h3 class="display-4 mb-2 px-xl-10">Usaha Mikro Kecil Menengah</h3>
          <p>
            <b>Usaha mikro kecil menengah</b> adalah istilah umum dalam dunia
            ekonomi yang merujuk kepada usaha ekonomi produktif yang dimiliki
            perorangan maupun badan usaha.
            <b>UMKM</b>
            dapat berarti bisnis yang dijalankan individu, rumah tangga, atau badan
            usaha ukuran kecil.
          </p>
          <hr class="mt-2 mb-6" />
        </div>
      </div>
      <div class="row gx-lg-12 gx-xl-16 gy-4 text-center align-items-center">
        <div class="col-12">
          <div class="row">
            <div class="col-xl-11 col-lg-10 col-md-9 col-sm-8 mb-2">
              <div class="form-floating">
                <input
                  id="pencarian"
                  type="text"
                  class="form-control"
                  placeholder="Pencarian"
                  bind:value={keyword}
                  on:keyup={(event) => {
                    if (event === undefined || event.key == "Enter") {
                      getUMKM();
                    }
                  }}
                />
                <label for="pencarian">Pencarian</label>
              </div>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-sm-4 mb-2">
              <a class="btn btn-primary rounded-0" on:click={() => getUMKM()}
                >Cari!</a
              >
            </div>
          </div>
        </div>
        {#each umkm.data as item}
          <div class="col-12">
            <div class="card gradient-7">
              <div class="card-body">
                <h2 class="display-4 text-white mb-3">{item.nama_umkm}</h2>
                <p class="lead fs-md text-white">
                  Bergerak di Bidang {nameKategori(
                    item.kategori_umkm,
                    "lap_usaha"
                  )}
                </p>
                <p class="d-flex justify-content-center text-white mb-1">
                  <span>{@html item.deskripsi}</span>
                </p>
                <div
                  class="d-flex flex-row justify-content-center align-items-center"
                >
                  <h1 class="display-3 text-white px-1">
                    <i class="uil uil-user-circle" />
                  </h1>
                  <h4 class="text-white px-1">{item.nama_pemilik}</h4>
                </div>
              </div>
            </div>
          </div>
        {/each}
        <div class="col-12 d-flex justify-content-center">
          <div class="table-responsive">
            <nav aria-label="pagination umkm">
              <ul class="pagination">
                {#each umkm.links as item}
                  <li
                    class="page-item {item.active || !item.url
                      ? 'disabled'
                      : ''}"
                  >
                    <a class="page-link" on:click={() => getUMKM(item.url)}>
                      <span
                        >{@html item.label
                          .replace("Previous", "")
                          .replace("Next", "")}</span
                      >
                    </a>
                  </li>
                {/each}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
{:else}
  <section class="wrapper bg-light">
    <div class="container py-6 py-md-8">
      <h3>Belum Ada Data</h3>
    </div>
  </section>
{/if}
