import Repository from '~/repositories/Repository';
import { baseUrl } from '~/repositories/Repository';
import Cookies from 'js-cookie';

export const state = () => ({
    products: [],
    productsCatalogue: [],
    vendors: [],
    vendor: {},

    orderDetail: {},

    categories: []
});

export const getters = {
    getAllProducts: state => {
        return state.products;
    },

    getAllVendors: state => {
        return state.vendors;
    },
};

export const mutations = {
    updateProducts(state, payload) {
        state.products = payload;
        state.productsCatalogue = payload;
    },

    filterProduct(state, name){
        if (name) {
            const arr = state.products.filter((item) => {
                if (item.product_types.length > 0) {
                    return item.product_types.some(it => {
                        return it.name == name;
                    })
                } else {
                    return false
                }
            });
    
            state.productsCatalogue = arr;
        } else {
            state.productsCatalogue = state.products;
        }
    },

    updateVendor(state, payload) {
        state.vendor = payload;
    },

    updateVendors(state, payload) {
        state.vendors = payload;
    },

    updateOrderDetail(state, payload) {
        state.orderDetail = payload;
    },

    setCategories(state, payload){
        state.categories = payload;
    },

};

export const actions = {

    async getAllProducts({ commit, state }) {
        const response = await Repository.get(
            `${baseUrl}/products`
        )
            .then(response => {
                commit('updateProducts', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async getAllProductsByVendor({ commit, state }, vendorId) {
        const response = await Repository.get(
            `${baseUrl}/products?vendor=${vendorId}`
        )
            .then(response => {
                commit('updateProducts', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async getAllVendors({ commit, state }) {
        const response = await Repository.get(
            `${baseUrl}/vendors?status=ACTIVE`
        )
            .then(response => {
                commit('updateVendors', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async getVendorById({ commit, state }, vendorId) {
        const response = await Repository.get(
            `${baseUrl}/vendors?id=${vendorId}`
        )
            .then(response => {
                commit('updateVendor', response.data[0]);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async createOrder({ commit, state }, params) {
        const token = Cookies.get('id_token');
        const response = await Repository.post(
            `${baseUrl}/orders`, params, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async getOrderDetail({ commit, state }, orderNumber) {
        const response = await Repository.get(
            `${baseUrl}/orders?order_number=${orderNumber}`
        )
            .then(response => {
                commit('updateOrderDetail', response.data[0]);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async getListOrder({ commit, state }, userId) {
        const response = await Repository.get(
            `${baseUrl}/orders?user=${userId}`
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async getLandingPage({ commit, state }) {
        const response = await Repository.get(
            `${baseUrl}/pages?slug=landing-page`
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async getProductType({ commit, state }) {
        const response = await Repository.get(
            `${baseUrl}/product-types`
        )
            .then(response => {
                const allProductsType = {
                    name: 'All products',
                    id: 'all_products'
                }
                const types = [allProductsType].concat(response.data)
                console.log('aaa', types);
                commit('setCategories', types);
                return types;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

};
