import { writable } from 'svelte/store';

export const pengurusLast = writable({
    kode_prov: '',
    kode_kab: '',
    kode_kec: '',
    kode_desa: '',
    nama_ketua: '',
    path_foto: '',
    foto: '',
    nama_wakil: '',
    nama_sekretaris: '',
    pengurus_lainnya: '',
    periode_awal_aktif: '',
    periode_akhir_aktif: '',
    status_aktif: 0,
    encId: ''
});