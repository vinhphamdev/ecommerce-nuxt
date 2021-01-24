<template lang="html">
    <table class="table ps-table--responsive ps-table--shopping-cart">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in cartItems" :key="item.id">
                <td data-label="Product">
                    <product-shopping-cart :product="item" />
                </td>
                <td data-label="Price" class="price">$ {{ item.price }}</td>
                <td data-label="Quantity">
                    <div class="form-group--number">
                        <button class="up" @click="increase(item)">+</button>
                        <button class="down" @click="decrease(item)">-</button>
                        <input
                            class="form-control"
                            type="text"
                            placeholder="1"
                            v-model="cartItems[index].quantity"
                        />
                    </div>
                </td>
                <td data-label="Total">
                    ${{
                        (cartItems[index].quantity * item.price).toFixed(2)
                    }}
                </td>
                <td data-label="Action">
                    <a
                        href="#"
                        @click.prevent="handleRemoveProductFromCart(item)"
                    >
                        <i class="icon-cross"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';

export default {
    name: 'TableShoppingCart',
    components: { ProductShoppingCart },
    computed: {
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
            total: (state) => state.cart.total,
            amount: (state) => state.cart.amount,
            cartProducts: (state) => state.product.cartProducts,
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
                await this.$store.dispatch('product/getCartProducts', queries);
            } else {
                this.$store.commit('product/setCartProducts', null);
            }
        },
        handleRemoveProductFromCart(product) {
            const cartItem = this.cartItems.find(
                (item) => item.id === product.id
            );

            this.$store.dispatch('cart/removeProductFromCart', cartItem);
            this.loadCartProducts();
        },

        increase(it) {
            this.$store.commit('cart/increaseItemQuantity', it);
        },

        decrease(it) {
            this.$store.commit('cart/decreaseItemQuantity', it);
        },
    },
};
</script>

<style lang="scss" scoped></style>
