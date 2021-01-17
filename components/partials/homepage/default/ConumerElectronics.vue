<template lang="html">
    <div class="ps-product-list ps-garden-kitchen ps-section--carousel-outside">
        <div class="ps-container">
            <div class="ps-section__header">
                <h3>{{ $t('homeDefault.consumerElectronics.heading') }}</h3>
                <ul class="ps-section__links">
                    <li>
                        <nuxt-link :to="localePath('/shop')">
                            {{
                                $t(
                                    'homeDefault.consumerElectronics.links.newArrivals'
                                )
                            }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="localePath('/shop')">
                            {{
                                $t(
                                    'homeDefault.consumerElectronics.links.bestSeller'
                                )
                            }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="localePath('/shop')">
                            {{
                                $t(
                                    'homeDefault.consumerElectronics.links.bestSeller'
                                )
                            }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="localePath('/shop')">
                            {{ $t('common.viewAll') }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="ps-section__content">
                <!-- <carousel-arrows type="simple" />
                <div
                    class="ps-carousel"
                    v-swiper:consumerElectronicCarousel="carouselSetting"
                >
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="product in products">
                            <product-default :product="product" />
                        </div>
                    </div>
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div> -->

                 <div class="row">
                     <template v-for="product in products">
                         <div class="col-md-2">
                            <product-default :product="product" />
                         </div>
                     </template>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { carouselFullwidth } from '~/utilities/carousel-helpers.js';
import ProductDefault from '../../../elements/product/ProductDefault';
import { getColletionBySlug } from '../../../../utilities/product-helper';
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
        ...mapGetters({
            products: 'shop/getAllProducts',
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
    async created() {
        const response = await this.$store.dispatch('shop/getAllProducts');
    },
};
</script>
