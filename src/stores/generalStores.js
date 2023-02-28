import { readable, writable } from 'svelte/store';

export const urlApi = readable('https://descan.bpssumsel.com/api/');
export const keywordSearch = writable("");
