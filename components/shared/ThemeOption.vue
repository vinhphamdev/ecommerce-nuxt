<template lang="pug">
    aside.ps-panel--theme-option(:class="showThemeOption ? 'active': ''")
        button.ps-panel__toggle(@click.prevent="handleShowThemeOption"): i.icon.feather.icon-settings
        .ps-panel__wrapper
            .ps-panel__header
            .ps-panel__content
                .form-group
                    label Dark Mode
                    v-switch(
                        v-model="darkTheme"
                        v-on:change="handleChangeTheme"
                    )
                .theme-color
                    button(@click="handleChangeThemeColor" class="purple")
                    button(@click="handleChangeThemeColor" class="orange")
</template>

<script>
import { mapState } from 'vuex';
export default {
    data: () => {
        return {
            darkTheme: false,
            showThemeOption: false
        };
    },
    computed: {
        ...mapState({
            darkMode: state => state.theme.darkMode
        }),
        navigationType() {
            return !this.isLoggedIn ? 'navigation' : 'navigation-logged-in';
        }
    },
    mounted() {
        if (this.darkMode === true) {
            this.darkTheme = true;
        } else {
            this.darkTheme = false;
        }
    },
    methods: {
        handleChangeTheme() {
            if (this.darkTheme === false) {
                this.$store.commit('theme/changeTheme', false);
            } else {
                this.$store.commit('theme/changeTheme', true);
            }
        },
        handleShowThemeOption() {
            if (!this.showThemeOption === true) {
                this.showThemeOption = true;
            } else {
                this.showThemeOption = false;
            }
        },

        handleChangeThemeColor() {
            const rootElement = document.querySelector(':root');
            rootElement.style.setProperty('--color-1st', 'hsl(45, 96%, 48%)');
        }
    }
};
</script>
<style lang="scss">
/*.ps-panel--theme-option {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 999999;
    transform: translate(100%, -50%);
    width: 200px;
    height: auto;
    padding: 50px 30px;
    border-radius: 0;
    background-color: #fff;
    transition: all 0.4s ease;
    .ps-panel__toggle {
        position: absolute;
        top: 0;
        right: 100%;
        width: 40px;
        height: 40px;
        background-color: #fff;
    }
    &.active {
        transform: translate(0, -50%);
    }
}*/
</style>
