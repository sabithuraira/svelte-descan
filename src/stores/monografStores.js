import { writable } from 'svelte/store';

export const monografData = writable({
    luas_wilayah: [], 
    ketinggian_wilayah: [], 
    batas_wilayah: [],
    jumlah_penduduk: [], 
    jumlah_keluarga: [], 
    jumlah_infrastruktur_pendidikan: [],
    jumlah_infrastruktur_kesehatan: [],
    jumlah_infrastruktur_ibadah: [],
    informasi_internet: [],
    jumlah_lembaga_keuangan: [],
    jumlah_infrastruktur_ekonomi: [],
    jumlah_industri: [],
    keunggulan_wilayah: [],
    pangan_unggulan: [],
    hortikultura_unggulan: [],
    penyandang_disabilitas: []
});