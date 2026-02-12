<script>
	import { onMount } from 'svelte';

	onMount(() => {
		import('@vercel/speed-insights/sveltekit').then(({ injectSpeedInsights }) => {
			injectSpeedInsights();
		});
	});
</script>

<slot />
