import { writable } from 'svelte/store';

export const infrastrukturKesehatan = writable([]);
// export const infrastruktur_kesehatan = writable([]);
export const dataKesehatan = writable({
    saranaUkbm: [],
    tenagaKesehatan: [],
    klb: []
});