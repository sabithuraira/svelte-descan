<script>
	import { onMount } from 'svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	onMount(() => {
		injectSpeedInsights();
	});
</script>

<slot />
