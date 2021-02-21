<template lang="html">
    <table class="table ps-table--responsive ps-table--shopping-cart">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody v-if="isLoading === true">
            <Loading />
        </tbody>
        <tbody v-else>
            <TableShoppingCartRow v-for="(item, index) in cartItems" :key="index" :item="item" />
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex';
import TableShoppingCartRow from '~/components/partials/account/modules/TableShoppingCartRow';
import Loading from '~/components/elements/commons/Loading';

export default {
    name: 'TableShoppingCart',
    components: { TableShoppingCartRow, Loading },
    computed: {
        ...mapGetters({
            cartItems: 'cart/getCart',
            isLoading: 'cart/isLoading',
        }),
    },
};
</script>
