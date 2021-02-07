<template lang="html">
<div>
    <!-- <form class="ps-form--edit-address"> -->
        <div class="ps-form__header">
            <h3>Account information</h3>
        </div>
        <div class="ps-form__content">
            <div class="form-group">
                <label> Name</label>
                <input type="text" placeholder="" v-model="name" class="form-control" />
            </div>
            <div class="form-group">
                <label> Address</label>
                <input type="text" placeholder="" v-model="address" class="form-control" />
            </div>

            <div class="form-group">
                <label> Email address</label>
                <input type="text" placeholder="" v-model="email" class="form-control" readonly/>
            </div>

              <div class="form-group">
                <label>Phone number</label>
                <input type="number" placeholder="" v-model="phone" class="form-control"/>
            </div>
            <div class="form-group submit" @click="updateProfile">
                <button class="ps-btn">Save</button>
            </div>
        </div>
    <!-- </form> -->
</div>

</template>
<script>
export default {
    name: 'FormEditAddress',
    computed: {
        customerId() {
            return this.$store.state.auth.customerId;
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

        email: {
            get() {
                return this.$store.state.auth.email;
            },
            set(value) {
                this.$store.commit('auth/updateEmail', value);
            },
        },

        phone: {
            get() {
                return this.$store.state.auth.phone_number;
            },
            set(value) {
                this.$store.commit('auth/updatePhone', value);
            },
        },
    },

    methods: {
        async updateProfile() {
            if (this.customerId) {
                const form = {
                    name: this.name,
                    customer_address: this.address,
                    id: this.customerId
                };
                await this.$store.dispatch('auth/updateProfile', form);
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Update infor successfully`
                });
            } else {
                const form = {
                    name: this.name,
                    customer_address: this.address,
                    email: this.email,
                    id: this.$store.state.auth.userId
                };
                await this.$store.dispatch('auth/createProfile', form);
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Update infor successfully`
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
