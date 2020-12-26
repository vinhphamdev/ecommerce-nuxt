<template lang="html">
    <div class="ps-product--horizontal">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="`${baseUrl}${product.thumbnail.url}`"
                    alt="martfury"
                />
            </nuxt-link>
        </div>
        <div class="ps-product__content">
            <nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
                {{ product.title }}
            </nuxt-link>
            <div class="ps-product__rating">
                <rating />
                <span>{{ product.ratingCount }}</span>
            </div>
            <p v-if="product.sale === true" class="ps-product__price sale">
                {{ currency }}{{ product.price.toFixed(2) }}
                <del class="ml-2">
                    {{ currency }}{{ product.sale_price.toFixed(2) }}</del
                >
            </p>
            <p v-else class="ps-product__price">
                {{ currency }}{{ product.price.toFixed(2) }}
            </p>
        </div>
    </div>
</template>

<script>
import Rating from '../Rating';
import { baseUrl } from '~/repositories/Repository';
import { mapState } from 'vuex';
export default {
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
            cartItems: state => state.cart.cartItems,
            currency: state => state.app.currency
        }),
        baseUrl() {
            return baseUrl;
        }
    }
};
</script>
