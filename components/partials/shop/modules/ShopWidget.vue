<template lang="html">
    <div id="shop-widgets">
        <aside class="widget widget_shop">
            <h4 class="widget-title">
                {{ $t('shop.widget.categories') }}
            </h4>
            <ul v-if="categories !== undefined" class="ps-list--categories">
                <li v-for="category in categories" :key="category.id" @click="getProductByType(category.id)">
                        {{ category.name }}
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ShopWidget',
    computed: {
        ...mapState({
            categories: state => state.shop.categories,
            products: state => state.shop.products
        }),
    },
    created () {
        this.getProductType();
    },
    methods: {
       async getProductType(){
           await this.$store.dispatch('shop/getProductType')
       },

       getProductByType(type){
        this.$store.commit('getProductByType', type);
       }
    }
};
</script>

<style lang="scss" scoped></style>
