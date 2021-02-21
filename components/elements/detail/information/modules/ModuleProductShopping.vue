<template lang="html">
    <div class="ps-product__shopping">
        <figure>
            <figcaption>Quantity</figcaption>
            <div class="form-group--number">
                <button class="up" @click.prevent="handleIncreaseQuantity">
                    <i class="fa fa-plus"></i>
                </button>
                <button class="down" @click.prevent="handleDecreaseQuantity">
                    <i class="fa fa-minus"></i>
                </button>
                <input
                    v-model="quantity"
                    class="form-control"
                    disabled
                    type="text"
                />
            </div>
        </figure>
        <button
            class="ps-btn ps-btn--black"
            @click="handleAddToCart"
        >
            Add to cart
        </button>
        <button class="ps-btn" @click="">
            Buy Now
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ModuleProductShopping',
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/getCart'
        })
    },
    data() {
        return {
            quantity: 1
        };
    },
    methods: {
        handleIncreaseQuantity() {
            this.quantity++;
        },

        handleDecreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },

        handleAddToCart(isBuyNow) {
            const cartItemsOnCookie = this.$cookies.get('cart', {
                parseJSON: true
            });

            let existItem;
            if (cartItemsOnCookie) {
                existItem = cartItemsOnCookie.cartItems.find(
                    item => item.id === this.product.id
                );
            }

            const item = {
                id: this.product.id,
                quantity: this.quantity,
                price: this.product.price,
                url: this.product.images[0].url,
                name: this.product.name
            };


	        if (existItem === undefined){
		        this.addItemToCart(item);
	        	return
	        }

	        if (this.quantity + existItem.quantity > 10) {

		        this.$notify({
			        group: 'addCartSuccess',
			        title: 'Warning!',
			        text: `Can't add more than 10 items`
		        });

		        if (isBuyNow && isBuyNow === true) {
			        setTimeout(
				        function() {
					        this.$router.push('/account/checkout');
				        }.bind(this),
				        500
			        );
		        }
	        } else {
		        this.addItemToCart(item);
	        }
        },

        addItemToCart(payload) {

            this.$store.dispatch('cart/addProductToCart', payload);
            this.getCartProduct(this.cartItems);

            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.name} has been added to your cart!`
            });
        },

        async getCartProduct(products) {
            const listOfIds = [];
            products.forEach(item => {
                listOfIds.push(item.id);
            });
            await this.$store.dispatch('product/getCartProducts', listOfIds);
        },
    }
};
</script>

<style lang="scss" scoped></style>
