import { c as create_ssr_component, e as escape } from "./ssr.js";
import { w as writable } from "./index2.js";
const PreLoader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dot = ".";
  return `<div class="preloader"><p class="display-1 text-white">Memuat${escape(dot)}</p></div>`;
});
const infoWilayah = writable({});
const deskripsi = writable("");
export {
  PreLoader as P,
  deskripsi as d,
  infoWilayah as i
};
