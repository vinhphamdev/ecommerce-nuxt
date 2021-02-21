<template lang="html">
    <div class="ps-form__billing-info">
        <h3 class="ps-form__heading">
            Contact information
        </h3>
        <div class="form-group">
            <label>Vendor</label>
            <v-select
                v-model="selectedVendor"
                :items="vendorList"
                item-text="name"
                item-value="id"
                outlined
                label="Select vendor"
                return-object
            />
        </div>
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
import { email as isEmail, required } from 'vuelidate/lib/validators';

export default {
    name: 'FormCheckoutInformation',
    ...mapState({
        cartItems: (state) => state.cart.cartItems,
    }),
    validations: {
        name: { required },
        email: { required, isEmail },
        address: { required },
    },
    async created() {
        this.email = this.$store.state.auth.email;
        const cartItems = this.$store.state.cart.cartItems;
        const vendorIdList = [];
        cartItems.forEach((item) => {
            if (!vendorIdList.includes(item.vendorId)) {
                vendorIdList.push(item.vendorId);
            }
        });
        
        const vendorListPromise = vendorIdList.map((vendorId) => {
            return this.$store.dispatch('cart/getVendorById', vendorId);
        })
        const vendorList = await Promise.all(vendorListPromise)
        this.vendorList = vendorList
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

        customerId() {
            return this.$store.state.auth.customerId;
        },

        userEmail() {
            return this.$store.state.auth.email;
        },

        name: {
            get() {
                return this.$store.state.auth.name;
            },
            set(value) {
                this.$store.commit('auth/updateName', value);
            },
        },

        selectedVendor: {
            get() {
                return this.$store.state.cart.selectedVendor;
            },
            set(value) {
                this.$store.commit('cart/chooseVendor', value.id);
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
            vendorList: []
        };
    },
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
            const selectedItems = cartItems.filter((item) => {
                return item.vendorId === this.$store.state.cart.selectedVendor;
            });

            const items = selectedItems.map((it) => ({
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
                vendor: this.$store.state.cart.selectedVendor,
                token,
            };

            if (this.userId != '') {
                params['user'] = this.userId;
            }

            if (this.customerId != '') {
                params['customer'] = this.customerId;
            }

            try {
                const data = await strapi.createEntry('orders', params);

                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Create order successfully`,
                });
                this.$store.dispatch('cart/clearItemInCart', selectedItems);
                // window.location.href = `/order/${data.order_number}`
                this.$router.push(`/order/${data.order_number}`);
            } catch (e) {
                console.log(e);
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Failed!',
                    text: `Error occurred`,
                });
            }
        },
    },
    watch: {
        userEmail(newVal) {
            this.email = newVal
        }
    }
};
</script>

<style lang="scss" scoped>
.pb24 {
    padding-bottom: 24px;
}
</style>
