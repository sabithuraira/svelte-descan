import { c as create_ssr_component, a as subscribe, e as escape } from "./ssr.js";
import { u as urlApi, i as isShowMap, d as dataMap } from "./generalStores.js";
import axios from "axios";
const Maps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $urlApi, $$unsubscribe_urlApi;
  $$unsubscribe_urlApi = subscribe(urlApi, (value) => $urlApi = value);
  let map;
  let dataKoordinat = [];
  let is_show_map = false;
  let data_map = {
    variabel_id: "",
    kode_prov: "",
    kode_kab: "",
    kode_kec: "",
    kode_desa: ""
  };
  isShowMap.subscribe((value) => {
    is_show_map = value;
    if (value) {
      setTimeout(
        () => {
          loadData();
        },
        1e3
      );
    }
  });
  dataMap.subscribe((value) => {
    data_map = value;
  });
  const loadData = async () => {
    if (is_show_map && data_map.kode_prov != "") {
      await axios.get(`${$urlApi}data_geo/${data_map.variabel_id}/${data_map.kode_prov + data_map.kode_kab + data_map.kode_kec + data_map.kode_desa}`).then(({ data }) => {
        if (map)
          map.remove();
        map = L.map("peta", { attributionControl: false }).setView([-2.990934, 104.756554], 15);
        L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", { subdomains: ["mt0", "mt1", "mt2", "mt3"] }).addTo(map);
        dataKoordinat = data.datas;
        for (let i = 0; i < dataKoordinat.length; i++) {
          var marker = L.marker([Number(dataKoordinat[i].lat), Number(dataKoordinat[i].long)]).addTo(map);
          marker.tooltip = L.tooltip([Number(dataKoordinat[i].lat), Number(dataKoordinat[i].long)], {
            content: dataKoordinat[i].nama,
            permanent: false
          }).addTo(map);
          if (i == dataKoordinat.length - 1) {
            map.setView([Number(dataKoordinat[i].lat), Number(dataKoordinat[i].long)], 16);
          }
        }
        if (dataKoordinat.length == 0)
          alert("Tidak ada data koordinat lokasi pada kategori ini");
      }).catch(({ response }) => {
        console.error(response);
      });
    }
  };
  $$unsubscribe_urlApi();
  return `<div class="${"modal " + escape(is_show_map ? "d-block" : "", true)}" style="display:none" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content"><div class="modal-body"><button type="button" class="btn-close"></button> <div id="peta" style="height: 600px"></div></div></div></div></div>`;
});
export {
  Maps as M
};
