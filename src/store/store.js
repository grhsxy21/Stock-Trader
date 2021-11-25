import Vue from 'vue';
import Vuex from 'vuex';
import Portfolio from "./portfolio";
import Stocks from "./stocks";
import Share from "./share";

Vue.use(Vuex);

export const store = new Vuex.Store({
    mutations: {
        restoreState: (state, payload) => {
            state.Portfolio.funds = payload.funds;
            //state.Portfolio.asset = payload.asset;
            state.Stocks.stocks = payload.stocks; 
            state.Portfolio.portfolio = payload.portfolio; 
            state.Share.id=payload.id;
        }
    },
    actions: {
        save( { state }) {
            let currentState = {
                stocks: state.Stocks.stocks,
                portfolio: state.Portfolio.portfolio,
                funds: state.Portfolio.funds,
                //asset: state.Portfolio.asset,
                id:state.Share.id
            };
            Vue.http.put('https://udemy-vuejs-7a74d.firebaseio.com/state.json', currentState)
                // .then(response => {
                //     // Get unique identifier
                //     //request.body.name
                //     //console.log(response);
                // });
        },
        restore( { commit } ) {
            /* Restore saved state */
            Vue.http.get('https://udemy-vuejs-7a74d.firebaseio.com/state.json')
                .then(response => {
                    // Get unique identifier
                    //request.body.name
                    commit("restoreState",response.body);

                });

        }
    },
    modules: {
        Portfolio,
        Stocks,
        Share
    }
});