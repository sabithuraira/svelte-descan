<script>
// @ts-nocheck
 	import axios from 'axios'
	import { onMount } from 'svelte';
	import { urlApi } from '../../stores/generalStores';

  export let infoWilayah;
  let peta = []; 
  let map = [];

  function createMap(node) {
    map = L.map(node).setView([-3.27786, 103.19248], 8);
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(map);
  }

	async function loadGeoJson() {
		await axios
			.get(`${$urlApi}wilayah/${infoWilayah.kode_prov}${infoWilayah.kode_kab}/json`)
			.then(({ data }) => {
				peta = data.data;
			}).catch(({ response }) => {
				console.error(response);
			});

    let polygon = L.geoJSON(peta, {
      filter: function(feature, layer) {
        return (feature.properties.kdkab == infoWilayah.kode_kab && feature.properties.kdkec == infoWilayah.kode_kec && feature.properties.kddesa == infoWilayah.kode_desa);
      }
    }).addTo(map);
    map.setView(polygon.getBounds().getCenter(), 13);
	}

  onMount(() => {
    loadGeoJson();
  });
</script>

<div class="card m-4">
  <div class="card-body">
    <div style="height: 400px; width: 100%;" use:createMap></div>
  </div>
  <!--/.card-body -->
</div>
