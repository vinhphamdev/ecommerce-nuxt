<template lang="html">
    <div class="ps-product">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/vendor/${product.id}`">
                <img v-if="product.avatar.url"
                    :src="`${product.avatar.url}`"
                    alt="martfury"
                    class="thumbnail-product"
                />
            </nuxt-link>
        </div>
        <div class="ps-product__container">
            <nuxt-link to="/shop" class="ps-product__vendor">
                {{ product.name }}
            </nuxt-link>
            <div class="ps-product__content">
                <nuxt-link
                    :to="`/product/${product.id}`"
                    class="ps-product__title"
                >
                    {{ product.name }}
                </nuxt-link>
          
        
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {},
        },
    },

    computed: {
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
            currency: (state) => state.app.currency,
        }),
    },

    data: () => ({
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
    }),
};
</script>
<style lang="scss" scope>
</style>
