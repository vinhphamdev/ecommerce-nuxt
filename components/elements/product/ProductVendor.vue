<template lang="html">
    <div class="ps-product">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
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
        <v-dialog v-model="quickviewDialog" width="1200">
            <div class="ps-dialog">
                <a
                    class="ps-dialog__close"
                    @click.prevent="quickviewDialog = false"
                >
                    <i class="icon icon-cross"></i>
                </a>
                <product-quickview :product="product" />
            </div>
        </v-dialog>
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
        productRating: 5,
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
        quickviewDialog: false,
    }),
};
</script>
<style lang="scss" scope>
.thumbnail-product {
    width: 188px;
    height: 188px;
    object-fit: cover;
}
</style>
