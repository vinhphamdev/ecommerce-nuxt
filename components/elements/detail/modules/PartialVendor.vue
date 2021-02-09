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
    data() {
        return {
            map: null,
            _from:null,
            _to:null
        }
    },
    async created() {
        if (!this.product.vendor.address) return;

        mapboxgl.accessToken =
            'pk.eyJ1IjoicGhvbmduaGF0MTkiLCJhIjoiY2traWtzMXRrMjV4dzJvcGE5cHQ3MWJmaiJ9.ohDtLEc_AuCHfk1Ns3t8hA';
        let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

        const from = await mapboxClient.geocoding
            .forwardGeocode({
                query: this.product.vendor.address,
                autocomplete: false,
                limit: 1,
            }).send();

            console.log('from', from);
            
            this._from = ['40.712776', '-74.005974'];

         this._to = ['40.747697277759166', '-73.98528100727081'];

        //     this._from = ['-84.518641','39.134270'];

        //  this._to = ['-84.512023','39.102779'];

        let feature = from.body.features[0];

         this.map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: feature.center,
                        zoom: 15,
                    });

        this.getRoute();

//   Add starting point to the map

  this.map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: this._from
          }
        }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });

        // mapboxClient.geocoding
        //     .forwardGeocode({
        //         query: this.product.vendor.address,
        //         autocomplete: false,
        //         limit: 1,
        //     })
        //     .send()
        //     .then(function (response) {
        //         console.log(response);
        //         if (
        //             response &&
        //             response.body &&
        //             response.body.features &&
        //             response.body.features.length
        //         ) {
        //             let feature = response.body.features[0];
        //             let map = new mapboxgl.Map({
        //                 container: 'map',
        //                 style: 'mapbox://styles/mapbox/streets-v11',
        //                 center: feature.center,
        //                 zoom: 15,
        //             });

        //             new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
        //         }
        //     });
    },

    methods: {

    async getRoute() {
        const params = {
            start1: this._from[0],
            start2: this._from[1],
            end1: this._to[0],
            end2: this._to[1]
        }

        const response = await this.$store.dispatch('auth/getMap', params);

        console.log('response', response);

    // var data = json.routes[0];
    // var route = data.geometry.coordinates;
    // var geojson = {
    //   type: 'Feature',
    //   properties: {},
    //   geometry: {
    //     type: 'LineString',
    //     coordinates: route
    //   }
    // };
    // // if the route already exists on the map, reset it using setData
    // if (map.getSource('route')) {
    //   map.getSource('route').setData(geojson);
    // } else { // otherwise, make a new request
    //   map.addLayer({
    //     id: 'route',
    //     type: 'line',
    //     source: {
    //       type: 'geojson',
    //       data: {
    //         type: 'Feature',
    //         properties: {},
    //         geometry: {
    //           type: 'LineString',
    //           coordinates: geojson
    //         }
    //       }
    //     },
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round'
    //     },
    //     paint: {
    //       'line-color': '#3887be',
    //       'line-width': 5,
    //       'line-opacity': 0.75
    //     }
    //   });
    // }
}
    },
};
</script>

<style lang="scss" scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>
