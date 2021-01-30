export const actions = {
    async nuxtServerInit({ commit, dispatch }) {
        const cartItems = this.$cookies.get('cart', { parseJSON: true });
        const auth = this.$cookies.get('auth', { parseJSON: true });
        if (cartItems && cartItems.cartItems.length > 0) {
            commit('cart/initCart', {
                cartItems: cartItems.cartItems,
                total: cartItems.total,
                amount: cartItems.amount
            });
            let query = [];
            cartItems.cartItems.forEach(item => {
                query.push(item.id);
            });
            await dispatch('product/getCartProducts', query);
        }

        // if (auth) {
        //     commit('auth/setIsLoggedIn', Boolean(auth.isLoggedIn));
        // }
    }
};
