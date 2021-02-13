<template lang="html">
    <div class="table-repsonsive">
        <span>{{ userId }}</span>
        <table class="table ps-table--shopping-cart">
            <thead>
                <tr>
                    <th class="text-center">Order Number</th>
                    <th class="text-center">Date</th>
                    <th class="text-center">Amount</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Detail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td class="text-center"><nuxt-link :to="`/order/${product.order_number}`">{{ product.order_number }}</nuxt-link></td>
                    <td class="text-center">{{ new Date(product.createdAt).toLocaleString() }}</td>
                    <td class="text-center">{{ product.invoice_amount }}</td>
                    <td class="text-center">{{ product.order_status }}</td>
                    <td class="text-center"><nuxt-link :to="`/order/${product.order_number}`"><i class="icon-pencil"></i></nuxt-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'TableInvoices',
    computed: {
        async products() {
            console.log('here ', this.userId)
            if (this.userId) {
                console.log('lolo')
                const orders = await this.$store.dispatch(
                    'shop/getListOrder',
                    this.userId
                );
                console.log('orders ', orders)
                return orders
            } else {
                return [{id: 1, order_number: '1', createdAt: '2021-02-13T08:36:26.333Z', order_status: 'PREPARING', invoice_amount: 40}]
            }
        },
        ...mapState({
            userId: (state) => state.auth.userId,
        })
    },
};
</script>

<style lang="scss" scoped></style>
