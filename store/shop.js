import Repository, { baseUrl, token } from '~/repositories/Repository';
import Cookies from 'js-cookie';

export const state = () => ({
    products: [],
    vendorProducts: [],
    productsCatalogue: [],
    vendors: [],
    vendor: {},

    orderDetail: {},

    categories: [],

    listView: false
});

export const getters = {
    getAllProducts: state => {
        return state.products;
    },

    getAllVendors: state => {
        return state.vendors;
    }
};

export const mutations = {
    updateProducts(state, payload) {
        state.products = payload;
        state.productsCatalogue = payload;
    },

    updateVendorProducts(state, payload) {
        state.vendorProducts = payload;
    },

    filterProduct(state, name) {
        if (name) {
            state.productsCatalogue = state.products.filter(item => {
                if (item.product_types.length > 0) {
                    return item.product_types.some(foundItem => {
                        return foundItem.name === name;
                    });
                } else {
                    return false;
                }
            });
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

    setCategories(state, payload) {
        state.categories = payload;
    },

    changeViewMode(state, payload) {
        if (typeof payload !== 'boolean') return;
        state.listView = payload;
    }
};

export const actions = {
    async getAllProducts({ commit }) {
        return await Repository.get(`${baseUrl}/products`)
            .then(response => {
                commit('updateProducts', response.data);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getAllProductsByVendor({ commit }, vendorId) {
        return await Repository.get(`${baseUrl}/products?vendor=${vendorId}`)
            .then(response => {
                // commit('updateProducts', response.data);
                commit('updateVendorProducts', response.data);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getAllVendors({ commit }) {
        return await Repository.get(`${baseUrl}/vendors?status=ACTIVE`)
            .then(response => {
                commit('updateVendors', response.data);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getVendorById({ commit }, vendorId) {
        return await Repository.get(`${baseUrl}/vendors?id=${vendorId}`)
            .then(response => {
                commit('updateVendor', response.data[0]);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async createOrder({}, params) {
        // const token = Cookies.get('id_token');
        return await Repository.post(`${baseUrl}/orders`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getOrderDetail({ commit }, orderNumber) {
        return await Repository.get(`${baseUrl}/orders?order_number=${orderNumber}`)
            .then(response => {
                commit('updateOrderDetail', response.data[0]);
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getListOrder({}, userId) {
        return await Repository.get(`${baseUrl}/orders?user=${userId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getLandingPage({}) {
        return await Repository.get(`${baseUrl}/pages?slug=landing-page`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    },

    async getProductType({ commit }) {
        return await Repository.get(`${baseUrl}/product-types`)
            .then(response => {
                const allProductsType = {
                    name: 'All products',
                    id: 'all_products'
                };
                const types = [allProductsType].concat(response.data);
                commit('setCategories', types);
                return types;
            })
            .catch(error => ({
                error: JSON.stringify(error)
            }));
    }
};
