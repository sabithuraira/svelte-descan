import { writable } from 'svelte/store';

export const infoWilayah = writable({
	kode_prov: '',
	kode_kab: '',
	kode_kec: '',
	kode_desa: '',
	kode_wilayah: '',
	nama: '',
	nama_prov: '',
	nama_kab: '',
	nama_kec: ''
});
export const parentWilayah = writable([]);
export const childWilayah = writable([]);
export const deskripsi = writable("");
