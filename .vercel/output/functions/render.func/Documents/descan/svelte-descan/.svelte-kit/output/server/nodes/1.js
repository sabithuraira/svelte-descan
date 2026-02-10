

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.72fc899c.js","_app/immutable/chunks/scheduler.2fd4bc5d.js","_app/immutable/chunks/index.b289cdaf.js","_app/immutable/chunks/singletons.de0853bf.js","_app/immutable/chunks/index.b47dfdf0.js"];
export const stylesheets = [];
export const fonts = [];
