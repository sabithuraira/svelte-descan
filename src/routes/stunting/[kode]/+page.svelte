<script>
  // @ts-nocheck
  import PreLoader from "../../../components/navigation/PreLoader.svelte";
  import Header from "../../../components/navigation/Header.svelte";
  import TopProfile from "../../../components/navigation/TopProfile.svelte";
  import Body from "../../../components/stunting/Body.svelte";
  import Footer from "../../../components/navigation/Footer.svelte";
  import BackToTop from "../../../components/navigation/BackToTop.svelte";

  import { onMount } from "svelte";
  import axios from "axios";

  /** @type {import('./$types').PageData} */
  export let data;

  import {
    infoWilayah,
    parentWilayah,
    childWilayah,
    deskripsi,
  } from "../../../stores/wilayahStores";
	import { pengurusLast } from '../../../stores/pengurusStores';
  import { urlApi } from "../../../stores/generalStores";

  let preloader = true;
  let info_wilayah = {
    kode_prov: "",
    kode_kab: "",
    kode_kec: "",
    kode_desa: "",
    kode_wilayah: "",
    nama: "",
    nama_prov: "",
    nama_kab: "",
    nama_kec: "",
  };

  infoWilayah.subscribe((value) => {
    if (value.kode_wilayah) {
      info_wilayah = value;
    }
  });

  const loadWilayah = async () => {
    if (data.kode != info_wilayah.kode_wilayah) {
      await axios
        .get(`${$urlApi}wilayah/${data.kode}/show`)
        .then(({ data }) => {
          infoWilayah.set(data.datas.result);
          parentWilayah.set(data.datas.info_induk);
          childWilayah.set(data.datas.info_child);
        })
        .catch(({ response }) => {
          console.error(response);
        });

      await axios
        .get(`${$urlApi}wilayah/${data.kode}/deskripsi`)
        .then(({ data }) => {
          deskripsi.set(data.datas.deskripsi);
        })
        .catch(({ response }) => {
          console.error(response);
        });

			await axios
				.get(`${$urlApi}pengurus/${data.kode}/last`)
				.then(({data})=>{
					pengurusLast.set(data.datas);
				}).catch(({ response })=>{
					console.error(response)
				})
    }
  };

  const loadJS = () => {
    const pluginsJS = document.createElement("script");
    pluginsJS.setAttribute("src", "/sandbox/js/plugins.js");
    document.head.appendChild(pluginsJS);

    const themeJS = document.createElement("script");
    themeJS.setAttribute("src", "/sandbox/js/theme.js");
    document.head.appendChild(themeJS);

    setTimeout(() => {
      theme.init();
      TyperSetup();
    }, 100);
  };

  onMount(() => {
    loadWilayah()
      .then(() => setTimeout(() => loadJS(), 100))
      .then(() => (preloader = false));
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/sandbox/css/plugins.css" />
  <link rel="stylesheet" href="/sandbox/css/style.css" />
  <style>
    .preloader {
      align-items: center;
      background: linear-gradient(rgba(53, 147, 255, 1), rgba(218, 33, 255, 1));
      display: flex;
      height: 100vh;
      justify-content: center;
      left: 0;
      position: fixed;
      top: 0;
      transition: opacity 0.2s linear;
      width: 100%;
      z-index: 9999;
      opacity: 1;
      transform: opacity 1s linear;
    }
  </style>
</svelte:head>

<div class="content-wrapper">
  {#if preloader}
    <PreLoader />
  {/if}
  <Header kode={$infoWilayah.kode_wilayah} />
  <TopProfile />
  <Body kode={data.kode} />
</div>
<Footer />
<BackToTop />
