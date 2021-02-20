<template lang="html">
    <div class="ps-product--cart-mobile">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="product.images[0].url"
                    alt="martfury"
                />
            </nuxt-link>
        </div>
        <div class="ps-product__content">
            <span
                class="ps-product__remove"
                @click="handleRemoveProductFromCart(product)"
            >
                <i class="icon-cross"></i>
            </span>
            <nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
                {{ product.name }}
            </nuxt-link>
            <p>
                <strong>Sold by:</strong>
                {{ product.vendor.name }}
            </p>
            <small v-if="quantity !== null">
                {{ quantity(product.id) }} x {{currency}} {{ product.price }}
            </small>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    name: 'ProductMiniCart',
    props: {
        product: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        ...mapState({
            total: (state) => state.cart.total,
            cartProducts: (state) => state.product.cartProducts,
            currency: (state) => state.app.currency,
        }),
        quantity() {
            if (this.cartItems !== null) {
                const cartItem = this.cartItems.find(
                    (item) => item.id === this.product.id
                );
                if (cartItem !== undefined) {
                    return cartItem.quantity;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        // ...mapGetters({
        //     cartItems: 'cart/getCart'
        // }),
        baseUrl() {
            return baseUrl;
        },
        ...mapGetters({
            cartItems: 'cart/getCart'
        }),
    },
    methods: {
        async loadCartProducts() {
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            let queries = [];
            cookieCart.cartItems.forEach((item) => {
                queries.push(item.id);
            });
            if (this.cartItems.length > 0) {
                const response = await this.$store.dispatch(
                    'product/getCartProducts',
                    queries
                );
                if (response) {
                    this.$store.commit('cart/setLoading', false);
                }
            } else {
                this.$store.commit('product/setCartProducts', null);
            }
        },
        handleRemoveProductFromCart(product) {
            const cartItem = this.cartItems.find(
                (item) => item.id === product.id
            );
            this.$store.dispatch('cart/removeProductFromCart', cartItem);
            this.$store.commit('cart/setLoading', true);
            this.loadCartProducts();
        },
    },
};
</script>

<style lang="scss" scoped></style>
