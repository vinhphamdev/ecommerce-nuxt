<template lang="html">
    <div class="ps-panel--sidebar">
        <div class="ps-panel__header">
            <h3>Vendors</h3>
            <a
                href="#"
                class="ps-panel__close"
                @click.prevent="handleClosePanel"
            >
                <i class="icon icon-cross"></i>
            </a>
        </div>
        <div class="ps-panel__content">
            <v-list class="menu--mobile">
                <template v-for="vendor in vendors">
                    <v-list-item-content>
                        <span
                            @click="handleClosePanel(`/vendor/${vendor.id}`)"
                        >
                            {{ vendor.name }}
                        </span>
                    </v-list-item-content>
                </template>
            </v-list>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'PanelVendors',
    computed: {
        ...mapState({
            vendors: (state) => state.shop.vendors,
        }),
    },
    methods: {
        handleClosePanel(url) {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
            if (typeof url === 'string') {
                this.$router.push(url);
            }
        }
    },
    async created() {
        await this.$store.dispatch('shop/getAllVendors');
    },
};
</script>

<style lang="scss" scoped></style>
