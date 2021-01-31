<template lang="html">
    <section class="ps-my-account ps-page--account">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="ps-section__left">
                        <aside class="ps-widget--account-dashboard">
                            <div class="ps-widget__header">
                                <img src="/img/users/3.jpg" />
                                <figure>
                                    <figcaption>Hello</figcaption>
                                    <p>{{email}}</p>
                                </figure>
                            </div>
                            <div class="ps-widget__content">
                                <AccountLinks :links="accountLinks" />
                            </div>
                        </aside>
                    </div>
                </div>
                <div class="col-lg-8">
                    <FormEditAddress/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AccountLinks from './modules/AccountLinks';
import FormEditAddress from '~/components/partials/account/modules/FormEditAddress';

export default {
    name: 'UserInformation',
    components: { AccountLinks, FormEditAddress },
    computed: {
        email() {
            return this.$store.state.auth.email;
        },
    },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information',
                    icon: 'icon-user',
                    active: true
                },
                {
                    text: 'Invoices',
                    url: '/account/invoices',
                    icon: 'icon-papers',
                },
            ],
        };
    },

    created() {
    },
};
</script>

<style lang="scss" scoped></style>
