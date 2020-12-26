<template lang="html">
    <div class="ps-product--cart">
        <div class="ps-product__thumbnail">
            <nuxt-link to="/product/pid">
                <img :src="product.thumbnail" alt="martfury" />
            </nuxt-link>
        </div>
        <div class="ps-product__content">
            <nuxt-link to="/product/[pid]">
                <a class="ps-product__title">{{ product.title }}</a>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {}
        }
    }
};
</script>
