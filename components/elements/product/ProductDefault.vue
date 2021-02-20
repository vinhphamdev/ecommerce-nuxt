<template lang="html">
    <div class="ps-product pa">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img v-if="product.images.length > 0"
                    :src="`${product.images[0].url}`"
                    alt="martfury"
                    class="thumbnail-product"
                />
            </nuxt-link>
            <ul class="ps-product__actions">
                <li>
                    <button
                        data-toggle='tooltip'
                        data-placement='top'
                        title='Add to cart'
                        @click='handleAddToCart'
                    >
                        <i class='icon-bag2'></i>
                    </button>
                </li>
            </ul>
        </div>
        <div class="ps-product__container">
            <nuxt-link to="/shop" class="ps-product__vendor">
                {{ product.vendor ? product.vendor.name : ''}}
            </nuxt-link>
            <div class="ps-product__content">
                <nuxt-link
                    :to="`/product/${product.id}`"
                    class="ps-product__title"
                >
                    {{ product.name }}
                </nuxt-link>
                  <div class="ps-product__rating">
                    <rating />
                    <span>{{ product.ratingCount }}</span>
                </div>
          
                <p class="ps-product__price">
                    {{ currency }}{{ product.price }}
                </p>
            </div>
            <div class="ps-product__content hover">
                <nuxt-link :to="`/product/${product.id}`">
                    <a class="ps-product__title">{{ product.name }}</a>
                </nuxt-link>
                  <div class="ps-product__rating">
                    <rating />
                    <span>{{ product.ratingCount }}</span>
                </div>
      
                <p class="ps-product__price">${{ product.price }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';
import Rating from '../Rating';
import ProductQuickview from '~/components/elements/detail/ProductQuickview';

export default {
    components: { ProductQuickview, Rating },
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
        baseUrl() {
            return baseUrl;
        },
    },

    data: () => ({
        productRating: 5,
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
    }),
    methods: {
        handleAddToCart() {
            let item = {
                id: this.product.id,
                quantity: 1,
                price: this.product.price,
                url: this.product.images[0].url,
                name: this.product.name,
                vendorId: this.product.vendor.id,
            };
            this.$store.dispatch('cart/addProductToCart', item);
            this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.name} has been added to your cart!`,
            });
        },

        async getCartProduct(products) {
            let listOfIds = [];
            products.forEach((item) => {
                listOfIds.push(item.id);
            });
            const response = await this.$store.dispatch(
                'product/getCartProducts',
                listOfIds
            );
            if (response) {
                this.$store.commit('cart/setLoading', false);
            }
        },
    },
};
</script>
<style lang='scss' >
.thumbnail-product {
    width: 188px;
    height: 188px;
    object-fit: cover;
}

.pa {
    padding: 8px;
}
</style>
