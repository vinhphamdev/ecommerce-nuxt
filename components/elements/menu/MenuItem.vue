<template lang="pug">
    span.menu-item__content(:class="menuItem.subMenu ? 'menu-item-has-children': ''" @click.prevent="handleClosePanel")
        nuxt-link(:to="menuItem.url") {{menuItem.text }}
        span.sub-toggle
        ul(v-if="menuItem.subMenu" :class="menuItem.subMenuClassName")
            li(v-for="subMenuItem, index in menuItem.subMenu" :key="index")
                menuItem(:menuItem="subMenuItem")
</template>

<script>
export default {
    name: 'menuItem',
    props: {
        menuItem: {
            type: Object
        }
    },

    methods: {
        handleClosePanel(e) {
            if (e.target.className !== 'sub-toggle') {
                this.$store.commit('theme/updateSiteOverlay', false);
                this.$store.commit('theme/updateNavigationPanel', false);
            } else {
                console.log(e.target.parentNode.querySelector('.sub-menu'));
            }
        }
    }
};
</script>
