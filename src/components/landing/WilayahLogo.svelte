<script>
// @ts-nocheck
    export let kodeWilayah;
    export let name;
</script>

<div class="card mx-2 my-2">
    <div class="card-body p-2">
    <figure
        class="img-responsive overlay overlay-1 hover-scale rounded mb-0"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="" data-bs-original-title="{ name }">
        <a href="/monograph/{kodeWilayah}">
            <img class="img-responsive"
                src="{ `/images/kabs-logo/logo${kodeWilayah}.png` }"
                alt=""
                style="max-height: 80px; width: auto" />
                <span class="bg"></span>
        </a>
        <figcaption>
            <small class="mdi md-map from-top"></small>
        </figcaption>
    </figure>
    </div>
    <!--/.card-body -->
</div>
