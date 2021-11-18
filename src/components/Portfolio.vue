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

export default {
    components: {
        "app-investment": Investment
    },
    computed: {
        portfolio() {
            //console.log(this.$store.getters.portfolio)
            //return this.$store.getters.portfolio;
            //TODO  获取用户持仓
            let data = {'id':value}
            this.axios.post('/api/post/position',data).then((res)=>{
                console.log('res=>',res)
                return res
                //*name股票名 price当前价格 quantity持有股票数
            })
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
}
</script>