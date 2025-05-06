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
        console.log(desa);
			}).catch(({ response })=>{
				console.error(response);
			});
	}

  onMount(()=>{
    loadKab()
  })
</script>

<div class="card mx-4 my-4">
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
  {#each desa as d}
    <div class="card mx-2 my-2 align-items-center">
      <div class="card-body">
        <a href="/monograph/{d.kode_wilayah}">
          <p class="text-center text-dark">{d.nama}</p>
        </a>
      </div>
      <!--/.card-body -->
    </div>
  {/each}
</div>
