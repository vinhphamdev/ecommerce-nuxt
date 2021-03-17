import Cookies from 'js-cookie';

const calculateAmount = (obj) =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

const calculateTotalItems = (obj) => Object.values(obj).reduce((acc, { quantity }) => acc + quantity, 0);

export const state = () => ({
    amount: 0, // should be total here
    total: 0, // should be amount here
    subtotal: 0, // = amount - (amount * 19 / 100) // price before tax
    tax: 19, // in meaning of %
    cartItems: [],
    filteredCartItems: [],
    selectedVendor: '',
    loading: false,
});

export const getters = {
    isLoading: (state) => state.loading,
    getCart: (state) => {
        return state.cartItems;
    },

    getProductQuantityById: (state) => (productId) => {
        if (!state.cartItems || !productId) {
            return 0;
        }

        const product = state.cartItems.find((item) => item.id === productId);
        return product ? product.quantity : 0;
    },
};

export const mutations = {
    setLoading(state, payload) {
        state.loading = payload;
    },

    initCart(state, payload) {
        state.cartItems = payload.cartItems;
        state.amount = payload.amount;
        state.total = payload.total;
        state.subtotal = parseFloat(state.amount - (state.amount * state.tax) / 100).toFixed(2);
        state.filteredCartItems = payload.filteredCartItems || [];
    },

    addItem(state, payload) {
        console.log('addItem', payload);
        let existItem = state.cartItems.find((item) => item.id === payload.id);
        if (existItem) {
            console.log('item exist');
            existItem.quantity += payload.quantity;
        } else {
            console.log('item dont exist');

            state.cartItems.push(payload);
        }
        state.total += payload.quantity;
    },

    removeItem: (state, payload) => {
        console.log('🚀 ~ file: cart.js ~ line 77 ~ payload', payload);

        if (payload.quantity) {
            state.total = state.total - payload.quantity;
        }

        state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
    },

    increaseItemQuantity(state, payload) {
        let selectedItem = state.cartItems.find((item) => item.id === payload.id);
        if (!selectedItem) return;

        selectedItem.quantity++;
        state.total++;
    },

    decreaseItemQuantity(state, payload) {
        let selectedItem = state.cartItems.find((item) => item.id === payload.id);
        if (selectedItem && selectedItem.quantity === 1) return;

        if (state.total < payload.quantity) {
            selectedItem.quantity = 0;
            state.total = 0;
            return;
        }

        selectedItem.quantity--;
        state.total--;
    },

    changeItemQuantity(state, payload) {
        // if (!payload || !payload.itemQuantity || payload.itemQuantity < 0) return 0

        let selectedItemIndex = state.cartItems.findIndex((item) => item.id === payload.id);
        state.cartItems[selectedItemIndex].quantity = payload.quantity;
    },

    clearCart: (state) => {
        state.cartItems = [];
        state.filteredCartItems = [];
        state.amount = 0;
        state.total = 0;
        state.subtotal = 0;
        state.loading = false;
    },

    clearItemInCart: (state, itemList) => {
        state.filteredCartItems = [];
        const idList = itemList.map((i) => i.id);
        let newTotal = state.total;
        state.cartItems = state.cartItems.filter((item) => {
            const itemToRemove = itemList.find((i) => i.id === item.id);
            if (itemToRemove) newTotal -= itemToRemove.quantity;
            return !idList.includes(item.id);
        });

        state.total = newTotal;
    },

    chooseVendor: (state, vendorId) => {
        state.selectedVendor = vendorId;
        state.filteredCartItems = state.cartItems.filter((item) => {
            return item.vendorId === vendorId;
        });
    },

    recalculateAmount: (state) => {
        state.amount = calculateAmount(state.cartItems);
        state.total = calculateTotalItems(state.cartItems);
        state.subtotal = parseFloat(state.amount - (state.amount * state.tax) / 100).toFixed(2);
    },

    updateFilteredCartItems: (state) => {
        state.filteredCartItems = state.cartItems.filter((item) => item.vendorId === state.selectedVendor);
    },

    updateCookiesStorage: (state) => {
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems,
        };
        Cookies.set('cart', cookieParams, {
            path: '/',
            expires: 60 * 60 * 24 * 7,
        });
    },
};

export const actions = {
    addProductToCart({ commit }, payload) {
        if (payload) {
            commit('addItem', payload);
            commit('recalculateAmount');
            commit('updateFilteredCartItems');
            commit('updateCookiesStorage');
        }
    },

    removeProductFromCart({ commit, state }, payload) {
        if (state.cartItems.length === 0 || state.amount === 0) {
            commit('clearCart');
            return;
        }

        commit('removeItem', payload);
        commit('recalculateAmount');
        commit('updateFilteredCartItems');
        commit('updateCookiesStorage');
    },

    increaseCartItemQuantity({ commit }, payload) {
        commit('increaseItemQuantity', payload);
        commit('recalculateAmount');
        commit('updateFilteredCartItems');
        commit('updateCookiesStorage');
    },

    updateItemQuantity({ commit }, payload) {
        commit('changeItemQuantity', payload);
        commit('recalculateAmount');
        commit('updateFilteredCartItems');
        commit('updateCookiesStorage');
    },

    decreaseCartItemQuantity({ commit }, payload) {
        commit('decreaseItemQuantity', payload);
        commit('recalculateAmount');
        commit('updateFilteredCartItems');
        commit('updateCookiesStorage');
    },

    clearCart({ commit }) {
        commit('clearCart');
        commit('recalculateAmount');
        commit('updateCookiesStorage');
    },

    clearItemInCart({ commit }, payload) {
        commit('clearItemInCart', payload);
        commit('recalculateAmount');
        commit('updateCookiesStorage');
    },
};
