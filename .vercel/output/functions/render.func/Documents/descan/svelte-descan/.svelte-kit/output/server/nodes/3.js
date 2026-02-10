

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/idm/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.ed1e6c1b.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.2fd4bc5d.js","_app/immutable/chunks/index.b289cdaf.js","_app/immutable/chunks/generalStores.fd1a65ab.js","_app/immutable/chunks/index.b47dfdf0.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/BackToTop.91a4e964.js","_app/immutable/chunks/auto.8437a462.js"];
export const stylesheets = [];
export const fonts = [];
