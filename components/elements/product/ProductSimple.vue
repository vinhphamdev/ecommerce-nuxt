<template lang="html">
    <div class="ps-product ps-product--simple">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="`${baseUrl}${product.thumbnail.url}`"
                    alt="martfury"
                />
            </nuxt-link>
            <ul class="ps-product__actions">
                <li>
                    <a
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Read More"
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
                    >
                        <i class="icon-eye"></i>
                    </a>
                </li>
                <li>
                    <a
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Add to wishlist"
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
                    >
                        <i class="icon-chart-bars"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="ps-product__container">
            <nuxt-link to="/shop">
                <a class="ps-product__vendor">{{ product.vendor }}</a>
            </nuxt-link>
            <div class="ps-product__content">
                <nuxt-link :to="`/product/${product.id}`">
                    <a class="ps-product__title">{{ product.title }}</a>
                </nuxt-link>
                <div class="ps-product__rating">
                    <Rating />
                    <span>{{ product.ratingCount }}</span>
                </div>
                <p v-if="product.sale === true" class="ps-product__price sale">
                    ${{ product.price.toFixed(2) }}
                    <del class="ml-2">
                        ${{ product.sale_price.toFixed(2) }}
                    </del>
                </p>
                <p v-else className="ps-product__price">
                    ${{ product.price.toFixed(2) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { baseUrl } from '../../../repositories/Repository';
import Rating from '../Rating';
import { mapState } from 'vuex';

export default {
    name: 'ProductSimple',
    components: { Rating },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {}
        }
    },

    computed: {
        ...mapState({
            currency: state => state.app.currency
        }),
        baseUrl() {
            return baseUrl;
        }
    },
    data: () => ({
        productRating: 5,
        productModal: false,
        productPreload: true,
        isImageLoaded: false
    }),

    methods: {
        handleAddToCart() {
            let item = this.product;
            item.quantity = 1;
            this.$store.commit('cart/addItem', { ...item });
            this.$notify({
                group: 'cartAddItem',
                title: 'Success!',
                text: `${this.product.name} has been added to your cart!`
            });
        },

        clean(group) {
            this.$notify({ group, clean: true });
        }
    }
};
</script>
