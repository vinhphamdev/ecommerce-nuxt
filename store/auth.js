import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { baseUrl } from '~/repositories/Repository';

export const state = () => ({
    isLoggedIn: false
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
};

export const actions = {
    setAuthStatus({ commit, state }, payload) {
        commit('setIsLoggedIn', payload);
        const cookieParams = {
            isLoggedIn: state.isLoggedIn
        };

        this.$router.push('/');

        // this.$cookies.set('auth', cookieParams, {
        //     path: '/',
        //     maxAge: 60 * 60 * 24 * 7
        // });
    },

    async register({ commit }, payload) {
        const response = await Repository.post(
            `${baseUrl}/auth/local/register`, payload
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },

    async login({ commit }, payload) {
        const response = await Repository.post(
            `${baseUrl}/auth/local`, payload
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }))

        return response;
    }
};
