import Repository from '~/repositories/Repository';
import { baseUrl } from '~/repositories/Repository';

export const state = () => ({
    products: []
});

export const getters = {
    getAllProducts: state => {
        return state.products;
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
    }

};
