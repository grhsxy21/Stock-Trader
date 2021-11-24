const state = {
    funds: 0,
    asset: 0,
    portfolio: [
        { name: "BMW", quantity: 0, stock: null },
        { name: "Google", quantity: 0, stock: null },
        { name: "Apple", quantity: 0, stock: null },
        { name: "Twitter", quantity: 0, stock: null }
    ]
}

const getters = {
    funds: state => {
        return state.funds;
    },
    asset: state => {
        return state.asset;
    },
    portfolio: state => {
        /* Only return items that have a quantity */
        return state.portfolio.filter( item => item.quantity > 0 );
    }
}

const mutations = {
    buy: (state, payload) => {
        let cost = payload.stockprice * payload.quantity;
        state.funds = state.funds - cost;
        state.asset = state.asset + cost;
    },
    sell: (state, payload) => {
        state.funds = state.funds + (payload.stockprice * payload.quantity);
        state.asset = state.asset - (payload.stockprice * payload.quantity);
    },
    refresh_asset: (state, payload) => {
        state.funds = payload.funds;
        state.asset = payload.asset;
    }
}

export default {
    state,
    mutations,
    getters
}