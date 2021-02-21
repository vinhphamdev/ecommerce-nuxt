<template lang="html">
    <div class="ps-shopping">
        <BestSaleItems collection-slug="shop-best-seller-items" />
        <RecommendItems collection-slug="shop-recommend-items" />
        <div class="ps-shopping__header">
            <p>
                <strong class="mr-2">{{ totalProducts }}</strong>
                Products found
            </p>
            <div class="ps-shopping__actions">
                <select class="ps-select form-control" data-placeholder="Sort Items">
                    <option v-for="(option, index) in sortOptions" :key="index">{{ option }}</option>
                </select>
                <div class="ps-shopping__view">
                    <p>View</p>
                    <ul class="ps-tab-list">
                        <li :class="{ active: !listView }">
                            <button @click="handleChangeViewMode">
                                <i class="icon-grid"></i>
                            </button>
                        </li>
                        <li :class="{ active: listView }">
                            <button @click="handleChangeViewMode">
                                <i class="icon-list4"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ps-shopping__content">
            <div v-if="queries" class="ps-shopping__queries">
                <a v-for="(query, index) in queries" :key="index" href="#" @click.prevent="">
                    {{ query }}
                </a>
            </div>

            <div v-if="!listView" class="ps-shopping-product">
                <div class="row">
                    <div
                        v-for="product in products"
                        :key="product.id"
                        class="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6"
                    >
                        <ProductDefault :product="product" />
                    </div>
                </div>
                <footer class="mt-30">
                    <v-pagination
                        v-model="page"
                        color="#fcb800"
                        total-visible="8"
                        :length="paginationLength"
                        @input="handleChangePagination"
                    />
                </footer>
            </div>
            <div v-else class="ps-shopping-product">
                <ProductWide v-for="product in products" :key="product.id" :product="product" />
                <footer class="mt-30">
                    <v-pagination
                        v-model="page"
                        color="#fcb800"
                        total-visible="8"
                        :length="paginationLength"
                        @input="handleChangePagination"
                    />
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDefault from '~/components/elements/product/ProductDefault';
import RecommendItems from '~/components/partials/shop/sections/RecommendItems';
import BestSaleItems from '~/components/partials/shop/sections/BestSaleItems';
import ProductWide from '~/components/elements/product/ProductWide';
import sortOptions from '~/static/data/sortOptions.json';

export default {
    name: 'LayoutShop',
    components: { ProductWide, BestSaleItems, RecommendItems, ProductDefault },
    data() {
        return {
            page: 1,
            pageSize: 12,
            sortOptions: sortOptions,
        };
    },
    computed: {
        ...mapState({
            products: (state) => state.product.products,
            totalProducts: (state) => state.product.totalProducts,
            queries: (state) => state.collection.queries,
            listView: (state) => state.shop.listView,
        }),
        paginationLength() {
            if (this.totalProducts % 12 === 0) {
                return parseInt(this.totalProducts / this.pageSize);
            } else {
                return parseInt(this.totalProducts / 12 + 1);
            }
        },
    },
    methods: {
        async handleChangePagination(value) {
            const params = {
                _start: value === 1 ? 0 : (value - 1) * 12,
                _limit: 12,
            };
            await this.$store.dispatch('product/getProducts', params);
        },
        handleChangeViewMode() {
            this.$store.commit('shop/changeViewMode', !this.listView);
        },
    },
};
</script>

<style lang="scss" scoped></style>
