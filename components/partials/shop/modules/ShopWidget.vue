<template lang="html">
    <div id="shop-widgets">
        <aside class="widget widget_shop">
            <h4 class="widget-title">
                {{ $t('shop.widget.categories') }}
            </h4>
            <ul v-if="categories !== undefined" class="ps-list--categories">
                <li v-for="category in categories" :key="category.id" @click="filterProduct(category.name)">
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
        }),
    },
    created () {
        this.getProductType();
    },
    methods: {
       async getProductType(){
           await this.$store.dispatch('shop/getProductType')
       },

       filterProduct(name){
           console.log('type', name);
        this.$store.commit('shop/filterProduct', name);
       }
    }
};
</script>

<style lang="scss" scoped></style>
