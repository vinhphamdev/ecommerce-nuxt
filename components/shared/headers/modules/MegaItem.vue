<template lang="pug">
    ul.menu--mega-item
        li(v-for="item in menuData")
            nuxt-link(:to="item.url") {{ item.text }}

</template>

<script>
export default {
    name: 'MegaItem',
    props: {
        menuData: {
            type: Array
        }
    }
};
</script>
<!--
<style lang="scss" scoped>
@import '~/assets/scss/env.scss';

.menu&#45;&#45;mega-item {
    li {
        display: block;
        margin-bottom: 5px;
        a {
            display: inline-block;
            line-height: 20px;
            font-size: 14px;
            color: $color-text;
            padding-right: 10px;
            @include textEffectBackground();
            &:hover {
                color: $color-1st;
            }
        }
    }
}
</style>-->
