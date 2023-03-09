import { writable } from 'svelte/store';

export const topografiData = writable({
    luas_wilayah: "0", 
    topografi: "0", 
    koordinat_wilayah: [],
    ketinggian_wilayah: "0", 
    berbatasan_laut: "0", 
    kawasan_hutan: "0",
    pemanfaatan_laut: "0",
    fungsi_hutan: "0"
});