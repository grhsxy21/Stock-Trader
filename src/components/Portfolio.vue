<template>
<div>
         <v-container
            fluid
            style="min-height: 0;"
            grid-list-lg
         >
         <h1>Portfolio</h1>
         <h3 v-if="portfolio.length == 0">You currently have no investments.</h3>
            <v-layout row wrap>
               <app-investment xs6 v-for="(investment,index) in portfolio" :key="index" :investment="investment"></app-investment>
            </v-layout>
         </v-container>
</div>
</template>

<script>
import Investment from "./Investment.vue";
import store from "../store/store.js"
import qs from 'qs'

export default {
    components: {
        "app-investment": Investment
    },
    computed: {
        portfolio() {
            //console.log(this.$store.getters.portfolio)
            /*let portfolio = [{"name": "Apple","quantity": 5,"price": 75}, {"name": "Twitter","quantity": 5,"price": 75}]
            //let portfolio = []
            //TODO  获取用户持仓
            let headers = {'content-type': 'application/x-www-form-urlencoded; charset = UTF-8'}
            let data = {'id':this.$store.getters.id}
            this.axios.post('http://127.0.0.1:8000/post/holdings',qs.stringify(data), {headers: headers}).then((res)=>{
                console.log('res=>',res)
                //console.log("length:",res.data.res.length)
                for(let i=0; i<res.data.res.length; i++){
                    let folio={"name":res.data.res[i].StockName, "quantity":res.data.res[i].StockAmount,"price":res.data.res[i].BoughtTotalPrice}
                    portfolio.push(folio)
                    //console.log("portfolio:",JSON.stringify(portfolio))
                    //console.log("name:",res.data.res[i].StockName)
                    //console.log("quantity:",res.data.res[i].StockAmount)
                    //console.log("price:",res.data.res[i].BoughtTotalPrice)
                }
            })
            //*name股票名 price当前价格 quantity持有股票数
            //setTimeout(function(){}.bind(this),500)
            console.log("portfolio:", portfolio)
            //return portfolio*/

            return this.$store.getters.portfolio;
            /*[
                {
                    "name": "Apple",
                    "quantity": 5,
                    "price": 75
                },
                {
                    "name": "Twitter",
                    "quantity": 5,
                    "price": 75
                }
            ]*/
        }
    },
    data:function () {
        return {
            //id:this.$store.state.id,    //*用户标识
            id:this.$store.getters.id,    //*用户标识
        }
    },
    /*mounted: function () {
        this.portfolio();
    },
    methods: {
        portfolio() {
            //console.log(this.$store.getters.portfolio)
            let portfolio = [{"name": "Apple","quantity": 5,"price": 75}, {"name": "Twitter","quantity": 5,"price": 75}]
            //TODO  获取用户持仓
            let headers = {'content-type': 'application/x-www-form-urlencoded; charset = UTF-8'}
            let data = {'id':this.$store.getters.id}
            this.axios.post('http://127.0.0.1:8000/post/holdings',qs.stringify(data), {headers: headers}).then((res)=>{
                console.log('res=>',res)
                //console.log("length:",res.data.res.length)
                for(let i=0; i<res.data.res.length; i++){
                    let folio={"name":res.data.res[i].StockName, "quantity":res.data.res[i].StockAmount,"price":res.data.res[i].BoughtTotalPrice}
                    portfolio.push(folio)
                    
                    //console.log("name:",res.data.res[i].StockName)
                    //console.log("quantity:",res.data.res[i].StockAmount)
                    //console.log("price:",res.data.res[i].BoughtTotalPrice)
                }
            })
            //*name股票名 price当前价格 quantity持有股票数
            //setTimeout(function(){}.bind(this),500)
            console.log("portfolio:",portfolio)
            return portfolio
            //return this.$store.getters.portfolio;
        }
    }*/
}
</script>