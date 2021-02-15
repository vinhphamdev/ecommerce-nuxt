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
                        <nuxt-link
                            :to="`/vendor/${vendor.id}`"
                            @click="handleClosePanel"
                        >
                            {{ vendor.name }}
                        </nuxt-link>
                    </v-list-item-content>
                    <!-- <v-list-group v-if="menuItem.subMenu" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <nuxt-link
                                    :to="menuItem.url"
                                    @click="handleClosePanel"
                                >
                                    {{ menuItem.text }}
                                </nuxt-link>
                            </v-list-item-content>
                        </template>
                        <mobile-submenu :menu="menuItem.subMenu" />
                    </v-list-group>
                    <v-list-group v-else-if="menuItem.mega" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <nuxt-link
                                    :to="menuItem.url"
                                    @click="handleClosePanel"
                                >
                                    {{ menuItem.text }}
                                </nuxt-link>
                            </v-list-item-content>
                        </template>
                        <v-list>
                            <template v-for="megaItem in menuItem.megaContent">
                                <v-list-group no-action>
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <nuxt-link
                                                :to="menuItem.url"
                                                @click="handleClosePanel"
                                            >
                                                {{ megaItem.heading }}
                                            </nuxt-link>
                                        </v-list-item-content>
                                    </template>
                                    <mobile-submenu
                                        :menu="megaItem.megaItems"
                                    />
                                </v-list-group>
                            </template>
                        </v-list>
                    </v-list-group>
                    <v-list-item v-else>
                        <v-list-item-content>
                            <nuxt-link
                                :to="menuItem.url"
                                @click="handleClosePanel"
                            >
                                {{ menuItem.text }}
                            </nuxt-link>
                        </v-list-item-content>
                    </v-list-item> -->
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
        handleClosePanel() {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        }
    },
    async created() {
        console.log('lolo')
        await this.$store.dispatch('shop/getAllVendors');
    },
};
</script>

<style lang="scss" scoped></style>
