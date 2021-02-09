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
    email: '',
    // phone_number: ''
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
        // state.phone_number = '';
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

    // updatePhone(state, payload) {
    //     state.phone_number = payload;
    // },

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
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'multipart/form-data; boundary=something'
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
                    commit('updateCustomerId', response.data[0].id);
                    commit('updateName', response.data[0].name);
                    commit('updateAddress', response.data[0].customer_address);
                    commit('updateEmail', response.data[0].user.email);
                    // commit('updatePhone', response.data[0].phone_number);
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
            customer_address: params.customer_address,
            // phone_number: params.phone_number
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
                    // commit('updatePhone', response.data.phone_number);
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
    },

    async getMap({ commit, state }, params) {
        console.log('params', params);
        const response = await Repository.get(
            `https://api.mapbox.com/directions/v5/mapbox/cycling/${params.start1},${params.start2};${params.end1},${params.end2}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoicGhvbmduaGF0MTkiLCJhIjoiY2traWtzMXRrMjV4dzJvcGE5cHQ3MWJmaiJ9.ohDtLEc_AuCHfk1Ns3t8hA`,
        )
            .then(
                response => {
                    console.log('response', response);
                    return response.data
                }
            )
            .catch(error => ({
                error: JSON.stringify(error)
            }))

        return response;
    }

};
