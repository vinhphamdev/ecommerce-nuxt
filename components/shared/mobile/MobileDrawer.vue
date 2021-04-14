<template lang="html">
    <v-navigation-drawer v-model="drawer" width="100%" absolute temporary>
        <panel-shopping-cart v-if="currentDrawerContent === 'cart'" />
        <panel-categories v-if="currentDrawerContent === 'categories'" />
        <panel-vendors v-if="currentDrawerContent === 'vendors'" />
        <panel-search v-if="currentDrawerContent === 'search'" />
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import PanelShoppingCart from '~/components/shared/mobile/modules/PanelShoppingCart';
import PanelCategories from '~/components/shared/mobile/modules/PanelCategories';
import PanelVendors from '~/components/shared/mobile/modules/PanelVendors';
import PanelSearch from '~/components/shared/mobile/modules/PanelSearch';

export default {
    name: 'MobileDrawer',
    components: { PanelSearch, PanelVendors, PanelCategories, PanelShoppingCart },
    computed: {
        ...mapState({
            appDrawer: state => state.app.appDrawer,
            currentDrawerContent: state => state.app.currentDrawerContent
        }),
        drawer: {
            get() {
                return this.appDrawer;
            },
            set(newValue) {
                return newValue;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
