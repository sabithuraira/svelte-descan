<script>
// @ts-nocheck
    export let kodeWilayah;
    export let name;
</script>

<div class="card mx-2 my-2">
    <div class="card-body py-2 px-2">
    <p class="text-center mb-1" style="font-size: 12px">{ name }</p>
    <figure
        class="img-responsive overlay overlay-1 hover-scale rounded mb-0"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="" data-bs-original-title="{ name }">
        <a href="/profile/{kodeWilayah}">
            <img class="img-responsive"
                src="{ `/images/kabs-logo/logo${kodeWilayah.substring(0,4)}.png` }"
                alt=""
                style="max-height: 80px; width: auto" />
                <span class="bg"></span>
        </a>
    </figure>
    </div>
    <!--/.card-body -->
</div>
