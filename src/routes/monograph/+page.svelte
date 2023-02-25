<script>
	import Header from '../../components/navigation/Header.svelte';
	import Footer from '../../components/navigation/Footer.svelte';
	import Body from '../../components/monograph/Body.svelte';

	import { onMount } from 'svelte';

    onMount(() => {
		theme.stickyHeader();
		theme.subMenu();
		// theme.offCanvas();
		// theme.isotope();
		// theme.onepageHeaderOffset();
		// theme.anchorSmoothScroll();
		// theme.svgInject();
		theme.backgroundImage();
		// theme.backgroundImageMobile();
		// theme.imageHoverOverlay();
		// theme.rellax();
		theme.scrollCue();
		// theme.swiperSlider();
		// theme.lightbox();
		// theme.plyr();
		// theme.progressBar();
		// theme.pageProgress();
		// theme.counterUp();
		// theme.bsTooltips();
		// theme.bsPopovers();
		// theme.bsModal();
		// theme.iTooltip();
		// theme.forms();
		// theme.passVisibility();
		// theme.pricingSwitcher();
		// theme.textRotator();
		// theme.codeSnippet();
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/sandbox/css/plugins.css">
    <link rel="stylesheet" href="/sandbox/css/style.css">
	<script src="/sandbox/js/plugins.js"></script>
	<script src="/sandbox/js/theme.js"></script>
</svelte:head>

<div class="content-wrapper">
    <Header></Header>
    <Body></Body>
</div>

<Footer></Footer>

<div class="progress-wrap">
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
</div>
