<template lang="html">
    <div class="ps-cart--mini">
        <div class="header__extra">
            <i class="icon-bag2"></i>
            <span>
                <i>{{ total }}</i>
            </span>
        </div>
        <div v-if="total > 0" class="ps-cart__content">
            <div class="ps-cart__items">
                <div v-if="loading">
                    <loading />
                </div>
                <div v-else>
                    <product-mini-cart
                        v-for="product in cartProducts"
                        :product="product"
                        :key="product.id"
                    />
                </div>
            </div>
            <div class="ps-cart__footer">
                <h3>
                    {{ $t('header.miniCart.total') }}
                    <strong>${{ amount }}</strong>
                </h3>
                <figure>
                    <div>
                        <nuxt-link to="/account/shopping-cart" class="ps-btn">
                            {{ $t('header.miniCart.viewCart') }}
                        </nuxt-link>
                    </div>
                    <div>
                        <nuxt-link to="/account/checkout" class="ps-btn">
                            {{ $t('header.miniCart.checkout') }}
                        </nuxt-link>
                    </div>
                </figure>
            </div>
        </div>
        <div v-else class="ps-cart__content">
            <div class="ps-cart__items no-products">
                {{ $t('header.miniCart.noProduct') }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ProductMiniCart from '~/components/elements/product/ProductMiniCart';
import Loading from '~/components/elements/commons/Loading';

export default {
    name: 'MiniCart',
    components: { Loading, ProductMiniCart },
    computed: {
        ...mapState({
            total: state => state.cart.total,
            amount: state => state.cart.amount,
            loading: state => state.cart.loading,
            cartProducts: state => state.product.cartProducts
        }),
        ...mapGetters({
            cartItems: 'cart/getCart'
        }),
    }
};
</script>

<style lang="scss" scoped>
.ps-cart__items {
    min-height: 150px;
    &.no-products {
        min-height: 50px;
    }
}
.ps-cart__footer {
    figure {
        display: flex;
        flex-flow: row nowrap;
        margin-right: 0 -5px;

        > * {
            flex-basis: 100%;
            max-width: 50%;
            padding: 0 5px;
        }

        .ps-btn {
            width: 100%;
            text-align: center;
        }
    }
}
</style>
