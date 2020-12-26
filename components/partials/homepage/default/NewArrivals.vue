<template lang="html">
    <div class="ps-product-list ps-new-arrivals">
        <div class="ps-container">
            <div class="ps-section__header">
                <h3>
                    {{ $t('homeDefault.newArrivals.heading') }}
                </h3>
                <ul class="ps-section__links">
                    <li
                        v-for="item in newArrivalCategories"
                        :to="item.url"
                        :key="item.text"
                    >
                        <nuxt-link :to="localePath(item.url)">
                            {{ item.text }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="ps-section__content">
                <div class="row">
                    <template v-for="(product, index) in products">
                        <div
                            v-if="index < 8"
                            class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                            :key="product.id"
                        >
                            <product-horizontal :product="product" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductHorizontal from '../../../elements/product/ProductHorizontal';
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';

export default {
    name: 'NewArrivals',
    components: { ProductHorizontal },
    data() {
        return {
            newArrivalCategories: [
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.technologies'
                    ),
                    url: '/shop',
                    active: true
                },
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.electronic'
                    ),
                    url: '/shop',
                    active: false
                },
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.furnitures'
                    ),
                    url: '/shop',
                    active: false
                },
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.clothingAndApprel'
                    ),
                    url: '/shop',
                    active: false
                },
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.healthAndBeauty'
                    ),
                    url: '/shop',
                    active: false
                }
            ]
        };
    },
    props: {
        collectionSlug: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections
        }),

        carouselSetting() {
            return carouselFullwidth;
        },

        products() {
            return getColletionBySlug(this.collections, this.collectionSlug);
        }
    }
};
</script>

<style lang="scss" scoped></style>
