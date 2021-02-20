import Repository, { serializeQuery } from "~/repositories/Repository.js";
import { baseUrl } from "~/repositories/Repository";

export const state = () => ({
    product: null,
    products: null,
    searchResults: null,
    cartProducts: null,
    wishlistItems: null,
    compareItems: null,
    brands: null,
    categories: null,
    totalProducts: 0
});

export const getters = {
    getCartProducts: state => state.cartProducts
};

export const mutations = {
    setProduct(state, payload) {
        state.product = payload;
    },

    setProducts(state, payload) {
        state.products = payload;
    },

    setCartProducts(state, payload) {
        state.cartProducts = payload;
    },
    setWishlistItems(state, payload) {
        state.wishlistItems = payload;
    },
    setCompareItems(state, payload) {
        state.compareItems = payload;
    },

    setBrands(state, payload) {
        state.brands = payload;
    },

    setCategories(state, payload) {
        state.categories = payload;
    },

    setSearchResults(state, payload) {
        state.searchResults = payload;
    },

    setTotal(state, payload) {
        state.totalProducts = payload;
    }
};

export const actions = {
    async getProducts({ commit }, payload) {
        return await Repository.get(`${baseUrl}/products?${serializeQuery(payload)}`)
            .then(response => {
                commit('setProducts', response.data);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getTotalRecords({ commit }, payload) {
        return await Repository.get(`${baseUrl}/products/count`)
            .then(response => {
                commit('setTotal', response.data);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getProductsById({ commit }, payload) {
        return await Repository.get(`${baseUrl}/products/${payload}`)
            .then(response => {
                commit('setProduct', response.data);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getProductByKeyword({ commit }, payload) {
        return await Repository.get(`${baseUrl}/products?${serializeQuery(payload)}`)
            .then(response => {
                commit('setSearchResults', response.data);
                commit('setTotal', response.data.length);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getProductBrands({ commit }, payload) {
        console.log('🚀 ~ file: product.js ~ getProductBrands---line 121 ~ payload', payload);
    },

    async getCartProducts({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `id=${item}`;
            } else {
                query = query + `&id=${item}`;
            }
        });

        return await Repository.get(`${baseUrl}/products?${query}`)
            .then(response => {
                commit('setCartProducts', response.data);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getProductCategories({ commit }) {
        return await Repository.get(`${baseUrl}/product-categories`)
            .then(response => {
                commit('setCategories', response.data);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    },

   

};
