<script>
// @ts-nocheck
 	import axios from 'axios'
	import { onMount } from 'svelte';
	import { urlApi } from '../../stores/generalStores';

  export let infoWilayah;
  let peta = []; 
  let map = [];
  let infrastruktur = [];

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

	async function loadPoint() {
		await axios
			.get(`${$urlApi}data_variabel/${infoWilayah.kode_prov}${infoWilayah.kode_kab}${infoWilayah.kode_kec}${infoWilayah.kode_desa}/monograf`)
			.then(({ data }) => {
				infrastruktur = data.datas.filter((item) => item.dataGeo.length > 0);
        infrastruktur.forEach((i) => {
          i.dataGeo.forEach((d) => {
            if (d.lat != null && d.long != null) {
              let marker = L.marker([d.lat, d.long]).addTo(map);
              marker.bindPopup(d.nama);
            }
          });
        });
			}).catch(({ response }) => {
				console.error(response);
			});
	}

  onMount(() => {
    loadGeoJson();
    loadPoint();
  });
</script>

<div class="container p-4" style="border: 1px solid #943126; border-radius: 25px;">
  <h2 class="display-4 text-center mb-4" style="color:#943126;">
    <span class="m-2">
      <i class="fa-solid fa-map"></i>
    </span>Peta Wilayah dan Infrastruktur Desa
  </h2>
  <div style="height: 400px; width: 100%; border-radius: 25px;" use:createMap></div>
</div>
