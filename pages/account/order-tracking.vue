<template lang="html">
    <section class="ps-page--simple">
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="ps-order-tracking">
            <div class="container">
                <div class="ps-section__header">
                    <h3>Order Tracking</h3>
                    <p>
                        To track your order please enter your Order ID in the
                        box below and press the "Track" button. This was given
                        to youon your receipt and in the confirmation email you
                        should have received.
                    </p>
                </div>
                <div class="ps-section__content">
                    <div
                        class="ps-form--order-tracking"
                    >
                        <div class="form-group">
                            <label>Order number</label>
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Found in your order confimation email"
                                v-model="orderNumber"
                            />
                        </div>
                        <div class="form-group">
                            <button class="ps-btn ps-btn--fullwidth" @click="getOrderDetail">
                                Track Your Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    components: {
        HeaderMobile,
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
                    text: 'Order Tracking',
                },
            ],
            orderNumber: '',
        };
    },
    methods: {
        async getOrderDetail() {
            const data = await this.$store.dispatch('shop/getOrderDetail', this.orderNumber);
            this.$router.push(`/order/${data[0].id}`);
        },
    },
};
</script>

<style lang="scss" scoped></style>
