<template lang="html">
    <div class="ps-my-account">
        <div class="container">
            <div class="ps-form--account">
                <form>
                    <div class="ps-form__content">
                        <h5>Vendor Registration Form</h5>
                        <div class="form-group">
                            <v-text-field
                                v-model="username"
                                class="ps-text-field"
                                :error-messages="nameErrors"
                                @input="$v.username.$touch()"
                                placeholder="Username"
                                height="50"
                                outlined
                            />
                        </div>

                        <div class="form-group">
                            <v-text-field
                                v-model="password"
                                class="ps-text-field"
                                :error-messages="passwordErrors"
                                @input="$v.password.$touch()"
                                placeholder="Password"
                                height="50"
                                outlined
                                type="password"
                            />
                        </div>

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
                            <v-textarea
                                v-model="description"
                                class="ps-text-field"
                                :error-messages="descriptionErrors"
                                @input="$v.description.$touch()"
                                placeholder="Description"
                                outlined
                            />
                        </div>

                        <div class="form-group">
                            <v-text-field
                                v-model="address"
                                class="ps-text-field"
                                :error-messages="addressErrors"
                                @input="$v.address.$touch()"
                                placeholder="Address"
                                height="50"
                                outlined
                            />
                        </div>

                        <div class="form-group">
                            <v-text-field
                                v-model="email"
                                class="ps-text-field"
                                :error-messages="emailErrors"
                                @input="$v.email.$touch()"
                                placeholder="Email"
                                height="50"
                                outlined
                            />
                        </div>

                        <div class="form-group">
                            <v-text-field
                                v-model="phone"
                                class="ps-text-field"
                                :error-messages="phoneErrors"
                                @input="$v.phone.$touch()"
                                placeholder="Phone number"
                                height="50"
                                outlined
                                type="number"
                            />
                        </div>

                        <div class="form-group">
                            <v-file-input
                            truncate-length="16"
                            v-model="file"
                            placeholder="Select vendor avatar"
                            ></v-file-input>
                        </div>

                        <div class="form-group submit">
                            <button
                                type="submit"
                                class="ps-btn ps-btn--fullwidth"
                                @click.prevent="handleSubmit"
                                :disabled="loading"
                            >
                                <template v-if="!loading">Register</template>
                                <v-progress-circular
                                    v-if="loading"
                                    indeterminate
                                    color="#ffffff"
                                    width="2"
                                    size="16"
                                />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
    name: 'FormRegisterVendor',
    computed: {
        usernameErrors() {
            const errors = [];
            if (!this.$v.username.$dirty) return errors;
            !this.$v.username.required && errors.push('This field is required');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('This field is required');
            return errors;
        },
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

        addressErrors() {
            const errors = [];
            if (!this.$v.address.$dirty) return errors;
            !this.$v.address.required &&
                errors.push('This field is required');
            return errors;
        },

        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.required && errors.push('This field is required');
            return errors;
        },

        phoneErrors() {
            const errors = [];
            if (!this.$v.phone.$dirty) return errors;
            !this.$v.phone.required && errors.push('This field is required');
            return errors;
        },
        userId() {
            return this.$store.state.auth.userId;
        },
    },
    data() {
        return {
            username: null,
            password: null,
            name: null,
            description: null,
            address: null,
            email: null,
            phone: null,
            file: null,
            loading: false,
        };
    },
    validations: {
        username: { required },
        password: { required },
        name: { required },
        description: { required },
        address: { required },
        email: { required, email },
        phone: { required },
        file: { required },
    },

    methods: {
        async handleSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return false;
            }

            try {
                this.loading = true
                // Register new user
                const userParams = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                };

                const registerData = await this.$store.dispatch(
                    'auth/register',
                    userParams
                );

                const formData = new FormData();

                const vendorParams = {
                    name: this.name,
                    description: this.description,
                    owner: registerData.user.id,
                    address: this.address,
                    email: this.email,
                    phone_number: this.phone,
                };
                formData.append('data', JSON.stringify(vendorParams));
                formData.append(`files.avatar`, this.file, this.file.name);

                await this.$store.dispatch('auth/vendorRegistration', formData);

                const loginParams = {
                    identifier: this.username,
                    password: this.password,
                };

                const response = await this.$store.dispatch('auth/login', loginParams);
                this.$store.commit('auth/setToken', response.jwt);
                this.$store.commit('auth/updateUserId', response.user.id);
                this.$store.dispatch('auth/getProfile', response.user.id);
                this.$router.push('/');

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
