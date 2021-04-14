<template lang="html">
    <div class="ps-shopping">
        <div class="ps-shopping__header">
            <p>
                <!-- <strong class="mr-2">{{ total }}</strong> -->
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
            <!-- <div v-if="queries" class="ps-shopping__queries">
				<a v-for="query in queries" href="#" @click.prevent="">
					{{ query }}
				</a>
			</div> -->
            <div v-if="!listView" class="ps-shopping-product">
                <div class="row">
                    <div
                        v-for="product in products"
                        :key="product.id"
                        class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
                    >
                        <ProductDefault :product="product" />
                    </div>
                </div>
            </div>
            <div v-else class="ps-shopping-product">
                <ProductWide v-for="product in products" :key="product.id" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDefault from '~/components/elements/product/ProductDefault';
import ProductWide from '~/components/elements/product/ProductWide';
import sortOptions from '~/static/data/sortOptions.json';

export default {
    name: 'LayoutShopSidebar',
    components: { ProductWide, ProductDefault },
    data() {
        return {
            page: 1,
            pageSize: 12,
            sortOptions: sortOptions,
        };
    },
    computed: {
        ...mapState({
            products: (state) => state.shop.productsCatalogue,
            listView: (state) => state.shop.listView,
        }),
    },
    async created() {
        const data = await this.$store.dispatch('shop/getAllProducts');
        console.log('data', data);
    },
    methods: {
        handleChangeViewMode() {
            this.$store.commit('shop/changeViewMode', !this.listView);
        },
    },
};
</script>

<style lang="scss" scoped></style>
