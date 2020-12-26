<template lang="pug">
    ul.menu--mega(:class="megaActive ? 'active': ''")
        li(v-for="item in megaData" :class="item.subMenu ? 'menu-item-has-children' : ''")
            a(href="#" @click.prevent="")
                span {{ item.text }}
                i(v-if="item.subMenu").icon.feather.icon-chevron-right
            .mega-menu__content(v-if="item.subMenu")
                .mega-menu__column(v-for="subMenuItem in item.subMenu")
                    h5: nuxt-link(:to="subMenuItem.url") {{ subMenuItem.heading }}
                    MegaItem(:menuData="subMenuItem.subMenu")
</template>

<script>
import { mapState } from 'vuex';
import megaMenuData from '~/static/data/megaMenu.json';
import MegaItem from '~/components/shared/headers/modules/MegaItem';

export default {
    name: 'MegaMenu',
    components: {
        MegaItem
    },
    computed: {
        ...mapState({
            megaActive: state => state.theme.megaMenu
        }),
        megaData() {
            return megaMenuData.megamenu;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/env.scss';
/*
.menu--mega {
    width: 100%;
    max-width: 330px;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 10px 0;
    background-color: #fff;
    transition: all 0.25s $ease-in-out-quad;
    box-shadow: 1px 1px 8px 0 rgba(#ccc, 0.5);
    @include hidden;
    transform: scale3d(1, 1, 0) translateY(30px);
    > li {
        > a {
            display: flex;
            padding: 12px 0 12px 20px;
            justify-content: space-between;
            line-height: 20px;
            font-family: $font-2nd;
            color: $color-text;
            font-weight: 500;
            z-index: 999;
            span {
                @include textEffectBackground();
            }
            i {
                margin-right: 20px;
                z-index: 1001;
                font-size: 18px;
            }
            &.active {
                color: $color-heading;
                font-weight: 600;
            }
        }

        &.menu-item-has-children {
            > a {
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: 0;
                    width: 30px;
                    height: 100%;
                    z-index: 1001;
                    background-color: #fff;
                    transform: translateY(-50%);
                    transform-origin: 0 0;
                }

                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: 0;
                    width: 16px;
                    height: 16px;
                    z-index: 1000;
                    background-color: #fff;
                    transform-origin: 100% 50%;
                    transform: translate(-10px, -50%) rotate(45deg);
                    box-shadow: 1px 1px 8px 0 rgba(#ccc, 0.5);
                    transition: all 0.25s $ease-in-out-quad;
                }
            }

            &:hover {
                > a {
                    &:after {
                        transform: translate(40%, -50%) rotate(45deg);
                        transform-origin: 100% 50%;
                    }
                }
                .mega-menu__content {
                    @include show;
                    transform: scale3d(1, 1, 1) translateX(0);
                }
            }
        }

        &:hover {
            > a {
                color: $color-heading;
            }
        }

        &:last-child {
            border-bottom: none;
        }
    }

    .mega-menu__column {
        padding: 0 10px;

        h5 {
            margin-bottom: 10px;

            a {
                display: block;
                line-height: 1em;
                font-family: $font-2nd;
                color: $color-heading;
                font-size: 14px;
                font-weight: 600;
            }
        }
    }

    .mega-menu__content {
        position: absolute;
        top: 0;
        left: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        width: calc(1170px - 300px);
        min-height: 100%;
        z-index: 99;
        padding: 30px 50px;
        box-shadow: 1px 1px 4px rgba(#eee, 0.5);
        background-color: darken(#f9f9f9, 2%);
        transition: all 0.25s $ease-in-out-quad;
        @include hidden;
        transform: scale3d(1, 1, 0) translateX(10px);

        .mega-menu__column {
            flex-basis: 100%;
            max-width: 25%;
            margin-bottom: 30px;
        }
    }

    &.active {
        @include show;
        transform: scale3d(1, 1, 1) translateY(0);
    }
}*/
</style>
