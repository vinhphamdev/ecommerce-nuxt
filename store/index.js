export const actions = {
    async nuxtServerInit({ commit, dispatch }) {
        const cookieCart = this.$cookies.get('cart', {
            parseJSON: true,
        });
        const auth = this.$cookies.get('auth', {
            parseJSON: true,
        });

        if (cookieCart && cookieCart.cartItems.length > 0) {
            commit('cart/initCart', {
                cartItems: cookieCart.cartItems,
                // filteredCartItems: cookieCart.filteredCartItems,
                total: cookieCart.total,
                subtotal: cookieCart.subtotal,
                amount: cookieCart.amount,
            });

            let query = [];

            cookieCart.cartItems.forEach((item) => {
                console.log(item);
                query.push(item.id);
            });

            await dispatch('product/getCartProducts', query);
        }

        // if (auth) {
        //     commit('auth/setIsLoggedIn', Boolean(auth.isLoggedIn));
        // }
    },
};
