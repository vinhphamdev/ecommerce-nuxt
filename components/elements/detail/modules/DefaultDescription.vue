<template lang="html">
    <div class="ps-product__content">
        <v-tabs background-color="white" color="warning" class="ps-tab-list">
            <v-tab :ripple="false" tag="li">
                <a class="list-item">Description</a>
            </v-tab>
        
            <v-tab :ripple="false" tag="li">
                <a class="list-item">
                    Vendor
                </a>
            </v-tab>
   
            <v-tab-item>
                <div class="tab-content">
                    <partial-description :product="product" />
                </div>
            </v-tab-item>

            <v-tab-item>
                <div class="tab-content">
                    <partial-vendor :product="product" />
                </div>
            </v-tab-item>

        </v-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PartialDescription from '~/components/elements/detail/modules/PartialDescription';
import PartialSpecification from '~/components/elements/detail/modules/PartialSpecification';
import PartialVendor from '~/components/elements/detail/modules/PartialVendor';
import PartialReview from '~/components/elements/detail/modules/PartialReview';
import PartialOffer from '~/components/elements/detail/modules/PartialOffer';
export default {
    name: 'DefaultDescription',
    components: {
        PartialOffer,
        PartialReview,
        PartialVendor,
        PartialSpecification,
        PartialDescription,
    },
    computed: {
        ...mapState({
            product: (state) => state.product.product,
        }),
    },
};
</script>

<style lang="scss" scoped>
.tab-content {
    padding-top: 30px;
}
li[aria-selected='true'] {
    a {
        color: $color-heading !important;
    }
}
a.list-item {
    position: relative;
    display: block;
    color: #999999;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    text-transform: none;
    @media screen and (min-width: 992px) {
        font-size: 20px;
    }
}
</style>
