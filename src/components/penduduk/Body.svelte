<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import axios from "axios";
  import Chart from "chart.js/auto";

  import { urlApi } from "../../stores/generalStores";

  export let kode = "";

  let chart = { pendidikanTerakhir: null, jenisPekerjaan: null };
  let kategori = [];
  let penduduk = { data: [], links: [] };
  let listPendidikanTerakhir = { sd: 100, smp: 50, sma: 20 };
  let pendidikanTerakhirSelected = "";
  const pendidikanTerakhirLabel = { 3: "SD", 8: "SMP", 13: "SMA" };
  let listJenisPekerjaan = {
    pertanian_tanaman_padi_dan_palawija: 1000,
    hortikultura: 250,
    perkebunan: 50,
  };
  let jenisPekerjaanSelected = "";
  const jenisPekerjaanLabel = {
    1: "Pertanian tanaman padi & palawija",
    2: "Hortikultura",
    3: "Perkebunan",
  };
  let keyword = "";
  let show = false;

  const createChart = () => {
    if (!chart.pendidikanTerakhir)
      chart.pendidikanTerakhir = new Chart(
        document.getElementById("pendidikanTerakhir"),
        {
          type: "bar",
          data: {
            labels: Object.values(pendidikanTerakhirLabel),
            datasets: [
              {
                label: "Pendidikan Terakhir",
                data: Object.values(listPendidikanTerakhir),
              },
            ],
          },
          options: {
            indexAxis: "y",
            onClick: (e) => {
              const points = chart.pendidikanTerakhir.getElementsAtEventForMode(
                e,
                "point",
                { intersect: true },
                true
              );

              if (points.length) {
                for (let p in pendidikanTerakhirLabel)
                  if (
                    pendidikanTerakhirLabel[p] ==
                    chart.pendidikanTerakhir.data.labels[points[0].index]
                  )
                    pendidikanTerakhirSelected = p;

                getPenduduk();

                document.getElementById("tabelPenduduk").scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "start",
                });
              }
            },
            plugins: {
              title: {
                display: true,
                text: "Jumlah Penduduk Berdasarkan Pendidikan Terakhir",
                font: {
                  size: 18,
                },
              },
            },
          },
        }
      );

    if (!chart.jenisPekerjaan)
      chart.jenisPekerjaan = new Chart(
        document.getElementById("jenisPekerjaan"),
        {
          type: "bar",
          data: {
            labels: Object.values(jenisPekerjaanLabel),
            datasets: [
              {
                label: "Jenis Pekerjaan",
                data: Object.values(listJenisPekerjaan),
              },
            ],
          },
          options: {
            indexAxis: "y",
            onClick: (e) => {
              const points = chart.jenisPekerjaan.getElementsAtEventForMode(
                e,
                "point",
                { intersect: true },
                true
              );

              if (points.length) {
                for (let p in jenisPekerjaanLabel)
                  if (
                    jenisPekerjaanLabel[p] ==
                    chart.jenisPekerjaan.data.labels[points[0].index]
                  )
                    jenisPekerjaanSelected = p;

                getPenduduk();

                document.getElementById("tabelPenduduk").scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "start",
                });
              }
            },
            plugins: {
              title: {
                display: true,
                text: "Jumlah Penduduk Berdasarkan Jenis Pekerjaan",
                font: {
                  size: 18,
                },
              },
            },
          },
        }
      );
  };

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
      url = `${$urlApi}penduduk/${kode}/list?pendidikan_terakhir=${pendidikanTerakhirSelected}&jenis_pekerjaan=${jenisPekerjaanSelected}&keyword=${keyword}`;

    await axios.get(url).then((d) => {
      penduduk = d.data.datas;

      if (penduduk.data.length != 0) {
        show = true;

        setTimeout(() => createChart(), 100);
      }
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
          <h3 class="display-4 mb-10 px-xl-10">Penduduk</h3>
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
        <div class="row gx-md-5 gy-5">
          <div class="col-lg-6 d-flex align-items-stretch">
            <div class="card w-100">
              <div
                class="card-body d-flex justify-content-center align-items-center"
              >
                <canvas id="pendidikanTerakhir" />
              </div>
            </div>
          </div>
          <div class="col-lg-6 d-flex align-items-stretch">
            <div class="card w-100">
              <div
                class="card-body d-flex justify-content-center align-items-center"
              >
                <canvas id="jenisPekerjaan" />
              </div>
            </div>
          </div>
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
                    <div class="table-responsive" id="tabelPenduduk">
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
                              <td>{item.nik}</td>
                              <td>{item.no_kk}</td>
                              <td>{item.nama_lengkap}</td>
                              <td>
                                {nameKategori(
                                  item.jenis_kelamin,
                                  "jenis_kelamin"
                                )}
                              </td>
                              <td>{item.tempat_lahir}</td>
                              <td>{item.tanggal_lahir}</td>
                              <td>{item.umur}</td>
                              <td>
                                {nameKategori(
                                  item.pendidikan_terakhir,
                                  "pendidikan"
                                )}
                              </td>
                              <td>
                                {item.status_pekerjaan == 1
                                  ? "Bekerja"
                                  : "Tidak Bekerja"}
                              </td>
                              <td>{item.pekerjaan}</td>
                              <td>
                                {nameKategori(
                                  item.jenis_pekerjaan,
                                  "lap_usaha"
                                )}
                              </td>
                              <td>{item.nama_sls}</td>
                              <td>{item.alamat}</td>
                              <td>
                                {nameKategori(item.status_stunting, "stunting")}
                              </td>
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
                                ><span
                                  >{@html item.label
                                    .replace("Previous", "")
                                    .replace("Next", "")}</span
                                ></a
                              >
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
