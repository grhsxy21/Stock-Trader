<template>
    <v-app id="inspire">
        <v-app-bar app clipped-left color="blue-grey" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title><router-link to="/" style="color:white; text-decoration: none;">Stock Trader</router-link></v-toolbar-title>
            <v-spacer></v-spacer>
            <!--v-btn icon @click="endDay">
                <v-icon>mdi-calendar</v-icon>
            </v-btn>
            <v-btn icon @click="save">
                <v-icon>mdi-cloud-upload</v-icon>
            </v-btn-->
            <v-btn icon @click="restore">
                <v-icon>mdi-restore</v-icon>
            </v-btn>
            &nbsp;&nbsp;&nbsp;&nbsp;
            剩余资产: {{ funds | dollarFormat }} &nbsp;
            <!--持有股票: {{ asset | dollarFormat }} &nbsp;&nbsp;&nbsp;&nbsp;-->
        </v-app-bar>
        <v-navigation-drawer
            clipped
            v-model="drawer"
            app
        >
            <v-list dense>
                <v-list-item to="/portfolio">
                    <v-list-item-action>
                        <v-icon>mdi-currency-usd</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Portfolio</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/stocks">
                    <v-list-item-action>
                        <v-icon>mdi-finance</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Stocks</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider dark class="my-4"></v-divider>
                <!--v-list-item @click="endDay">
                    <v-list-item-action>
                        <v-icon>mdi-calendar</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>End Day</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="save">
                    <v-list-item-action>
                        <v-icon>mdi-cloud-upload</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Save</v-list-item-title>
                    </v-list-item-content>
                </v-list-item-->
                <v-list-item @click="restore">
                    <v-list-item-action>
                        <v-icon>mdi-restore</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Restore</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-content-start>
                <v-flex xs12>
                <transition name="slide-y-transition" mode="out-in">
                    <router-view></router-view>
                </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app fixed color="blue-grey" dark>
        </v-footer>
    </v-app>
</template>

<script>
import qs from 'qs'
    export default {
        data: () => ({
            drawer: true
        }),
        props: {
            source: String
        },
        computed: {
            funds() {
                return this.$store.getters.funds;
            },
            asset() {
                return this.$store.getters.asset;
            }
        },
        methods: {
            endDay() {
                this.$store.commit("endDay");
            },
            save() {
                this.$store.dispatch("save");
            },
            restore() {
                //this.$store.dispatch("restore");
                let portfolio = []
                //TODO  获取用户持仓
                let headers = {'content-type': 'application/x-www-form-urlencoded; charset = UTF-8'}
                let data = {'id':this.$store.getters.id}
                this.axios.post('http://127.0.0.1:8000/post/holdings',qs.stringify(data), {headers: headers}).then((res)=>{
                    console.log('res=>',res)
                    //console.log("length:",res.data.res.length)
                    for(let i=0; i<res.data.res.length; i++){
                        let folio={"name":res.data.res[i].StockName, "quantity":res.data.res[i].StockAmount,"price":res.data.res[i].BoughtPrice}
                        portfolio.push(folio)
                        //console.log("portfolio:",JSON.stringify(portfolio))
                        //console.log("name:",res.data.res[i].StockName)
                        //console.log("quantity:",res.data.res[i].StockAmount)
                        //console.log("price:",res.data.res[i].BoughtTotalPrice)
                    }
                    console.log("portfolio:", portfolio)
                    this.$store.commit('refresh_portfolio',{ portfolio: portfolio}) //存储到vuex
                })
                //*name股票名 price当前价格 quantity持有股票数
            }
        }
    }
</script>

<style scoped>
    a {
        color: white;
        text-decoration: none;
    }
</style>