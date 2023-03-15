import { writable } from 'svelte/store';

export const infrastrukturTransportasi = writable({
    saranaTransportasi: {},
    angkutanUmum: {},
    angkutanUmumRutin: {},
    angkutanUmumJam: {},
});