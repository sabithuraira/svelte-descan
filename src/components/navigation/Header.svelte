<script>
  // @ts-nocheck
  export let kode;
</script>

<header class="wrapper bg-soft-primary">
	<nav class="navbar navbar-expand-lg center-logo bg-image position-absolute navbar-dark"
		data-image-src="/images/img/photos/bg2.jpg">
		<div class="container justify-content-between align-items-center mx-1 " style="max-width:100%">
			<div class="d-flex flex-row w-100 justify-content-between align-items-center d-lg-none">
				<div class="navbar-brand py-2">
				<a href="/">
					<img
					class="logo-dark"
					src="/images/logo/logofont.png"
					srcset="/images/logo/logofont.png 1x"
					alt=""
					/>
					<img
					class="logo-light"
					src="/images/logo/logofont.png"
					srcset="/images/logo/logofont.png 1x"
					alt=""
					/>
				</a>
				</div>

				<div class="navbar-other  ms-auto">
				<ul class="navbar-nav flex-row align-items-center">
					<li class="nav-item">
					<nav class="nav social social-white justify-content-end text-end">
						<a href="https://www.facebook.com/people/Bps-Provinsi-Sumatera-Selatan/100015484759318/"
						target="_blank"><i class="uil uil-facebook-f" /></a>
						<a
						href="https://www.instagram.com/bpssumsel/?hl=en"
						target="_blank"><i class="uil uil-instagram" /></a
						>
						<a
						href="https://www.youtube.com/channel/UC-9WQN-5cNTVTGDF8Rkiu6A"
						target="_blank"><i class="uil uil-youtube" /></a
						>
					</nav>
					</li>
					<li class="nav-item d-lg-none">
					<button class="hamburger offcanvas-nav-btn"><span /></button>
					</li>
				</ul>
				</div>
			</div>

		<div class="navbar-collapse-wrapper d-flex flex-row align-items-center w-100">
			<div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
				<div class="navbar-brand px-2">
					<a href="/">
						<img src="/images/logo/logofont.png" srcset="/images/logo/logofont.png 1x" alt="header-logo"/>
					</a>
				</div>

			<div class="w-100 order-1 order-lg-0 d-lg-flex offcanvas-body">
				<ul class="navbar-nav">
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#">Informasi Umum</a>
						<ul class="dropdown-menu">
							<li class="nav-item">
								<a class="dropdown-item" href="/profile/{kode}">Profile</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/monograph/{kode}">Monograph</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/topografi/{kode}">Topografi</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/organisasi/{kode}">Organisasi</a>
							</li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Kependudukan</a>
						<ul class="dropdown-menu">
							<li class="nav-item">
								<a class="dropdown-item" href="/kemiskinan/{kode}">Kemiskinan</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/stunting/{kode}">Stunting</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/penduduk/{kode}">Penduduk</a>
							</li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Sarana dan Prasarana</a>
						<ul class="dropdown-menu">
							<li class="nav-item">
								<a class="dropdown-item" href="/sarana_pemerintahan/{kode}">Pemerintahan</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/sarana_kesehatan/{kode}">Kesehatan</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/sarana_pendidikan/{kode}">Pendidikan</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/sarana_ekonomi/{kode}">Ekonomi</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/sarana_ibadah/{kode}">Ibadah</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/sarana_transportasi/{kode}">Tranportasi</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/sarana_komunikasi_informasi/{kode}">Komunikasi dan Informasi</a>
							</li>
							<li class="nav-item">
								<a class="dropdown-item" href="/sarana_olahraga/{kode}">Olahraga</a>
							</li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Ekonomi</a>
						<ul class="dropdown-menu">
							<li class="nav-item">
								<a class="dropdown-item" href="/umkm/{kode}">UMKM</a>
							</li>
						</ul>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/tematik/{kode}">Tematik</a>
					</li>
				</ul>
			</div>
			<div
				class="w-100 order-3 order-lg-2 d-lg-flex offcanvas-body text-end"
			>
				<ul class="navbar-nav ms-auto me-0 ">
				<li class="text-end  d-none d-lg-block navbar-other">
					<nav class="nav social social-white mt-2">
					<a
						href="https://www.facebook.com/people/Bps-Provinsi-Sumatera-Selatan/100015484759318/"
						target="_blank"><i class="uil uil-facebook-f" /></a
					>
					<a
						href="https://www.instagram.com/bpssumsel/?hl=en"
						target="_blank"><i class="uil uil-instagram" /></a
					>
					<a
						href="https://www.youtube.com/channel/UC-9WQN-5cNTVTGDF8Rkiu6A"
						target="_blank"><i class="uil uil-youtube" /></a
					>
					</nav>
				</li>
				</ul>
			</div>
			<div class="offcanvas-body order-4 mt-auto">
				<div class="d-lg-none mt-auto pt-6 pb-6 order-4">
				<a href="mailto:first.last@email.com" class="link-inverse"
					>info@email.com</a
				>
				<br /> 00 (123) 456 78 90 <br />
				<nav class="nav social social-white mt-4">
					<a
					href="https://www.facebook.com/people/Bps-Provinsi-Sumatera-Selatan/100015484759318/"
					target="_blank"><i class="uil uil-facebook-f" /></a
					>
					<a
					href="https://www.instagram.com/bpssumsel/?hl=en"
					target="_blank"><i class="uil uil-instagram" /></a
					>
					<a
					href="https://www.youtube.com/channel/UC-9WQN-5cNTVTGDF8Rkiu6A"
					target="_blank"><i class="uil uil-youtube" /></a
					>
				</nav>
				</div>
			</div>
			</div>
		</div>
		</div>
	</nav>
</header>
