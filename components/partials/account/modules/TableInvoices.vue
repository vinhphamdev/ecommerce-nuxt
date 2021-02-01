<template lang="html">
    <div class="table-repsonsive">
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
                <td class="text-center">{{ product.createdAt }}</td>
                <td class="text-center">{{ product.invoice_amount }}</td>
                <td class="text-center">{{ product.order_status }}</td>
                <td class="text-center"><nuxt-link :to="`/order/${product.order_number}`">View</nuxt-link></td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
export default {
    name: 'TableInvoices',
    props: {
        products: {
            type: Array,
            default: [],
        },
    },
};
</script>

<style lang="scss" scoped></style>
