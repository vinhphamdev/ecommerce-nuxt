<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Register An Account</h5>

             <div class="form-group">
                <v-text-field
                    v-model="username"
                    :error-messages="usernameErrors"
                    @input="$v.username.$touch()"
                    placeholder="Username"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            
            <div class="form-group">
                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    placeholder="Email Address"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Password"
                    class="ps-text-field"
                    outlined
                    height="50"
                    type="password"
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
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: 'Register',
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

        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.required && errors.push('This field is required');
            !this.$v.email.email && errors.push('This must be an email');
            return errors;
        },
    },
    data() {
        return {
            username: null,
            password: null,
            email: null,
        };
    },
    validations: {
        username: { required },
        password: { required },
        email: { required, email },
    },
    methods: {
        async handleSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$router.push('/account/login');
            }

            const params = {
                username: this.username,
                email: this.email,
                password: this.password,
            };

            const response = await this.$store.dispatch(
                'auth/register',
                params
            );

            this.$router.push('/account/login');
        },
    },
};
</script>

<style lang="scss" scoped></style>
