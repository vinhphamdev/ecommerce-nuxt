import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { baseUrl } from '~/repositories/Repository';

export const state = () => ({
    isLoggedIn: false,
    // token: localStorage.getItem('token') || ''
    token: ''
});

export const mutations = {
    setToken(state, payload) {
        // localStorage.setItem('token', payload);
        state.token = payload;
        state.isLoggedIn = true;
    },

    logout(state) {
        // localStorage.setItem('token', '');
        state.token = '';
        state.isLoggedIn = false;
    }
};

export const actions = {
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
    },

    async vendorRegistration({ commit, state }, payload) {
        const response = await Repository.post(
            `${baseUrl}/vendors`, payload, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        }
        )
            .then(
                response => {
                    return response.data
                }
            )
            .catch(error => ({
                error: JSON.stringify(error)
            }))

        return response;
    }

};
