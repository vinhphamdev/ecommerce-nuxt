<template lang="html">
    <div class="ps-product ps-product--inner">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="`${baseUrl}${product.thumbnail.url}`"
                    alt="martfury"
                />
            </nuxt-link>
            <div v-if="isSale === true" class="ps-product__badge">sale</div>

            <ul class="ps-product__actions">
                <li>
                    <a
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Add to cart"
                        @click.prevent="handleAddToCart"
                    >
                        <i class="icon-bag2"></i>
                    </a>
                </li>
                <li>
                    <a
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Quick View"
                        @click.prevent="quickviewDialog = true"
                    >
                        <i class="icon-eye"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Add to wishlist"
                        @click.prevent="handleAddItemToWishlist"
                    >
                        <i class="icon-heart"></i>
                    </a>
                </li>
                <li>
                    <a
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Compare"
                        @click.prevent="handleAddItemToCompare"
                    >
                        <i class="icon-chart-bars"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="ps-product__container">
            <nuxt-link to="/shop" class="ps-product__vendor">
                {{ product.vendor }}
            </nuxt-link>
            <div class="ps-product__content">
                <p
                    v-if="product.is_sale === true"
                    class="ps-product__price sale"
                >
                    {{ currency }}{{ product.price }}
                    <del class="ml-1">
                        {{ currency }}{{ product.sale_price }}</del
                    >
                    <small>18% off</small>
                </p>
                <p v-else class="ps-product__price">
                    {{ currency }}{{ product.price }}
                </p>
                <nuxt-link
                    :to="`/product/${product.id}`"
                    class="ps-product__title"
                >
                    {{ product.title }}
                </nuxt-link>
                <div class="ps-product__rating">
                    <rating />
                    <span>{{ product.ratingCount }}</span>
                </div>
                <div class="ps-product__progress-bar ps-progress">
                    <div class="ps-progress__value">
                        <span :style="{ width: '80%' }"></span>
                    </div>
                    <p
                        v-if="product.inventory - product.depot >= 0"
                        class="mb-0"
                    >
                        Sold: {{ product.inventory - product.depot }}
                    </p>
                    <p v-else class="mb-0">Sold: {{ product.inventory }}</p>
                </div>
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
import { baseUrl } from '~/repositories/Repository';
import Rating from '../Rating';
import ProductQuickview from '~/components/elements/detail/ProductQuickview';

export default {
    name: 'ProductInner',
    components: { ProductQuickview, Rating },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {}
        }
    },

    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems,
            currency: state => state.app.currency
        }),
        baseUrl() {
            return baseUrl;
        },
        isSale() {
            if (this.product.is_sale) {
                return true;
            }
            return false;
        }
    },

    data: () => ({
        productRating: 5,
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
        quickviewDialog: false
    }),
    methods: {
        handleAddToCart() {
            let item = {
                id: this.product.id,
                quantity: 1,
                price: this.product.price
            };
            this.$store.dispatch('cart/addProductToCart', item);
            this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.title} has been added to your cart!`
            });
        },

        handleAddItemToWishlist() {
            let item = {
                id: this.product.id
            };

            this.$store.dispatch('wishlist/addItemToWishlist', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Add to wishlist!',
                text: `${this.product.title} has been added to your wishlist !`
            });
        },

        handleAddItemToCompare() {
            let item = {
                id: this.product.id
            };
            this.$store.dispatch('compare/addItemToCompare', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Add to compare!',
                text: `${this.product.title} has been added to your compare !`
            });
        },

        async getCartProduct(products) {
            let listOfIds = [];
            products.forEach(item => {
                listOfIds.push(item.id);
            });
            const response = await this.$store.dispatch(
                'product/getCartProducts',
                listOfIds
            );
            if (response) {
                this.$store.commit('cart/setLoading', false);
            }
        }
    }
};
</script>
<style lang="scss">
.ps-product--inner {
    padding: 0;
    border: none;

    .ps-product__price {
        small {
            margin-left: 0;
        }
    }
}
</style>