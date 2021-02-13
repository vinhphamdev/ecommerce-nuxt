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
                    <div class="ps-page__content">
                        <div class="ps-section--account-setting">
                            <div class="ps-section__header">
                                <h3>Invoices</h3>
                            </div>
                            <div class="ps-section__content">
                                <TableInvoices :products="products" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AccountLinks from './modules/AccountLinks';
import TableInvoices from './modules/TableInvoices';
import { mapState } from 'vuex';
export default {
    name: 'InvoiceDetail',
    components: { TableInvoices, AccountLinks },
    computed: {
        ...mapState({
            userId: (state) => state.auth.userId,
            email: (state) => state.auth.email,
        })
    },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information',
                    icon: 'icon-user',
                },
                {
                    text: 'Invoices',
                    url: '/account/invoices',
                    icon: 'icon-papers',
                    active: true,
                },
            ], 
            products: [],
        };
    },
    watch: {
        async userId(newId, oldId) {
            if (newId) {
                const orders = await this.$store.dispatch(
                    'shop/getListOrder',
                    newId
                );
                this.products = orders
            }
        },
    },
    async created() {
        if (this.userId) {
            const orders = await this.$store.dispatch(
                'shop/getListOrder',
                this.userId
            );
            this.products = orders
        }
    }
};
</script>

<style lang="scss" scoped></style>
