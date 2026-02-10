import { r as readable, w as writable } from "./index2.js";
const urlApi = readable("https://descan.bpssumsel.com/api/");
const keywordSearch = writable("");
const isShowMap = writable(false);
const dataMap = writable({
  variabel_id: "",
  kode_prov: "",
  kode_kab: "",
  kode_kec: "",
  kode_desa: ""
});
export {
  dataMap as d,
  isShowMap as i,
  keywordSearch as k,
  urlApi as u
};
