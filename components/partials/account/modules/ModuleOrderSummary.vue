<template lang="html">
    <div class="ps-form__orders ps-block--checkout-order">
        <h3 v-if="shipping === false">Your Order</h3>
        <div class="ps-block--checkout-order">
            <div class="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>Total: $ {{ amount }}</strong>
                    </figcaption>
                </figure>
                <figure class="ps-block__items">
                    <nuxt-link
                        v-for="(item, index) in filteredCartItems"
                        :to="`/product/${item.id}`"
                        :key="item.id"
                        class="ps-product__title"
                    >
                        {{ item.name }}
                        <br />
                        {{ filteredCartItems[index].quantity }} x ${{
                            item.price.toFixed(2)
                        }}
                    </nuxt-link>
                </figure>
                <figure>
                    <figcaption>
                        <strong>{{ $t('header.miniCart.subTotal') }}</strong>
                        <small>$ {{ subtotal }}</small>
                    </figcaption>
                    <figcaption>
                        <strong>Tax</strong>
                        <small>{{ tax }}%</small>
                    </figcaption>
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ModuleOrderSummary',
    props: {
        shipping: {
            type: Boolean,
            default: () => false,
        },
    },
    computed: {
        ...mapState({
            filteredCartItems: (state) => state.cart.filteredCartItems,
            total: (state) => state.cart.total,
            amount: (state) => {
                let rs = 0
                state.cart.filteredCartItems.forEach((item) => {
                    rs += item.quantity * item.price
                })
                return rs
            subtotal: state => state.cart.subtotal,
            tax: state => state.cart.tax,
            },
            cartProducts: (state) => state.product.cartProducts,
        }),
    },
};
</script>

<style lang="scss" scoped></style>
