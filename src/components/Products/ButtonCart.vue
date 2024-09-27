<script>
export default {
    name: "ButtonCart",
    props: {
        articlesInCart: {
            type: Number
        }
    }
}

</script>

<template>
    <p>
        <button class="btn btn-primary  position-relative" type="button" data-bs-toggle="modal" data-bs-target="#cartModal">
            <i class="bi bi-cart"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ this.articlesInCart }}
                <span class="visually-hidden">Articulos en carrito</span>
            </span>
        </button>
    </p>
</template>