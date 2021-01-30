<template lang="html">
    <div class="ps-my-account">
            <div class="container">
                <div class="ps-form--account">
        <form>
        <div class="ps-form__content">
            <h5>Vendor Registration Form</h5>
            <div class="form-group">
                <v-text-field
                    v-model="name"
                    class="ps-text-field"
                    :error-messages="nameErrors"
                    @input="$v.name.$touch()"
                    placeholder="Name"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="description"
                    type="description"
                    class="ps-text-field"
                    :error-messages="descriptionErrors"
                    @input="$v.description.$touch()"
                    placeholder="Description"
                    height="50"
                    outlined
                />
            </div>

            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                >
                    Register
                </button>
            </div>
        </div>
    </form>
    </div>
    </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: 'FormRegisterVendor',
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push('This field is required');
            return errors;
        },
        descriptionErrors() {
            const errors = [];
            if (!this.$v.description.$dirty) return errors;
            !this.$v.description.required &&
                errors.push('This field is required');
            return errors;
        },
        userId() {
            return this.$store.state.auth.userId;
        },
    },
    data() {
        return {
            name: null,
            description: null,
        };
    },
    validations: {
        name: { required },
        description: { required },
    },

    methods: {
        async handleSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return false;
            }

            const params = {
                name: this.name,
                description: this.description,
                owner: this.userId,
            };

            try {
                await this.$store.dispatch('auth/vendorRegistration', params);
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Register to become vendor successfully`,
                });
            } catch (e) {
                console.log(e);
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Failed!',
                    text: `An error occurred`,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
