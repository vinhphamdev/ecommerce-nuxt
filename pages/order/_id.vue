<template>
    <section class="ps-my-account ps-page--account">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ps-page__content">
                        <div class="ps-section--account-setting">
                            <div class="ps-section__header">
                                <h3>
                                    Order Detail #{{ orderNumber
                                    }}<span> - {{ status }}</span>
                                </h3>
                            </div>
                            <p>Created Order: {{createdAt}}</p>
                            <div class="row" style="margin:0 !important;margin-bottom:20px;margin-top:10px;">
                                <div class="card">
                                    <p>Customer Name: {{name}}</p>
                                    <p>Shipping Address: {{address}}</p>
                                </div>

                                <div class="card">
                                    <p>Standard Delivery</p>
                                    <p>21$</p>
                                </div>

                                <div class="card">
                                    <p>Payment method: {{paymentMethod}}</p>
                                </div>
                            </div>
                            <div class="ps-section__content">
                                <p></p>
                                <div>
                                    <div class="table-repsonsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Amount</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="item in tableData"
                                                    :key="item.id"
                                                >
                                                    <td>
                                                        <img
                                                            :src="
                                                                item.product
                                                                    .images[0]
                                                                    .url
                                                            "
                                                            width="60px"
                                                            height="60px"
                                                            style="
                                                                object-fit: cover;
                                                            "
                                                        />
                                                        {{ item.product.name }}
                                                    </td>
                                                    <td>
                                                        {{ item.product.price }}
                                                    </td>
                                                    <td>
                                                        {{ item.quantity }}
                                                    </td>
                                                    <td>
                                                        {{
                                                            item.product.price *
                                                            item.quantity
                                                        }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Total: {{ total }}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AccountLinks from '../../components/partials/account/modules/AccountLinks';

export default {
    components: { AccountLinks },
    computed: {
        orderDetail() {
            return this.$store.state.shop.orderDetail;
        },
    },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information',
                    icon: 'icon-user',
                },
                {
                    text: 'Invoices',
                    url: '/account/invoices',
                    icon: 'icon-papers',
                },
            ],
            tableData: [],
            total: '',
            name: '',
            address: '',
            paymentMethod: '',
            orderNumber: '',
            status: '',
            createdAt: ''
        };
    },

    created() {
        console.log(this.orderDetail);
        this.tableData = this.orderDetail.order_items;
        this.total = this.orderDetail.invoice_amount;
        this.name = this.orderDetail.customer_name;
        this.address = this.orderDetail.shipping_address;
        this.paymentMethod = this.orderDetail.payment_method;
        this.orderNumber = this.orderDetail.id;
        this.status = this.orderDetail.order_status;
        this.createdAt = this.orderDetail.createdAt;
    },
};
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 4px;
    height: 92px;
    flex:1;
    justify-content: center;
}

p{
    margin-bottom:0;
}
</style>