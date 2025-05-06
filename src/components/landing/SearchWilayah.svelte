<script>
// @ts-nocheck
  import axios from 'axios'
  import { onMount } from 'svelte';
  import { urlApi } from '../../stores/generalStores';

  let kab = [];
  let kabSelected = "";
  let kec = [];
  let kecSelected = "";
  let desa = [];

	async function loadKab(){
		await axios
			.get(`${$urlApi}wilayah/16`)
			.then(({data})=>{
				kab = data.datas;
			}).catch(({ response })=>{
				console.error(response);
			});
	}

	async function loadKec(){
		await axios
			.get(`${$urlApi}wilayah/${kabSelected}`)
			.then(({data})=>{
				kec = data.datas;
			}).catch(({ response })=>{
				console.error(response);
			});
	}

	async function loadDesa(){
		await axios
			.get(`${$urlApi}wilayah/${kecSelected}`)
			.then(({data})=>{
				desa = data.datas;
        setTimeout(() => {
          window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
			}).catch(({ response })=>{
				console.error(response);
			});
	}

  onMount(()=>{
    loadKab()
  })
</script>

<div class="card shadow-none border-light">
  <div class="card-body">
    <div class="row">
      <div class="col-6">
        <h6>Kabupaten/Kota</h6>
        <select class="form-select" placeholder="Pilih Kabupaten/Kota" bind:value={kabSelected} on:change={loadKec}>
          {#each kab as k}
            <option value="{k.kode_wilayah}">{k.nama}</option>
          {/each}
        </select>
      </div>
      <div class="col-6">
        <h6>Kecamatan</h6>
        <select class="form-select" placeholder="Pilih Kecamatan" bind:value={kecSelected} on:change={loadDesa}>
          {#each kec as k}
            <option value="{k.kode_wilayah}">{k.nama}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  <!--/.card-body -->
</div>

<div class="d-flex flex-wrap justify-content-center align-items-center">
  <ul class="list-group list-group-flush mb-8">
    {#each desa as d}
      <li class="list-group-item m-0">
        <div class="text-center">
          <a href="/monograph/{d.kode_wilayah}">
            <p class="text-dark mb-0">{d.nama}</p>
          </a>
        </div>
      </li>
    {/each}
  </ul>
</div>
