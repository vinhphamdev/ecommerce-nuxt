<template lang="html">
    <div class="ps-product--cart">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="`${baseUrl}${product.thumbnail.url}`"
                    alt="martfury"
                />
            </nuxt-link>
        </div>
        <div class="ps-product__content">
            <nuxt-link :to="`/product/${product.id}`">
                <a class="ps-product__title">{{ product.title }}</a>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { baseUrl } from '~/repositories/Repository';
export default {
    name: 'ProductShoppingCart',
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        baseUrl() {
            return baseUrl;
        }
    }
};
</script>

<style lang="scss" scoped></style>
