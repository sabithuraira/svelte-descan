import { readable, writable } from 'svelte/store';

export const urlApi = readable('https://descan.bpssumsel.com/api/');
export const keywordSearch = writable("");

export const isShowMap = writable(false);
export const dataMap = writable({
    variabel_id: '',
    kode_prov: '',
    kode_kab: '',
    kode_kec: '',
    kode_desa: ''
});
