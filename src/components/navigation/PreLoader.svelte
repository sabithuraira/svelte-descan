<script>
  // @ts-nocheck
  import { onMount } from 'svelte';

  let dot = '.';

  onMount(() => {
    const interval = setInterval(() => {
      dot = dot + '.';
      if (dot === '....') {
        dot = '.';
      }
    }, 500);

    return () => clearInterval(interval);
  });

</script>

<div class="preloader">
  <p class="display-1 text-white">Memuat{dot}</p>
</div>
