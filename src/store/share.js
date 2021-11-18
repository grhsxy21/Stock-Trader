export const state = {
    id: ""
};

export const getters = {
    id: state => {
        return state.id;
    }
};

export const mutations = {
    refresh: (state, payload) => {
        state.id = payload.id
    }
};

export default {
    state,
    mutations,
    getters
}