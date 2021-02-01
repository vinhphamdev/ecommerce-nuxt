<template lang="html">
    <ul class="menu--dropdown">
        <template v-for="item in menuCategories">
            <menu-dropdown v-if="item.subMenu" :menu-data="item" />
            <menu-mega v-else-if="item.mega" :menu-data="item" />
            <li v-else :key="item.text">
                <nuxt-link :to="localePath(item.url)">
                    {{ item.text }}
                </nuxt-link>
            </li>
        </template>
    </ul>
</template>

<script>
import MenuDefault from '~/components/shared/menu/MenuDefault';
import MenuDropdown from '~/components/shared/menu/MenuDropdown';
import MenuMega from '~/components/shared/menu/MenuMega';
export default {
    name: 'MenuCategories',
    components: { MenuMega, MenuDropdown, MenuDefault },
    data() {
        return {
            menuCategories: [],
        };
    },
    async created() {
        const vendors = await this.$store.dispatch('shop/getAllVendors');
        this.menuCategories = vendors.map((item) => {
            return {
                icon: 'icon-star',
                text: item.name,
                url: `/vendor/${item.id}`,
            };
        });
    },
};
</script>

<style lang="scss" scoped></style>
