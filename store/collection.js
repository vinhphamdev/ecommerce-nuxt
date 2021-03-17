import Repository, { baseUrl } from '~/repositories/Repository.js';

export const state = () => ({
    collections: null,
    categories: null,
    queries: null,
});

export const mutations = {
    setCollections(state, payload) {
        state.collections = payload;
    },

    setCategories(state, payload) {
        state.categories = payload;
    },
    setQueries(state, payload) {
        state.queries = payload;
    },
};

export const actions = {
    async getCollectionsBySlugs({ commit }, payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        return await Repository.get(`${baseUrl}/collections?${query}`)
            .then((response) => {
                commit('setCollections', response.data);
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
    },
    async getCategoriesBySlugs({ commit }, payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        return await Repository.get(`${baseUrl}/product-categories?${query}`)
            .then((response) => {
                commit('setCategories', response.data);
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
    },
};
