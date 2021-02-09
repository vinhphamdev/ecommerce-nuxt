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

            this._from = [-73.98598843989849, 40.75753761273267];

         this._to = [-74.01306601045609, 40.712251474963686];

        let feature = from.body.features[0];

         this.map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v10',
                        center: [-73.98598843989849, 40.75753761273267],
                        zoom: 12,
                    });

                    this.map.getCanvasContainer();


//   Add starting point to the map

  this.map.on('load', () => {
        this.getRoute();

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
  })
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

    var route = response.routes[0].geometry.coordinates;
    var geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, reset it using setData
    if (this.map.getSource('route')) {
      this.map.getSource('route').setData(geojson);
    } else { // otherwise, make a new request
    console.log('elseeeeee');
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
              coordinates: geojson
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
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
