<template lang="html">
    <div class="ps-form__billing-info">
        <h3 class="ps-form__heading">
            Contact information
        </h3>
        <div class="form-group">
            <label>Email or phone number <sup>*</sup></label>
            <v-text-field
                placeholder="Email or phone number"
                outlined
                height="50"
            />
        </div>

        <h3 class="ps-form__heading">
            Shipping address
        </h3>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <label>Name</label>
                    <v-text-field
                        placeholder="Name"
                        outlined
                        height="50"
                        v-model="customerName"
                    />
                </div>
            </div>

        </div>
        <div class="form-group">
            <label>Address</label>
            <v-text-field placeholder="Address" outlined height="50" v-model="shippingAddress" />
        </div>

        <h3 class="ps-form__heading">
            Payment
        </h3>
        <div class="form-group pb24">
            <card
            ref="card-stripe"
            stripe="pk_test_51IDw7QHYRruOoW8HFWgG6rgdEuicAla4kQfpH11fdOwJgS8sqd44yWoX9dpIuuVsg7zhjLzCYNkD1JJkxGAUisub00KzvQ5vKh"
            @change='complete = $event.complete'
        />
        </div>

        <div class="ps-form__submit">
            <nuxt-link to="/account/shopping-cart">
                <i class="icon-arrow-left mr-1"></i>
                Return to shopping cart
            </nuxt-link>
            <div class="ps-block__footer">
                <!-- <button class="ps-btn" @click="handleToShipping">
                    Continue to shipping
                </button> -->

                <button class="ps-btn" @click="createOrder">
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import strapi from '~/utilities/strapi';
import { Card, createToken } from 'vue-stripe-elements-plus';

export default {
    name: 'FormCheckoutInformation',
    ...mapState({
        cartItems: (state) => state.cart.cartItems,
    }),
    components: {
        Card,
    },
    data() {
        return {
            customerName: null,
            shippingAddress: null,
        };
    },
    methods: {
        handleToShipping() {
            this.$router.push('/account/shipping');
        },

        async createOrder() {
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            const items = cookieCart.cartItems.map((it) => ({
                product: it.id,
                quantity: it.quantity,
            }));

            let token;
            try {
                const response = await createToken();
                token = response.token.id;
            } catch (err) {
                alert('An error occurred.');
                this.loading = false;
                return;
            }

            await strapi.createEntry('orders', {
                customer_name: this.customerName,
                shipping_address: this.shippingAddress,
                order_items: items,
                payment_method: 'CREDIT_CARD',
                vendor: '60105073c3a76b0011130d5c',
                token,
            });

            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `Create order successfully`,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.pb24 {
    padding-bottom: 24px;
}
</style>
