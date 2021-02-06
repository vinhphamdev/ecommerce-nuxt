import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { baseUrl } from '~/repositories/Repository';
import Cookies from 'js-cookie';

export const state = () => ({
    isLoggedIn: false,
    token: '',
    userId: '',

    // user infor
    customerId: '',
    name: '',
    address: '',
    email: ''
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
        state.userId = '';
        state.name = '';
        state.address = '';
        state.email = '';
    },

    updateUserId(state, payload) {
        state.userId = payload;
    },

    updateName(state, payload) {
        state.name = payload;
    },

    updateAddress(state, payload) {
        state.address = payload;
    },

    updateEmail(state, payload) {
        state.email = payload;
    },

    updateCustomerId(state, payload) {
        state.customerId = payload;
    }
};

export const actions = {
    async register({ commit }, payload) {
        const response = await Repository.post(
            `${baseUrl}/auth/local/register`, payload
        )
            .then(response => {
                commit('setToken', response.data.jwt);
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
    },

    async getProfile({ commit, state }, userId) {
        const response = await Repository.get(
            `${baseUrl}/customers?user=${userId}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        }
        )
            .then(
                response => {
                    console.log(response.data[0]);
                    commit('updateCustomerId', response.data[0].id);
                    commit('updateName', response.data[0].name);
                    commit('updateAddress', response.data[0].customer_address);
                    commit('updateEmail', response.data[0].user.email);
                    return response.data
                }
            )
            .catch(error => ({
                error: JSON.stringify(error)
            }))

        return response;
    },

    async updateProfile({ commit, state }, params) {
        const response = await Repository.put(
            `${baseUrl}/customers/${params.id}`, {
            name: params.name,
            customer_address: params.customer_address
        }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        }
        )
            .then(
                response => {
                    commit('updateName', response.data.name);
                    commit('updateAddress', response.data.customer_address);
                    commit('updateEmail', response.data.user.email);
                    return response.data
                }
            )
            .catch(error => ({
                error: JSON.stringify(error)
            }))

        return response;
    },

    async createProfile({ commit, state }, params) {
        const response = await Repository.post(
            `${baseUrl}/customers`, {
            name: params.name,
            customer_address: params.address,
            phone: params.phone,
            email: params.email,
            user: params.id
        }, {
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
