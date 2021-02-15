<template lang="html">
    <div class="ps-product-list ps-garden-kitchen ps-section--carousel-outside">
        <div class="ps-container">
            <div class="ps-section__header">
                <h3>Products</h3>
            </div>
            <div class="ps-section__content">
                 <v-row style="margin-bottom:20px">
                     <template v-for="product in products">
                        <v-col cols="6" md="2" style="margin-bottom:20px">
                            <product-default :product="product" />
                        </v-col>
                     </template>
                 </v-row>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { carouselFullwidth } from '~/utilities/carousel-helpers.js';
import ProductDefault from '../../../elements/product/ProductDefault';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
    components: { CarouselArrows, ProductDefault },
    props: {
        collectionSlug: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState({
            products: state => state.shop.productsCatalogue,
        }),
    },
    data() {
        return {
            carouselSetting: {
                ...carouselFullwidth,
                navigation: {
                    nextEl: '.ps-garden-kitchen .swiper-next',
                    prevEl: '.ps-garden-kitchen .swiper-prev',
                },
            },
        };
    },
    // async created() {
    //     await this.$store.dispatch('shop/getAllProducts');
    // },
};
</script>
