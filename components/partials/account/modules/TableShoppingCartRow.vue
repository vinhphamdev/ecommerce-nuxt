<template lang="html">
    <tr>
        <td data-label="Product">
            <product-shopping-cart :product="item" />
        </td>
        <td data-label="Price" class="price">$ {{ item.price }}</td>
        <td data-label="Quantity">
            <div class="form-group--number">
                <button class="up" @click="increaseItemQuantity(item)">
                    +
                </button>
                <button class="down" @click="decreaseItemQuantity(item)">
                    -
                </button>
                <input
                    class="form-control"
                    type="text"
                    placeholder="1"
                    v-if="!isLoading"
                    v-model="quantity"
                />
            </div>
        </td>
        <td v-if="!isLoading" data-label="Total">
            ${{ (quantity * item.price).toFixed(2) }}
        </td>
        <td data-label="Action">
            <span class='pointer'  @click="handleRemoveProductFromCart(item)">
                <i class="icon-cross"></i>
            </span>
        </td>
    </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';

export default {
    name: 'TableShoppingCart',
    components: { ProductShoppingCart },
    props: {
        item: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/getCart',
            isLoading: 'cart/isLoading'
        }),
        quantity: {
            get: function() {
                return this.$store.getters['cart/getProductQuantityById'](
                    this.item.id
                );
            },
            set: function(value) {
                this.$store.dispatch('cart/updateItemQuantity', {
                    id: this.item.id,
                    quantity: value
                });
            }
        }
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
            this.$store.dispatch('cart/removeProductFromCart', product);
            this.loadCartProducts();
        },

        increaseItemQuantity(itemToIncrease) {
            this.$store.dispatch(
                'cart/increaseCartItemQuantity',
                itemToIncrease
            );
        },

        decreaseItemQuantity(itemToDecrease) {
            this.$store.dispatch(
                'cart/decreaseCartItemQuantity',
                itemToDecrease
            );
        }
    }
};
</script>

<style lang="scss" scoped></style>
