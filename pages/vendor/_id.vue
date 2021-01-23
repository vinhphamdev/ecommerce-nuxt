<template lang="html">
    <div class="ps-page--single ps-page--vendor">
        <!-- <bread-crumb :breadcrumb="breadCrumb" /> -->
        <vendor-store />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import VendorStore from '~/components/partials/vendor/VendorStore';

export default {
    components: {
        BreadCrumb,
        VendorStore,
    },
    async created() {
        const vendorId = this.$route.params.id;
        await this.$store.dispatch('shop/getAllProductsByVendor', vendorId);
        await this.$store.dispatch('shop/getVendorById', vendorId);
    },
};
</script>

<style lang="scss" scoped></style>
