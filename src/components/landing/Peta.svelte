<script>
// @ts-nocheck
  export let desa;

  function createMap(node) {
    let map = L.map(node).setView([-3.27786, 103.19248], 8);
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(map);
    desa.forEach((d) => {
      let marker = L.marker([-d.lat, d.lon]).addTo(map);
      marker.bindPopup(`<a href="/monograph/${d.kode_prov + d.kode_kab + d.kode_kec + d.kode_desa}">${d.nmDesa}, ${d.nmKec}, ${d.nmKab}</a>`);
    });
  }
</script>

<div class="mt-4">
  <div style="height: 400px; width: 100%;" use:createMap></div>
</div>
