
import Home from './components/Home.vue';
import Portfolio from './components/Portfolio.vue';
import Stocks from './components/Stocks.vue';
import Login from './components/Login.vue';

export const routes = [
   { path: '/', component: Login},
   { path: '/stocks', component: Stocks},
   { path: '/portfolio', component: Portfolio},
   { path:'/home', component: Home}
]