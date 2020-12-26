<template lang="pug">
    v-list
        aside(v-for="menuItem, index in menu" :key="index" )
            v-list-group(v-if="menuItem.subMenu" no-action)
                template(v-slot:activator)
                    v-list-item-title(@click.prevent="handleClosePanel")
                        nuxt-link(:to="menuItem.url" class="menu__item") {{ menuItem.text }}
                v-list-item
                    menuItem(:menu="menuItem.subMenu")
            v-list-item(v-else @click.prevent="handleClosePanel")
                nuxt-link(:to="menuItem.url" class="menu__item") {{ menuItem.text }}

</template>

<script>
export default {
    name: 'menuItem',
    props: {
        menu: {
            type: Array
        }
    },

    methods: {
        handleClosePanel() {
            console.log('accc');
            this.$store.commit('theme/updateSiteOverlay', false);
            this.$store.commit('theme/updateNavigationPanel', false);
        }
    }
};
</script>
