<template lang="html">
    <div class="ps-shopping vendor-shop">
        <div id="map"></div>
        <div class="ps-shopping__header">
            <p>
                <strong>
                    {{ products ? products.length : 0 }}
                </strong>
                Products found
	            {{listView}}
            </p>
            <div class="ps-shopping__actions">
                <select class="form-control" data-placeholder="Sort Items">
                    <option
                        v-for="(option, index) in sortOptions"
                        :key="index"
                        >{{ option }}</option
                    >
                </select>
                <div class="ps-shopping__view">
                    <p>View</p>
                    <ul class="ps-tab-list">
	                    <li :class="{ 'active': listView}">
		                    <button @click="handleChangeViewMode">
			                    <i class="icon-grid"></i>
		                    </button>
	                    </li>
	                    <li :class="{ 'active': !listView}">
		                    <button  @click="handleChangeViewMode">
			                    <i class="icon-list4"></i>
		                    </button>
	                    </li>
                    </ul>
                </div>
            </div>
        </div>
	    <div class='ps-shopping__content'>
			    <div v-if='!listView' class='ps-shopping-product'>
				    <div class='row'>
				    <div
					    v-for='product in products'
					    class='col-lg-3 col-md-4 col-sm-6 col-6 '
					    :key='product.id'
				    >
					    <ProductDefault :product='product' />
				    </div>
				    </div>
			    </div>
			    <div v-else class='ps-shopping-product'>
				    <div
					    v-for='product in products'
					    :key='product.id'
				    >
					    <ProductWide  :product='product' />
				    </div>
			    </div>
	    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDefault from '~/components/elements/product/ProductDefault';
import ProductWide from '~/components/elements/product/ProductWide';
import sortOptions from '~/static/data/sortOptions.json';


export default {
	name: 'VendorProducts',
	components: { ProductDefault, ProductWide },
	data() {
		return {
			sortOptions: sortOptions
		};
	},
	computed: {
		...mapState({
			listView: state => state.shop.listView
		}),
		products() {
			return this.$store.state.shop.vendorProducts;
		},
		vendor() {
			return this.$store.state.shop.vendor;
		}
	},
	async created() {
		const vendorId = this.$route.params.id;
		await this.$store.dispatch('shop/getVendorById', vendorId);

		if (this.vendor.address) {
			mapboxgl.accessToken =
				'pk.eyJ1IjoicGhvbmduaGF0MTkiLCJhIjoiY2traWtzMXRrMjV4dzJvcGE5cHQ3MWJmaiJ9.ohDtLEc_AuCHfk1Ns3t8hA';
			let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

			mapboxClient.geocoding
			.forwardGeocode({
				query: this.vendor.address,
				autocomplete: false,
				limit: 1
			})
			.send()
			.then(function(response) {
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
						zoom: 15
					});
					new mapboxgl.Marker()
					.setLngLat(feature.center)
					.addTo(map);
				}
			});
		}
	},
	methods: {
		handleChangeViewMode() {
			this.$store.commit('shop/changeViewMode', !this.listView)
		}
	}
};
</script>

<style lang="scss" scoped>
#map {
    width: 100%;
    height: 350px;
    margin-bottom: 12px;
}
</style>
