<template lang="html">
            <div>
                <div id="map"></div>
            </div>
</template>

<script>
export default {
    name: 'PartialVendor',
    props: {
        product: {
            type: Object,
            default: () => {},
        },
    },
    async created() {
        if (!this.product.vendor.address) return;
        mapboxgl.accessToken =
            'pk.eyJ1IjoicGhvbmduaGF0MTkiLCJhIjoiY2traWtzMXRrMjV4dzJvcGE5cHQ3MWJmaiJ9.ohDtLEc_AuCHfk1Ns3t8hA';
        let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
        mapboxClient.geocoding
            .forwardGeocode({
                query: this.product.vendor.address,
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
                        zoom: 10,
                    });

                    new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
                }
            });
    },
};
</script>

<style lang="scss" scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>
