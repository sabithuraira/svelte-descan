<script>
// @ts-nocheck
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { urlApi } from '../../stores/generalStores';

	export let infoWilayah;

	let map = null;
	let peta = null;
	let infrastruktur = [];
	let mapContainer = null;

	function createMap(node) {
		if (!node || map) return;
		mapContainer = node;
		map = L.map(node).setView([-3.27786, 103.19248], 8);
		L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
			maxZoom: 20,
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
			tileSize: 512,
			zoomOffset: -1
		}).addTo(map);
		// Load data after map is ready
		loadGeoJson();
		loadPoint();
	}

	function normalizeGeoJsonResponse(data) {
		if (!data) return null;
		if (data.type === 'FeatureCollection' && Array.isArray(data.features)) return data;
		if (data.data && data.data.type === 'FeatureCollection' && Array.isArray(data.data.features)) return data.data;
		if (data.datas && Array.isArray(data.datas)) return { type: 'FeatureCollection', features: data.datas };
		if (Array.isArray(data)) return { type: 'FeatureCollection', features: data };
		return null;
	}

	function propsMatch(featureProps, info) {
		const p = featureProps || {};
		const kdkab = String(p.kdkab ?? p.kode_kab ?? '').trim();
		const kdkec = String(p.kdkec ?? p.kode_kec ?? '').trim();
		const kddesa = String(p.kddesa ?? p.kode_desa ?? '').trim();
		const kab = String(info.kode_kab ?? '').trim();
		const kec = String(info.kode_kec ?? '').trim();
		const desa = String(info.kode_desa ?? '').trim();
		return kdkab === kab && kdkec === kec && kddesa === desa;
	}

	function propsMatchKab(featureProps, info) {
		const p = featureProps || {};
		const kdkab = String(p.kdkab ?? p.kode_kab ?? '').trim();
		const kab = String(info.kode_kab ?? '').trim();
		return kdkab === kab;
	}

	async function loadGeoJson() {
		if (!map || !infoWilayah) return;
		const prov = String(infoWilayah.kode_prov ?? '').trim();
		const kab = String(infoWilayah.kode_kab ?? '').trim();
		if (!prov || !kab) return;

		let geoJson = null;

		// Try kabupaten-level endpoint first (desa polygons for one kab)
		try {
			const { data } = await axios.get(`${$urlApi}wilayah/${prov}${kab}/json`);
			geoJson = normalizeGeoJsonResponse(data);
		} catch (e) {
			// ignore
		}

		// Fallback: use same endpoint as IDM and filter to this kab (then to desa if props exist)
		if (!geoJson || !geoJson.features || geoJson.features.length === 0) {
			try {
				const { data } = await axios.get(`${$urlApi}wilayah/json/kab/all`);
				geoJson = normalizeGeoJsonResponse(data);
			} catch (e) {
				console.error('Peta: failed to load GeoJSON', e);
				return;
			}
		}

		if (!geoJson || !geoJson.features || geoJson.features.length === 0) return;

		const polygon = L.geoJSON(geoJson, {
			style: { color: '#943126', weight: 2, fillColor: '#943126', fillOpacity: 0.2 },
			filter: function (feature) {
				// Prefer desa-level match
				if (propsMatch(feature.properties, infoWilayah)) return true;
				// If no desa-level features, show kabupaten polygon
				return propsMatchKab(feature.properties, infoWilayah);
			}
		}).addTo(map);

		const layers = polygon.getLayers();
		if (layers.length > 0) {
			try {
				const bounds = polygon.getBounds();
				if (bounds.isValid()) {
					map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
				}
			} catch (err) {
				// keep default view
			}
		}
	}

	async function loadPoint() {
		if (!map || !infoWilayah) return;
		const prov = String(infoWilayah.kode_prov ?? '').trim();
		const kab = String(infoWilayah.kode_kab ?? '').trim();
		const kec = String(infoWilayah.kode_kec ?? '').trim();
		const desa = String(infoWilayah.kode_desa ?? '').trim();
		if (!prov || !kab || !kec || !desa) return;

		try {
			const { data } = await axios.get(
				`${$urlApi}data_variabel/${prov}${kab}${kec}${desa}/monograf`
			);
			const list = data?.datas ?? data?.data;
			const arr = Array.isArray(list) ? list : [];
			infrastruktur = arr.filter((item) => item?.dataGeo?.length > 0);
			infrastruktur.forEach((i) => {
				(i.dataGeo || []).forEach((d) => {
					if (d.lat != null && d.long != null) {
						const marker = L.marker([Number(d.lat), Number(d.long)]).addTo(map);
						marker.bindPopup(d.nama ?? '');
					}
				});
			});
		} catch (e) {
			console.error('Peta: failed to load points', e);
		}
	}
</script>

<div class="container p-4" style="border: 1px solid #943126; border-radius: 25px;">
	<h2 class="display-4 text-center mb-4" style="color:#943126;">
		<span class="m-2">
			<i class="fa-solid fa-map"></i>
		</span>Peta Wilayah dan Infrastruktur Desa
	</h2>
	<div style="height: 400px; width: 100%; border-radius: 25px;" use:createMap></div>
</div>
