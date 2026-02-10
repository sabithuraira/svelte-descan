

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.3fff0f42.js","_app/immutable/chunks/scheduler.2fd4bc5d.js","_app/immutable/chunks/index.b289cdaf.js","_app/immutable/chunks/generalStores.fd1a65ab.js","_app/immutable/chunks/index.b47dfdf0.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
