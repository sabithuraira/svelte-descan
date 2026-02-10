

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.2b758be1.js","_app/immutable/chunks/scheduler.2fd4bc5d.js","_app/immutable/chunks/index.b289cdaf.js"];
export const stylesheets = [];
export const fonts = [];
