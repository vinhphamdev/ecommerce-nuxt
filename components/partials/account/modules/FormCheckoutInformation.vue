<template lang="html">
    <div class="ps-form__billing-info">
        <h3 class="ps-form__heading">
            Contact information
        </h3>
        <div class="form-group">
            <label>Email or phone number <sup>*</sup></label>
            <v-text-field
                placeholder="Email"
                outlined
                height="50"
                v-model="mail"
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
                        v-model="name"
                    />
                </div>
            </div>

        </div>
        <div class="form-group">
            <label>Address</label>
            <v-text-field placeholder="Address" outlined height="50" v-model="address" />
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
import strapi from '~/utilities/Strapi';
import { Card, createToken } from 'vue-stripe-elements-plus';

export default {
    name: 'FormCheckoutInformation',
    ...mapState({
        cartItems: (state) => state.cart.cartItems,
    }),
    computed: {
        userId() {
            return this.$store.state.auth.userId;
        },

        name: {
            get() {
                return this.$store.state.auth.name;
            },
            set(value) {
                this.$store.commit('auth/updateName', value);
            },
        },

        address: {
            get() {
                return this.$store.state.auth.address;
            },
            set(value) {
                this.$store.commit('auth/updateAddress', value);
            },
        },
    },
    components: {
        Card,
    },
    data() {
        return {
            customerName: null,
            shippingAddress: null,
            mail: null,
        };
    },
    created() {},
    methods: {
        handleToShipping() {
            this.$router.push('/account/shipping');
        },

        async createOrder() {
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            const cartItems = cookieCart.cartItems;
            const arr = cartItems.reduce(function (acc, cur) {
                if (typeof acc[cur.vendorId] == 'undefined') {
                    acc[cur.vendorId] = 1;
                } else {
                    acc[cur.vendorId] += 1;
                }

                return acc;
            }, {});

            const vendors = Object.keys(arr);

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

            const params = {
                mail: this.mail,
                customer_name: this.name,
                shipping_address: this.address,
                order_items: items,
                payment_method: 'CREDIT_CARD',
                vendors: vendors,
                token,
            };

            if (this.userId != '') {
                params['user'] = this.userId;
            }

            await strapi.createEntry('orders', params);

            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `Create order successfully`,
            });
            this.$store.dispatch('cart/clearCart');
        },
    },
};
</script>

<style lang="scss" scoped>
.pb24 {
    padding-bottom: 24px;
}
</style>
