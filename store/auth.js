import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { baseUrl } from '~/repositories/Repository';
import Cookies from 'js-cookie';

export const state = () => ({
    isLoggedIn: false,
    // token: localStorage.getItem('token') || ''
    token: '',
    userId: ''

});

export const mutations = {
    setToken(state, payload) {
        Cookies.set('id_token', payload);
        state.token = payload;
        state.isLoggedIn = true;
    },

    logout(state) {
        Cookies.set('id_token', '');
        state.token = '';
        state.isLoggedIn = false;
        state.userId = ''
    },

    updateUserId(state, payload) {
        state.userId = payload;
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
