<script>
    export let kode_wilayah = ''
    export let name_page = ''
</script>

<section class="wrapper bg-light wrapper-border">
    <div class="container  pt-6">
        <div class="row gx-lg-8 gx-xl-12 gy-4 gy-lg-0">
        <div class="col-lg-8 align-self-center">
            <div class="blog-filter filter">
            <ul>
                <li><a class="{name_page=='monograph' ? 'active' : ''}" href="/monograph/{kode_wilayah}">Monograph</a></li>
                <li><a class="{name_page=='kemiskinan' ? 'active' : ''}" href="/kemiskinan/{kode_wilayah}">Kemiskinan</a></li>
                <li><a class="{name_page=='stunting' ? 'active' : ''}" href="/stunting/{kode_wilayah}">Stunting</a></li>
                <li><a class="{name_page=='penduduk' ? 'active' : ''}" href="/penduduk/{kode_wilayah}">Penduduk</a></li>
                <li><a class="{name_page=='umkm' ? 'active' : ''}" href="/umkm/{kode_wilayah}">UMKM</a></li>
                <li><a class="{name_page=='pengurus' ? 'active' : ''}"  href="/tematik/{kode_wilayah}">Pengurus</a></li>
                <li><a class="{name_page=='tematik' ? 'active' : ''}"  href="/tematik/{kode_wilayah}">Peta Tematik</a></li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</section>