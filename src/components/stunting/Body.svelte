<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import axios from "axios";

  import { urlApi } from "../../stores/generalStores";

  export let kode = "";

  let kategori = [];
  let penduduk = { data: [], links: [] };
  let statusStuntingSelected = "";
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

  const getPenduduk = async (suffix) => {
    var url = "";

    if (suffix) url = $urlApi + suffix;
    else
      url = `${$urlApi}penduduk/${kode}/list?status_stunting=${statusStuntingSelected}&keyword=${keyword}`;

    await axios.get(url).then((d) => {
      penduduk = d.data.datas;

      show = penduduk.data.length != 0 ? true : false;
    });
  };

  const setStatusStunting = (value) => {
    statusStuntingSelected = value;

    getPenduduk();

    document.getElementById("tabelStunting").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };

  onMount(() => {
    getKategori().then(() => getPenduduk());
  });
</script>

{#if show}
  <section class="wrapper bg-light">
    <div class="container py-6 py-md-8">
      <div class="row text-center">
        <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <h3 class="display-4 mb-2 px-xl-10">Stunting</h3>
          <p>
            <b><i>Stunting</i></b> adalah gangguan pertumbuhan dan perkembangan anak
            akibat kekurangan gizi kronis dan infeksi berulang, yang ditandai dengan
            panjang atau tinggi badannya berada di bawah standar
          </p>
        </div>
      </div>
      <div class="position-relative mb-4 mb-md-6">
        <div
          class="shape rounded-circle bg-soft-primary rellax w-16 h-16"
          data-rellax-speed="1"
          style="top: -0.5rem; right: -2.5rem; z-index: 0"
        />
        <div
          class="shape bg-dot primary rellax w-16 h-17"
          data-rellax-speed="1"
          style="top: -0.5rem; left: -2.5rem; z-index: 0"
        />
        <div class="row gx-md-5 gy-5 text-center">
          <div class="col-md-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div
                  class="icon btn btn-circle btn-lg btn-primary disabled mb-3"
                >
                  <i class="uil uil-user-minus" />
                </div>
                <h4>Stunting</h4>
                <h1 class="display-1 mb-2 counter">999</h1>
                <a
                  class="more hover link-primary"
                  on:click={() => setStatusStunting(1)}>Lihat</a
                >
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div
                  class="icon btn btn-circle btn-lg btn-primary disabled mb-3"
                >
                  <i class="uil uil-user-exclamation" />
                </div>
                <h4>Potensi Stunting</h4>
                <h1 class="display-1 mb-2 counter">999</h1>
                <a
                  class="more hover link-primary"
                  on:click={() => setStatusStunting(2)}>Lihat</a
                >
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div
                  class="icon btn btn-circle btn-lg btn-primary disabled mb-3"
                >
                  <i class="uil uil-user-check" />
                </div>
                <h4>Tidak Stunting</h4>
                <h1 class="display-1 mb-2 counter">999</h1>
                <a
                  class="more hover link-primary"
                  on:click={() => setStatusStunting(0)}>Lihat</a
                >
              </div>
            </div>
          </div>
        </div>
        <hr class="my-6" />
        <h3 class="display-4 mb-6 text-center">
          {nameKategori(statusStuntingSelected, "stunting")}
        </h3>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xl-11 col-lg-10 col-md-9 col-sm-8 mb-2">
                    <div class="form-floating">
                      <input
                        id="pencarian"
                        type="text"
                        class="form-control"
                        placeholder="Pencarian"
                        v-model="pencarian"
                        bind:value={keyword}
                        on:keyup={(event) => {
                          if (event === undefined || event.key == "Enter") {
                            getPenduduk();
                          }
                        }}
                      />
                      <label for="pencarian">Pencarian</label>
                    </div>
                  </div>
                  <div class="col-xl-1 col-lg-2 col-md-3 col-sm-4 mb-2">
                    <a
                      class="btn btn-primary rounded-0"
                      on:click={() => getPenduduk()}>Cari!</a
                    >
                  </div>
                  <div class="col-12 mb-2">
                    <div class="table-responsive" id="tabelStunting">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>NIK</th>
                            <th>No KK</th>
                            <th>Nama Lengkap</th>
                            <th>Jenis Kelamin</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal Lahir</th>
                            <th>Umur</th>
                            <th>Pendidikan Terakhir</th>
                            <th>Status Pekerjaan</th>
                            <th>Pekerjaan</th>
                            <th>Jenis Pekerjaan</th>
                            <th>Nama SLS</th>
                            <th>Alamat</th>
                            <th>Status Stunting</th>
                          </tr>
                        </thead>
                        <tbody>
                          {#each penduduk.data as item}
                            <tr>
                              <td>{item.nik || ""}</td>
                              <td>{item.no_kk || ""}</td>
                              <td>{item.nama_lengkap || ""}</td>
                              <td
                                >{nameKategori(
                                  item.jenis_kelamin,
                                  "jenis_kelamin"
                                ) || ""}</td
                              >
                              <td>{item.tempat_lahir || ""}</td>
                              <td>{item.tanggal_lahir || ""}</td>
                              <td>{item.umur || ""}</td>
                              <td
                                >{nameKategori(
                                  item.pendidikan_terakhir,
                                  "pendidikan"
                                ) || ""}</td
                              >
                              <td
                                >{item.status_pekerjaan == 1
                                  ? "Bekerja"
                                  : "Tidak Bekerja" || ""}</td
                              >
                              <td>{item.pekerjaan || ""}</td>
                              <td
                                >{nameKategori(
                                  item.jenis_pekerjaan,
                                  "lap_usaha"
                                ) || ""}</td
                              >
                              <td>{item.nama_sls || ""}</td>
                              <td>{item.alamat || ""}</td>
                              <td
                                >{nameKategori(
                                  item.status_stunting,
                                  "stunting"
                                ) || ""}</td
                              >
                            </tr>
                          {/each}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="col-12 d-flex justify-content-center">
                    <div class="table-responsive">
                      <nav aria-label="pagination penduduk">
                        <ul class="pagination">
                          {#each penduduk.links as item}
                            <li
                              class="page-item {item.active || !item.url
                                ? 'disabled'
                                : ''}"
                            >
                              <a
                                class="page-link"
                                on:click={() => getPenduduk(item.url)}
                              >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
{:else}
  <section class="wrapper bg-light">
    <div class="container py-6 py-md-8">
      <h3>Loading...</h3>
    </div>
  </section>
{/if}
