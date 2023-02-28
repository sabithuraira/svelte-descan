<script>
	import { redirect } from '@sveltejs/kit';
    
    let keyword = ""
</script>

<header class="wrapper bg-soft-primary">
    <nav class="navbar navbar-expand-lg center-logo bg-image position-absolute navbar-dark"
        data-image-src="/images/img/photos/bg2.jpg">
        <div class="container justify-content-between align-items-center mx-1 " style="max-width:100%">

        <div class="d-flex flex-row w-100 justify-content-between align-items-center d-lg-none">
            <div class="navbar-brand py-2">
                <a href="/">
                    <img class="logo-dark" src="/images/logo/logofont.png" srcset="/images/logo/logofont.png 8x" alt="" />
                    <img class="logo-light" src="/images/logo/logofont.png" srcset="/images/logo/logofont.png 8x"
                    alt="" />
                </a>
            </div>

            <div class="navbar-other  ms-auto">
            <ul class="navbar-nav flex-row align-items-center">
                <li class="nav-item">
                <nav class="nav social social-white justify-content-end text-end">
                    <a href="https://www.facebook.com/people/Bps-Provinsi-Sumatera-Selatan/100015484759318/"
                    target="_blank" rel="noreferrer"><i class="uil uil-facebook-f"></i></a>
                    <a href="https://www.instagram.com/bpssumsel/?hl=en" target="_blank" rel="noreferrer"><i
                        class="uil uil-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UC-9WQN-5cNTVTGDF8Rkiu6A" target="_blank" rel="noreferrer"><i
                        class="uil uil-youtube"></i></a>
                </nav>
                </li>
                <li class="nav-item d-lg-none">
                <button class="hamburger offcanvas-nav-btn"><span></span></button>
                </li>
            </ul>
            </div>

        </div>

        <div class="navbar-collapse-wrapper d-flex flex-row align-items-center w-100">
            <div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
            <div class="navbar-brand  px-2">
                <a href="/">
                <img src="/images/logo/logofont.png" srcset="/images/logo/logofont.png 8x" alt="" />
                </a>
            </div>

            <div class="w-100 order-1 order-lg-0 d-lg-flex offcanvas-body">
                <ul class="navbar-nav">
                <li class="nav-item dropdown dropdown-mega">
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Menu</a>
                    <ul class="dropdown-menu mega-menu mega-menu-dark mega-menu-img">
                    <li class="mega-menu-content">
                        <ul class="row row-cols-1 row-cols-lg-5 gx-0 gx-lg-4 gy-lg-2 list-unstyled">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                        <li class="col"><a class="dropdown-item" href="#">
                            <figure class="rounded lift d-none d-lg-block"><img src="/images/img/demos/mi1.jpg"
                                srcset="/images/img/demos/mi1@2x.jpg 2x" alt=""></figure>
                            <span class="d-lg-none">Monograph</span>
                            </a></li>
                        <li class="col">
                            
                    <!-- svelte-ignore a11y-invalid-attribute -->
                            <a class="dropdown-item" href="#">
                            <figure class="rounded lift d-none d-lg-block"><img src="/images/img/demos/mi2.jpg"
                                srcset="/images/img/demos/mi2@2x.jpg 2x" alt=""></figure>
                            <span class="d-lg-none">Kemiskinan</span>
                            </a></li>
                        <li class="col">
                            
                    <!-- svelte-ignore a11y-invalid-attribute -->
                            <a class="dropdown-item" href="#">
                            <figure class="rounded lift d-none d-lg-block"><img src="/images/img/demos/mi3.jpg"
                                srcset="/images/img/demos/mi3@2x.jpg 2x" alt=""></figure>
                            <span class="d-lg-none">Pengurus</span>
                            </a></li>
                        </ul>
                    </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://sumsel.bps.go.id" target="_blank" rel="noreferrer">Official Web</a>
                </li>
                </ul>
            </div>
            <div class="w-100 order-3 order-lg-2 d-lg-flex offcanvas-body text-end">
                <ul class="navbar-nav ms-auto me-0 ">
                <li>
                    <aside class="col-lg-12 sidebar">
                    <form class="search-form" action="/search?keyword={keyword}">
                        <div class="form-floating mb-0" style="border-color:white">
                        <input id="search-form" type="text" class="form-control text-white" placeholder="Search"
                            style="background-color: transparent; border-color: #ffffff81" 
                            bind:value={keyword}>
                        <label for="search-form" class=" text-white">Search</label>
                        </div>
                    </form>
                    </aside>
                </li>
                <li class="text-end  d-none d-lg-block navbar-other">
                    <nav class="nav social social-white mt-2">
                    <a href="https://www.facebook.com/people/Bps-Provinsi-Sumatera-Selatan/100015484759318/"
                        target="_blank" rel="noreferrer"><i class="uil uil-facebook-f"></i></a>
                    <a href="https://www.instagram.com/bpssumsel/?hl=en" target="_blank" rel="noreferrer"><i
                        class="uil uil-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UC-9WQN-5cNTVTGDF8Rkiu6A" target="_blank" rel="noreferrer"><i
                        class="uil uil-youtube"></i></a>
                    </nav>
                </li>
                </ul>
            </div>
            <div class="offcanvas-body order-4 mt-auto">
                <div class="d-lg-none mt-auto pt-6 pb-6 order-4">
                <a href="mailto:first.last@email.com" class="link-inverse">info@email.com</a>
                <br /> 00 (123) 456 78 90 <br />
                <nav class="nav social social-white mt-4">
                    <a href="https://www.facebook.com/people/Bps-Provinsi-Sumatera-Selatan/100015484759318/"
                    target="_blank" rel="noreferrer"><i class="uil uil-facebook-f"></i></a>
                    <a href="https://www.instagram.com/bpssumsel/?hl=en" target="_blank" rel="noreferrer"><i
                        class="uil uil-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UC-9WQN-5cNTVTGDF8Rkiu6A" target="_blank" rel="noreferrer"><i
                        class="uil uil-youtube"></i></a>
                </nav>
                </div>
            </div>
            </div>
        </div>
        </div>
    </nav>
</header>