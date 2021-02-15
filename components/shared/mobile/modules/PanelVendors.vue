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
            <!-- <div class="ps-site-actions">
                <div class="row">
                    <div class="col-6">
                        <mobile-currency-switcher />
                    </div>
                    <div class="col-6">
                        <mobile-languge-switcher />
                    </div>
                </div>
            </div> -->
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
import MobileSubmenu from '~/components/shared/mobile/modules/MobileSubmenu';
import MobileCurrencySwitcher from '~/components/shared/mobile/modules/MobileCurrencySwitcher';
import MobileLangugeSwitcher from '~/components/shared/mobile/modules/MobileLangugeSwitcher';
export default {
    name: 'PanelVendors',
    components: {
        MobileLangugeSwitcher,
        MobileCurrencySwitcher,
        MobileSubmenu
    },
    computed: {
        ...mapState({
            vendors: (state) => state.shop.vendors,
        }),
    },
    methods: {
        handleClosePanel(url) {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
            if (url) {
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
