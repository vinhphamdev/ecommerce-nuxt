<template lang="html">
    <div class="ps-form__billing-info">
        <h3 class="ps-form__heading">
            Contact information
        </h3>
        <div class="form-group">
            <label>Email</label>
            <v-text-field
                placeholder="Email"
                outlined
                height="50"
                v-model="email"
                 :error-messages="emailErrors"
                @input="$v.email.$touch()"
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
                         :error-messages="nameErrors"
                    @input="$v.name.$touch()"
                    />
                </div>
            </div>

        </div>
        <div class="form-group">
            <label>Address</label>
            <v-text-field placeholder="Address" outlined height="50" v-model="address" 
             :error-messages="addressErrors"
                    @input="$v.address.$touch()"
            />
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
import { email, required } from 'vuelidate/lib/validators';

export default {
    name: 'FormCheckoutInformation',
    ...mapState({
        cartItems: (state) => state.cart.cartItems,
    }),
    validations: {
        name: { required },
        email: { required, email },
        address: { required },
    },
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push('This field is required');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.required && errors.push('This field is required');
            return errors;
        },
         addressErrors() {
            const errors = [];
            if (!this.$v.address.$dirty) return errors;
            !this.$v.address.required && errors.push('This field is required');
            return errors;
        },

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
            email: null,
        };
    },
    created() {},
    methods: {
        handleToShipping() {
            this.$router.push('/account/shipping');
        },

        async createOrder() {
              this.$v.$touch();
            if (this.$v.$invalid) {
                return false;
            }

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

            const vendors = Object.keys(arr).filter((item) => item !== 'undefined');

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

            try{
                const data = await strapi.createEntry('orders', params);
                console.log('data', data);

                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Create order successfully`,
                });
                this.$store.dispatch('cart/clearCart');

                this.$router.push(`/order/${data.order_number}`);



            } catch(e){
                console.log(e);
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Failed!',
                    text: `Error occurred`,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.pb24 {
    padding-bottom: 24px;
}
</style>
