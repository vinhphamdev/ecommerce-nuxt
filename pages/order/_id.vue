<template>
    <section class="ps-my-account ps-page--account">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ps-page__content">
                        <div class="ps-section--account-setting">
                            <div class="ps-section__header">
                                <h3>
                                    Order Number {{ orderNumber
                                    }}<span> - {{ status }}</span>
                                </h3>
                            </div>
                            <p>
                                Created At:
                                <strong>{{
                                    new Date(createdAt).toLocaleString()
                                }}</strong>
                            </p>
                            <div
                                class="row"
                                style="
                                    margin: 0 !important;
                                    margin-bottom: 20px;
                                    margin-top: 10px;
                                "
                            >
                                <div class="card">
                                    <p>
                                        Customer Name:
                                        <strong>{{ name }}</strong>
                                    </p>
                                    <p>
                                        Shipping Address:
                                        <strong>{{ address }}</strong>
                                    </p>
                                    <p>
                                        Payment method:
                                        <strong>{{
                                            parsePaymentMethod(paymentMethod)
                                        }}</strong>
                                    </p>
                                    <p>
                                        Delivery tracking number:
                                        <strong>{{
                                            deliveryTrackingNumber
                                        }}</strong>
                                    </p>
                                </div>

                                <!-- <div class="card">
                                    <p>Standard Delivery</p>
                                    <p>21$</p>
                                </div> -->

                                <!-- <div class="card">
                                    <p>Payment method: <strong>{{ parsePaymentMethod(paymentMethod) }}</strong></p>
                                </div> -->
                            </div>
                            <div class="ps-section__content">
                                <div>
                                    <div class="table-repsonsive">
                                        <table
                                            class="table ps-table--shopping-cart"
                                        >
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
                                                    <td class="text-left">
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
                                                    <td class="text-right">
                                                        Total: {{ total }}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div id="map"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AccountLinks from '../../components/partials/account/modules/AccountLinks';
import { mapboxToken } from '~/utilities/common-helpers';

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
            createdAt: '',
            deliveryTrackingNumber: '',

            map: null,
            _from: null,
            _to: null,
        };
    },

    methods: {
        async getRoute() {
            const params = {
                start1: this._from[0],
                start2: this._from[1],
                end1: this._to[0],
                end2: this._to[1],
            };

            const response = await this.$store.dispatch('auth/getMap', params);

            var route = response.routes[0].geometry.coordinates;
            var geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route,
                },
            };
            // if the route already exists on the map, reset it using setData
            if (this.map.getSource('route')) {
                this.map.getSource('route').setData(geojson);
            } else {
                // otherwise, make a new request
                this.map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: route,
                            },
                        },
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#24628c',
                        'line-width': 3,
                        'line-opacity': 0.75,
                    },
                });
            }
        },
        parsePaymentMethod(code) {
            if (code === 'CREDIT_CARD') return 'Credit card';
            return code;
        },
    },

    async created() {
        const id = this.$route.params.id;
        await this.$store.dispatch('shop/getOrderDetail', id);

        this.tableData = this.orderDetail.order_items;
        this.total = this.orderDetail.invoice_amount;
        this.name = this.orderDetail.customer_name;
        this.address = this.orderDetail.shipping_address;
        this.paymentMethod = this.orderDetail.payment_method;
        this.orderNumber = this.orderDetail.order_number;
        this.status = this.orderDetail.order_status;
        this.createdAt = this.orderDetail.createdAt;
        this.deliveryTrackingNumber = this.orderDetail.delivery_tracking_number;

        mapboxgl.accessToken = mapboxToken;
        let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

        const from = await mapboxClient.geocoding
            .forwardGeocode({
                query: this.orderDetail.vendor.address,
                autocomplete: false,
                limit: 1,
            })
            .send();

        this._from = from.body.features[0].center;

        const to = await mapboxClient.geocoding
            .forwardGeocode({
                query: this.orderDetail.shipping_address,
                autocomplete: false,
                limit: 1,
            })
            .send();

        this._to = to.body.features[0].center;

        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: this._from,
            zoom: 14,
        });

        this.map.getCanvasContainer();

        //   Add starting point to the map

        this.map.on('load', () => {
            this.getRoute();

            new mapboxgl.Marker({
                color: '#42f5b6',
            })
                .setLngLat(this._from)
                .addTo(this.map);

            new mapboxgl.Marker({
                color: '#42f5b6',
            })
                .setLngLat(this._to)
                .addTo(this.map);
        });
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
    flex: 1;
    justify-content: center;
}

p {
    margin-bottom: 0;
}

#map {
    width: 100%;
    height: 400px;
    margin: 20px 0px;
}
</style>