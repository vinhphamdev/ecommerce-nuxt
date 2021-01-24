import Repository from '~/repositories/Repository';
import { baseUrl } from '~/repositories/Repository';
import Cookies from 'js-cookie';

export const state = () => ({
    products: [],
    vendors: [],
    vendor: {}
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
    },

    updateVendor(state, payload) {
        state.vendor = payload;
    },

    updateVendors(state, payload) {
        state.vendors = payload;
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
                console.log(response);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

};
