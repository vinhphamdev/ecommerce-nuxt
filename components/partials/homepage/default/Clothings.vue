<template lang="html">
    <div class="ps-product-list ps-clothings ps-section--carousel-outside">
        <div class="ps-container">
            <div class="ps-section__header">
                <h3>Vendors</h3>
            </div>
            <div class="ps-section__content">
                <carousel-arrows type="simple" />
                <div
                    class="ps-carousel outside"
                    v-swiper:carousel="carouselSetting"
                >
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="vendor in vendors">
                            <product-vendor :product="vendor" />
                        </div>
                    </div>
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { carouselFullwidth } from '~/utilities/carousel-helpers.js';
import ProductVendor from '../../../elements/product/ProductVendor';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
    components: { CarouselArrows, ProductVendor },
    computed: {
        ...mapGetters({
            vendors: 'shop/getAllVendors',
        }),
    },
    data() {
        return {
            carouselSetting: {
                ...carouselFullwidth,
                navigation: {
                    nextEl: '.ps-clothings .swiper-next',
                    prevEl: '.ps-clothings .swiper-prev',
                },
            },
        };
    },
    async created() {
        await this.$store.dispatch('shop/getAllVendors');
    },
};
</script>
<style lang="scss" scoped>
.ps-product-list {
    margin-top: 24px;
}
</style>
