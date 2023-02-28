import { writable } from 'svelte/store';
import type { Wilayah } from '../models/Wilayah';

export const infoWilayah = writable<Wilayah>({
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

export const parentWilayah = writable<Wilayah[]>([]);
export const childWilayah = writable<Wilayah[]>([]);
export const deskripsi = writable<string>("");
