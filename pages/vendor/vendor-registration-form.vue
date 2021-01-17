<template lang="html">
    <div class="ps-page--single ps-page--vendor">
        <bread-crumb :breadcrumb="breadCrumb" />
        <VendorRegistrationForm />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import VendorRegistrationForm from '../../components/partials/vendor/VendorRegistrationForm';

export default {
    components: {
        VendorRegistrationForm,
        BreadCrumb,
    },

    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Vendor Registration Form',
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
