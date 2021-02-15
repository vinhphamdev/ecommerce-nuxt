<template lang="html">
    <main id="homepage-1">
        <!-- <home-banner /> -->
        <div class="ps-container product-types-container" v-if="categories !== undefined">
            <span class="product-type-item" v-for="category in categories" :key="category.id" @click="filterProduct(category.name)">
                {{ category.name }}
            </span>
        </div>
        <clothings />

        <conumer-electronics/>

        <newsletters layout="fullwidth"/>
    </main>
</template>
<script>
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import Newsletters from '~/components/partials/commons/Newsletters';
import SiteFeauturesFullwidth from '~/components/partials/commons/SiteFeauturesFullwidth';
import Clothings from '~/components/partials/homepage/default/Clothings';
import ConumerElectronics from '~/components/partials/homepage/default/ConumerElectronics';
import HomeBanner from '~/components/partials/homepage/default/HomeBanner';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import NavigationList from '~/components/shared/mobile/NavigationList';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import MobileDrawer from '~/components/shared/mobile/MobileDrawer';
import DemoPanel from '~/components/shared/DemoPanel';
import { mapState } from 'vuex';

export default {
    components: {
        DemoPanel,
        MobileDrawer,
        HeaderMobile,
        NavigationList,
        HeaderDefault,
        HomeBanner,
        SiteFeauturesFullwidth,
        FooterFullwidth,
        Newsletters,
        Clothings,
        ConumerElectronics,
    },

    transition: 'zoom',
    layout: 'layout-default',
    computed: {
        ...mapState({
            categories: (state) => state.shop.categories,
        }),
    },
    methods: {
        async getProductType() {
            await this.$store.dispatch('shop/getProductType');
        },

        filterProduct(name) {
            if (name === 'All products') {
                name = ''
            }
            this.$store.commit('shop/filterProduct', name);
            if (window.location.pathname !== '/marketplace') {
                this.$router.push('/marketplace')
            }
        },
    },
    created() {
        this.getProductType();
    },
};
</script>
<style lang="scss" scoped>
.product-type-item:hover {
    cursor: pointer;
    text-decoration: underline;
}
.product-types-container {
    padding-top: 10px;
}
</style>
