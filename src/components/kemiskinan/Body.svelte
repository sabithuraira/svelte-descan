<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import axios from "axios";
  import Chart from "chart.js/auto";
  import L from "leaflet";
  import Swal from "sweetalert2";

  import { urlApi } from "../../stores/generalStores";
  export let kode;
  let map;
  let chart;
  let pointMap = { marker: {}, tooltip: {} };
  let keluarga = { data: [], links: [] };
  let listStatusKesejahteraanKeluarga = {};
  let listStatusKesejahteraanKeluargaPersentase = {};
  let statusKesejahteraanSelected = "";
  const statusKesejahteraanLabel = {
    1: "<span class='badge bg-danger'>Sangat Miskin</span>",
    2: "<span class='badge bg-warning'>Miskin</span>",
    3: "<span class='badge bg-success'>Tidak Miskin</span>",
  };
  let jumlahKeluarga = 0;
  let kategoriBantuan = {};
  let bantuan = [];
  let keyword = "";
  let show = false;

  const createMap = () => {
    if (map) map.remove();

    map = L.map("petaKemiskinan", {
      attributionControl: false,
    }).setView([-2.990934, 104.756554], 15);

    L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);
  };

  const createChart = () => {
    if (!chart)
      chart = new Chart(document.getElementById("persentaseKemiskinan"), {
        type: "pie",
        data: {
          labels: Object.values(statusKesejahteraanLabel),
          datasets: [{ data: Object.values(listStatusKesejahteraanKeluarga) }],
        },
        options: {
          offset: 20,
          onClick: (e) => {
            const points = chart.getElementsAtEventForMode(
              e,
              "point",
              { intersect: true },
              true
            );

            if (points.length)
              for (let k in statusKesejahteraanLabel)
                if (
                  statusKesejahteraanLabel[k] ==
                  chart.data.labels[points[0].index]
                )
                  statusKesejahteraanSelected = k;

            getKeluarga();

            document.getElementById("tabelKemiskinan").scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "start",
            });
          },
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => {
                  var index = context.dataset.data.indexOf(context.raw);

                  return (
                    Object.values(listStatusKesejahteraanKeluarga)[index] +
                    " (" +
                    Object.values(listStatusKesejahteraanKeluargaPersentase)[
                      index
                    ] +
                    "%)"
                  );
                },
              },
            },
          },
        },
      });
  };

  const getStatusKesejahteraanKeluarga = async () => {
    await axios
      .get(`${$urlApi}keluarga_miskin/${kode}/sum_status_kesejahteraan`)
      .then((d) => {
        listStatusKesejahteraanKeluarga = d.data.datas[0];

        jumlahKeluarga = Object.values(listStatusKesejahteraanKeluarga).reduce(
          (acc, item) => {
            return acc + Number(item);
          },
          0
        );

        for (let idx in listStatusKesejahteraanKeluarga) {
          listStatusKesejahteraanKeluargaPersentase[idx] =
            Math.round(
              (Number(listStatusKesejahteraanKeluarga[idx]) /
                Number(jumlahKeluarga)) *
                100 *
                100
            ) / 100;
        }
      });
  };

  const getKeluarga = async (suffix) => {
    let url = "";

    if (suffix) url = $urlApi + suffix;
    else
      url = `${$urlApi}keluarga_miskin/${kode}/list?status_kesejahteraan=${statusKesejahteraanSelected}&keyword=${keyword}`;

    await axios.get(url).then((d) => {
      keluarga = d.data.datas;
    });

    if (keluarga.data.length != 0) {
      show = true;

      setTimeout(() => {
        createChart();
        createMap();
      }, 100);
    }
  };

  const getLokasi = (lat, lng, nama) => {
    if (pointMap.marker) map.removeLayer(pointMap.marker);

    if (pointMap.tooltip) map.removeLayer(pointMap.tooltip);

    if (lat && lng) {
      pointMap.marker = L.marker([lat, lng]).addTo(map);
      pointMap.tooltip = L.tooltip([lat, lng], {
        content: nama,
        permanent: true,
      }).addTo(map);

      map.setView([lat, lng], 20);

      document.getElementById("petaKemiskinan").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    } else {
      map.setView([-2.990934, 104.756554], 15);

      Swal.fire({
        text: "Tidak ada lokasi",
        toast: true,
        showConfirmButton: false,
        position: "center",
        timer: 1000,
        timerProgressBar: true,
      });
    }
  };

  const getKategoriBantuan = async () => {
    await axios.get(`${$urlApi}master_bantuan`).then((d) => {
      kategoriBantuan = d.data.datas;
    });
  };

  const nameKategoriBantuan = (id, tag) => {
    const bantuan = kategoriBantuan.find((b) => b.id == id);
    if (bantuan) return bantuan[tag];
    else return "";
  };

  const getBantuan = (param_bantuan) => {
    bantuan = param_bantuan;

    if (bantuan.length != 0) {
      setTimeout(
        () =>
          document.getElementById("tabelBantuan").scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          }),
        100
      );
    } else {
      Swal.fire({
        text: "Tidak ada bantuan",
        toast: true,
        showConfirmButton: false,
        position: "center",
        timer: 1000,
        timerProgressBar: true,
      });
    }
  };

  const getFoto = (data) => {
    const foto = [
      "keluarga1.jpg",
      "keluarga2.jpg",
      "keluarga3.jpg",
      "keluarga4.jpg",
      "keluarga5.jpg",
      "keluarga6.jpg",
      "keluarga7.jpg",
    ];
    let foto1 = document.querySelector("#foto1");
    let foto2 = document.querySelector("#foto2");
    let random1 = 0;
    let random2 = 0;
    while (random1 == random2) {
      random1 = Math.floor(Math.random() * foto.length);
      random2 = Math.floor(Math.random() * foto.length);
    }
    foto1.src = "/images/keluarga/" + foto[random1];
    foto2.src = "/images/keluarga/" + foto[random2];
  };

  onMount(() => {
    getStatusKesejahteraanKeluarga();
    getKeluarga();
    getKategoriBantuan();
  });
</script>

{#if show}
  <section class="wrapper bg-light">
    <div class="container py-6 py-md-8">
      <div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 mb-4">
        <div class="col-lg-4">
          <h3 class="display-4 mb-3 pe-xl-10">Jumlah Keluarga</h3>
          <h1 class="display-1 mb-0 pe-xxl-10 counter">{jumlahKeluarga}</h1>
        </div>
        <div class="col-lg-8 mt-lg-2">
          <div class="row align-items-center counter-wrapper gy-6 text-center">
            <div class="col-md-4">
              <img
                src="/images/img/icons/lineal/group.svg"
                class="icon-svg icon-svg-md text-primary mb-3"
                alt=""
              />
              <h3 class="counter">
                {listStatusKesejahteraanKeluarga
                  ? listStatusKesejahteraanKeluarga.sangat_miskin +
                    " (" +
                    listStatusKesejahteraanKeluargaPersentase.sangat_miskin +
                    "%) "
                  : ""}
              </h3>
              <p>Sangat Miskin</p>
            </div>
            <div class="col-md-4">
              <img
                src="/images/img/icons/lineal/savings.svg"
                class="icon-svg icon-svg-md text-primary mb-3"
                alt=""
              />
              <h3 class="counter">
                {listStatusKesejahteraanKeluarga
                  ? listStatusKesejahteraanKeluarga.miskin +
                    " (" +
                    listStatusKesejahteraanKeluargaPersentase.miskin +
                    "%) "
                  : ""}
              </h3>
              <p>Miskin</p>
            </div>
            <div class="col-md-4">
              <img
                src="/images/img/icons/lineal/tie.svg"
                class="icon-svg icon-svg-md text-primary mb-3"
                alt=""
              />
              <h3 class="counter">
                {listStatusKesejahteraanKeluarga
                  ? listStatusKesejahteraanKeluarga.tidak_miskin +
                    " (" +
                    listStatusKesejahteraanKeluargaPersentase.tidak_miskin +
                    "%) "
                  : ""}
              </h3>
              <p>Tidak Miskin</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-4" />
      <h3 class="display-4 mb-3 text-center">Keluarga</h3>
      <p class="lead fs-lg mb-10 text-center">
        Berdasarkan Tingkat Kesejahteraan
      </p>
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
                <canvas id="persentaseKemiskinan" />
              </div>
            </div>
          </div>
          <div class="col-lg-6 d-flex align-items-stretch">
            <div class="card w-100">
              <div class="card-body">
                <div id="petaKemiskinan" style="height: 600px" />
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
                            getKeluarga();
                          }
                        }}
                      />
                      <label for="pencarian">Pencarian</label>
                    </div>
                  </div>
                  <div class="col-xl-1 col-lg-2 col-md-3 col-sm-4 mb-2">
                    <button
                      class="btn btn-primary rounded-0"
                      on:click={() => getKeluarga()}>Cari!</button
                    >
                  </div>
                  <div class="col-12 mb-2">
                    <div class="table-responsive" id="tabelKemiskinan">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>No KK</th>
                            <th>Nama Kepala Keluarga</th>
                            <th>Jumlah Anggota Keluarga</th>
                            <th>Satuan Lingkungan Setempat</th>
                            <th>Alamat</th>
                            <th>Status Kesejahteraan</th>
                            <th>Lokasi</th>
                            <th>Bantuan</th>
                            <th>Foto</th>
                          </tr>
                        </thead>
                        <tbody>
                          {#each keluarga.data as data}
                            <tr>
                              <td>{data.no_kk || ""}</td>
                              <td>{data.nama_kepala || ""}</td>
                              <td>{data.jumlah_art || ""}</td>
                              <td>{data.nama_sls || ""}</td>
                              <td>{data.alamat || ""}</td>
                              <td
                                >{@html statusKesejahteraanLabel[
                                  data.status_kesejahteraan
                                ] || ""}</td
                              >
                              <td>
                                <a
                                  class="btn btn-outline-primary btn-sm rounded"
                                  on:click={() =>
                                    getLokasi(
                                      data.latitude,
                                      data.longitude,
                                      data.nama_kepala
                                    )}>Lokasi</a
                                >
                              </td>
                              <td>
                                <a
                                  class="btn btn-outline-primary btn-sm rounded"
                                  on:click={() => getBantuan(data.bantuan)}
                                  >Bantuan</a
                                >
                              </td>
                              <td>
                                <a
                                  class="btn btn-outline-primary btn-sm rounded"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalFoto"
                                  on:click={() => getFoto(data)}>Foto</a
                                >
                              </td>
                            </tr>
                          {/each}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="col-12 d-flex justify-content-center">
                    <div class="table-responsive">
                      <nav aria-label="pagination keluarga">
                        <ul class="pagination">
                          {#each keluarga.links as item}
                            <li
                              class="page-item {item.active || !item.url
                                ? 'disabled'
                                : ''}"
                            >
                              <a
                                class="page-link"
                                on:click={() => getKeluarga(item.url)}
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
      {#if bantuan.length > 0}
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive" id="tabelBantuan">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>No KK</th>
                          <th>NIK Penerima Bantuan</th>
                          <th>Nama Kepala Keluarga</th>
                          <th>Nama Bantuan</th>
                          <th>Deskripsi Bantuan</th>
                          <th>Bentuk Bantuan</th>
                          <th>Instansi Pemberi Bantuan</th>
                          <th>Waktu Bantuan</th>
                          <th>Jumlah Bantuan</th>
                          <th>Satuan Bantuan</th>
                        </tr>
                      </thead>

                      <tbody>
                        {#each bantuan as item}
                          <tr>
                            <td>{item.no_kk || ""}</td>
                            <td>{item.nik || ""}</td>
                            <td>{item.nama_kepala || ""}</td>
                            <td
                              >{nameKategoriBantuan(
                                item.bantuan_id,
                                "nama_bantuan"
                              ) || ""}</td
                            >
                            <td
                              >{nameKategoriBantuan(
                                item.bantuan_id,
                                "deskripsi_bantuan"
                              ) || ""}</td
                            >
                            <td
                              >{nameKategoriBantuan(
                                item.bantuan_id,
                                "bentuk_bantuan"
                              ) || ""}</td
                            >
                            <td
                              >{nameKategoriBantuan(
                                item.bantuan_id,
                                "instansi_pemberi"
                              ) || ""}</td
                            >
                            <td>{item.waktu_bantuan || ""}</td>
                            <td>{item.jumlah_bantuan || ""}</td>
                            <td>{item.satuan_bantuan || ""}</td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>
{:else}
  <section class="wrapper bg-light">
    <div class="container py-6 py-md-8">
      <h3>Belum Ada Data</h3>
    </div>
  </section>
{/if}

<div class="modal fade" id="modalFoto" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-md">
    <div class="modal-content text-center">
      <div class="modal-body">
        <button class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        <h3>Foto</h3>
        <div class="row gx-2 gy-2">
          <div class="col-12 justify-content-center align-items-center">
            <img class="img-fluid" src="" alt="Foto Keluarga" id="foto1" />
          </div>
          <div class="col-12 justify-content-center align-items-center">
            <img class="img-fluid" src="" alt="Foto Keluarga" id="foto2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
