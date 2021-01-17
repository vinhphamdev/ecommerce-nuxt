import Repository from '~/repositories/Repository';
import { baseUrl } from '~/repositories/Repository';

export const state = () => ({
    products: [],
    vendors: []
});

export const getters = {
    getAllProducts: state => {
        return state.products;
    },

    getAllVendors: state => {
        return state.vendors;
    },
};

export const mutations = {};

export const actions = {

    async getAllProducts({ commit, state }) {
        const response = await Repository.get(
            `${baseUrl}/products`
        )
            .then(response => {
                state.products = response.data;
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
                state.vendors = response.data;
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

};
