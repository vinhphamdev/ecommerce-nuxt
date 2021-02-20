<template lang="html">
    <div class="navigation__right">
        <nuxt-link to="/account/shopping-cart" class="header__extra">
            <i class="icon-bag2"></i>
            <span>
                <i>0</i>
            </span>
        </nuxt-link>
        <nuxt-link :to="!isLoggedIn ? '/account/login' : '/account/user-information'" class="header__extra">
            <i class="icon-user"></i>
        </nuxt-link>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'MobileHeaderActions',
    computed: {
        ...mapState({
            isLoggedIn: (state) => {
                return state.auth.isLoggedIn
            },
        }),
    },
};
</script>

<style lang="scss" scoped></style>
