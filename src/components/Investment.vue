<template>
  <v-flex xs6>
   <v-card color="blue-grey" class="lighten-5">
      <v-card-title primary-title>
         <div class="headline">{{investment.name}}</div>&nbsp;&nbsp;
         <div>(Price: {{investment.price}} | Quantity: {{ investment.quantity }})</div>
      </v-card-title>
      <v-card-actions>
      <v-flex xs6>
         <v-text-field
         name="input-1-3"
         label="Quantity"
         single-line
         v-model="quantity"
         type="number"
         ></v-text-field>
      </v-flex>
      <v-flex xs6>
      <v-btn @click="sell">Sell</v-btn>
      </v-flex>
      </v-card-actions>
   </v-card>
   </v-flex>
</template>

<script>
import qs from 'qs'

export default {
  props: ["investment"],
  data() {
     return {
        quantity: null
     }
  },
  methods: {
   sell() {
      if (this.quantity==null || this.quantity <= 0){
            alert("请输入正确的卖出数量")
      }
      else {
            //TODO   传递用户id
            //console.log("sell")
            let headers = {'content-type': 'application/x-www-form-urlencoded; charset = UTF-8'}
            let data = {'id':this.$store.getters.id,'stockvalue':this.investment.name,'sell_quantity':this.quantity}
            /*接口请求*/
            this.axios.post('http://127.0.0.1:8000/post/sell',qs.stringify(data), {headers: headers}).then((res)=>{
               //console.log(res)
               /*接口的传值是(-1,该用户不存在),(0,密码错误)*/
               if(res.data.data == -1){
                  alert("持有股票不足，卖出失败")
               }else{
                  this.$store.commit('sell',{ stockprice: this.stockprice, quantity: this.quantity});
                  alert("卖出成功")
               }
            })
      }
      /*if (this.quantity && this.quantity > 0) {
         this.$store.commit('sell',{ stock: this.investment.stock, quantity: parseInt(this.quantity,10) });
      }*/
   }
  }
}
</script>

