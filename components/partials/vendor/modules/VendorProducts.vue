<template lang="html">
    <div class="ps-shopping vendor-shop">
        <div id="map"></div>
        <div class="ps-shopping__header">
            <p>
                <strong>
                    {{ products ? products.length : 0 }}
                </strong>
                Products found
            </p>
            <div class="ps-shopping__actions">
                <select class="form-control" data-placeholder="Sort Items">
                    <option>Sort by latest</option>
                    <option>Sort by popularity</option>
                    <option>Sort by average rating</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                </select>
                <div class="ps-shopping__view">
                    <p>View</p>
                    <ul class="ps-tab-list">
                        <li :class="gridMode === true ? 'active' : ''">
                            <a href="#">
                                <i class="icon-grid"></i>
                            </a>
                        </li>
                        <li :class="gridMode !== true ? 'active' : ''">
                            <a href="#">
                                <i class="icon-list4"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div style="marginBottom: 20px;" class="product-types-container" v-if="productTypes !== undefined">
            <span class="product-type-item" v-for="category in productTypes" :key="category.id" @click="filterProduct(category.name)">
                {{ category.name }}
            </span>
        </div>
        <div class="ps-shopping__content">
            <div v-if="gridMode === true" class="ps-shopping-product">
                <div class="row">
                    <div
                        v-for="product in filteredProducts"
                        class="col-lg-3 col-md-4 col-sm-6 col-6 "
                        :key="product.id"
                    >
                        <ProductDefault :product="product" />
                    </div>
                </div>
            </div>
            <div v-else class="ps-shopping-product">
                <!--<ProductWide product="{product}" key="{product.id}" />-->
            </div>
        </div>
    </div>
</template>

<script>
import ProductDefault from '../../../elements/product/ProductDefault';
import { mapboxToken } from '~/utilities/common-helpers';

export default {
    name: 'VendorProducts',
    components: { ProductDefault },
    data() {
        return {
            gridMode: true,
            selectedType: '',
            productTypes: [],
            filteredProducts: [],
        };
    },

    computed: {
        products() {
            return this.$store.state.shop.vendorProducts;
        },

        vendor() {
            return this.$store.state.shop.vendor;
        },
    },

    async created() {
        const vendorId = this.$route.params.id;
        await this.$store.dispatch('shop/getVendorById', vendorId);
        this.filteredProducts = this.products;
        const _types = [
            {
                id: 'All products',
                name: 'All products',
            },
        ];

        this.products.forEach((item) => {
            item.product_types.forEach((type) => {
                _types.push(type);
            });
        });

        this.productTypes = _types;

        if (this.vendor.address) {
            mapboxgl.accessToken = mapboxToken;
            let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

            mapboxClient.geocoding
                .forwardGeocode({
                    query: this.vendor.address,
                    autocomplete: false,
                    limit: 1,
                })
                .send()
                .then(function (response) {
                    if (
                        response &&
                        response.body &&
                        response.body.features &&
                        response.body.features.length
                    ) {
                        let feature = response.body.features[0];

                        let map = new mapboxgl.Map({
                            container: 'map',
                            style: 'mapbox://styles/mapbox/streets-v11',
                            center: feature.center,
                            zoom: 15,
                        });
                        new mapboxgl.Marker()
                            .setLngLat(feature.center)
                            .addTo(map);
                    }
                });
        }
    },

    methods: {
        filterProduct(name) {
            if (name === 'All products' || name === '') {
                this.filteredProducts = this.products;
            } else {
                this.filteredProducts = this.products.filter((item) => {
                    if (item.product_types.length > 0) {
                        return item.product_types.some((it) => {
                            return it.name == name;
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#map {
    width: 100%;
    height: 350px;
    margin-bottom: 12px;
}
.product-type-item:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
