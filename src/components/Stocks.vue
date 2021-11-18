<template>
<div>
    <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
    >
        <!--h1>Stocks</h1-->
    <v-card>
        <v-card-actions>
            <v-flex xs3>
                <!--下拉菜单选择器-->
                <el-select v-model="value" filterable placeholder="Please choose a stock" @change="getData">
                    <el-option
                        v-for="stock in stocks"
                        :key="stock.name"
                        :label="stock.name"
                        :value="stock.name">
                    </el-option>
                </el-select>
            </v-flex>
            <v-flex xs2>
                <v-card-text class="headline font-weight-bold">持有: {{holdmoney | dollarFormat}}</v-card-text>
            </v-flex>
            <v-flex xs2>
                <v-card-text class="headline font-weight-bold">持有 {{holdshare}} 股</v-card-text>
            </v-flex>
            <v-flex xs2>
                <v-card-text class="headline font-weight-bold">股价: {{stockprice | dollarFormat}}</v-card-text>
            </v-flex>
        </v-card-actions>



        <!--v-layout row wrap>
            <app-stock v-for="(stock,index) in stocks" :stock="stock" :key="index"></app-stock>
        </v-layout-->

        <Layout title="技术指标">
            <div id="technical-indicator-k-line" class="k-line-chart"/>
            <div
                class="k-line-chart-menu-container">
                <span style="padding-right: 10px">主图指标</span>
                <button
                    v-for="type in mainTechnicalIndicatorTypes"
                    :key="type"
                    v-on:click="setCandleTechnicalIndicator(type)">
                    {{type}}
                </button>
                <button
                    v-on:click="setCandleTechnicalIndicator('EMOJI')">
                    自定义
                </button>
                <span style="padding-right: 10px;padding-left: 12px">副图指标</span>
                <button
                    v-for="type in subTechnicalIndicatorTypes"
                    :key="type"
                    v-on:click="setSubTechnicalIndicator(type)">
                    {{type}}
                </button>
                <button
                    v-on:click="setSubTechnicalIndicator('EMOJI')">
                    自定义
                </button>
                </div>
        </Layout>

        <v-card-actions>
            <v-flex xs2>
                <v-text-field
                name="input-1-3"
                label="Quantity"
                single-line
                v-model="buy_quantity"
                type="number"
                ></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-btn @click="buy">Buy</v-btn>
            </v-flex>
            <v-flex xs2>
                <v-text-field
                name="input-1-3"
                label="Quantity"
                single-line
                v-model="sell_quantity"
                type="number"
                ></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-btn @click="sell">Sell</v-btn>
            </v-flex>
        </v-card-actions>
    </v-card>

    </v-container>
</div>
</template>

<script>
import Stock from "./Stock.vue";
import store from "../store/store.js"
import {dispose, init} from 'klinecharts'
import generatedKLineDataList from '../generatedKLineDataList'
import Layout from "@/Layout"

    const fruits = [
        '🍏', '🍎', '🍐', '🍊', '🍋', '🍌',
        '🍉', '🍇', '🍓', '🍈', '🍒', '🍑',
        '🍍', '🥥', '🥝', '🥭', '🥑', '🍏'
    ]

  // 自定义指标
    const emojiTechnicalIndicator = {
        name: 'EMOJI',
        plots: [
            { key: 'emoji' }
        ],
        calcTechnicalIndicator: (kLineDataList) => {
            const result = []
            kLineDataList.forEach(kLineData => {
                result.push({ emoji: kLineData.close, text: fruits[Math.floor(Math.random() * 17)] })
            })
            return result
        },
        render: ({ ctx, dataSource, viewport, xAxis, yAxis }) => {
            ctx.font = `${viewport.barSpace}px Helvetica Neue`
            ctx.textAlign = 'center'
            for (let i = dataSource.from; i < dataSource.to; i++) {
                const data = dataSource.technicalIndicatorDataList[i]
                const x = xAxis.convertToPixel(i)
                const y = yAxis.convertToPixel(data.emoji)
                ctx.fillText(data.text, x, y)
            }
        }
    }

export default {
    name: 'TechnicalIndicatorKLineChart',
    components: {
        //"app-stock": Stock,
        Layout
    },
    computed: {
        stocks() {
            return this.$store.getters.stocks;
        }
    },
    data:function () {
        return {
            //id:this.$store.state.id,    //*用户标识
            id:this.$store.getters.id,    //*用户标识
            holdmoney: 0,    //单支股票持有总金额
            holdshare: 0,   //每支股票持有股数
            stockprice: 0,   //每支股票股价
            stockvalue: "", //股票名
            buy_quantity: null,
            sell_quantity: null,
            value: null,
            mainTechnicalIndicatorTypes: ['MA', 'EMA', 'SAR'],
            subTechnicalIndicatorTypes: ['VOL', 'MACD', 'KDJ']
        }
    },
    mounted: function () {
        this.kLineChart = init('technical-indicator-k-line')
        this.kLineChart.addTechnicalIndicatorTemplate(emojiTechnicalIndicator)
        this.paneId = this.kLineChart.createTechnicalIndicator('VOL', false)
        /*this.kLineChart.applyNewData(generatedKLineDataList())*/  //TODO  改变股票数据来源
        //console.log(generatedKLineDataList())
    },
    methods: {
        getData(value){ //*选中值发生变化时触发,回调参数为目前的选中值
            this.stockvalue=value
            //console.log(this.stockvalue)
            //*获取股票数据
            let data = {'id':value}
            /*接口请求*/
            this.axios.post('/api/post/inquiry',data).then((res)=>{
                console.log('res=>',res)
                this.share=res.share
                //this.kLineChart.applyNewData(res.data)
            })
            
            this.kLineChart.applyNewData(generatedKLineDataList())
            /*this.kLineChart.applyNewData([
                {
                    "open": 4970.997992858794,
                    "low": 4966.937814466397,
                    "high": 4970.997992858794,
                    "close": 4970.480678335647,
                    "volume": 25.6146840653709,
                    "timestamp": 1635288360000,
                    "turnover": 127301.23031796007
                },
                {
                    "open": 4975.863149221486,
                    "low": 4975.863149221486,
                    "high": 4982.297215667147,
                    "close": 4977.17610249221,
                    "volume": 17.61107937689912,
                    "timestamp": 1635288420000,
                    "turnover": 87664.42923431675
                }
            ])*/
            /*接口请求*/
            this.axios.post('/api/post/stock_data',data).then((res)=>{
                console.log('res=>',res)
                this.holdmoney=res.holdmoney    //*单支股票持有总金额
                this.holdshare=res.holdshare    //*每支股票持有股数
                this.stockprice=res.stockprice  //*每支股票股价
            })
        },
        buy() {
            if(this.buy_quantity==null || this.buy_quantity <= 0){
                //console.log(this.$store.getters.id)
                alert("请输入正确的买入数量")
            }
            else {
                //TODO
                //console.log("buy")
                let data = {'id':this.id,'stockvalue':this.stockvalue,'buy_quantity':this.buy_quantity}
                //*用户ID、股票名、买入数量
                /*接口请求*/
                this.axios.post('/api/post/buy',data).then((res)=>{
                    //console.log(res)
                    if(res.data == -1){
                        alert("金额不足，买入失败")
                    }else{
                        this.$store.commit('buy',{ stockprice: this.stockprice, quantity: parseInt(this.quantity,10) });
                        alert("买入成功")
                    }
                })
            }
        },
        sell() {
            if (this.sell_quantity==null || this.sell_quantity <= 0){
                alert("请输入正确的卖出数量")
            }
            else {
                //TODO
                //console.log("sell")
                let data = {'id':this.id,'stockvalue':this.stockvalue,'sell_quantity':this.sell_quantity}
                /*接口请求*/
                this.axios.post('/api/post/sell',data).then((res)=>{
                    //console.log(res)
                    /*接口的传值是(-1,该用户不存在),(0,密码错误)*/
                    if(res.data == -1){
                        alert("持有股票不足，卖出失败")
                    }else{
                        this.$store.commit('sell',{ stockprice: this.stockprice, quantity: parseInt(this.quantity,10) });
                        alert("卖出成功")
                    }
                })
            }
        },
        setCandleTechnicalIndicator: function (type) {
            this.kLineChart.createTechnicalIndicator(type, false, { id: 'candle_pane' })
        },
        setSubTechnicalIndicator: function (type) {
            this.kLineChart.createTechnicalIndicator(type, false, { id: this.paneId })
        },
    },
    destroyed: function () {
        dispose('technical-indicator-k-line')
    }
}
</script>

<style>
    body {
        margin: 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #F2F3F5;
    }

    div, p {
        box-sizing: border-box;
    }

    p {
        margin: 0;
    }

    .app {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        padding: 15px;
    }
    .k-line-chart-container {
        display: flex;
        flex-direction: column;
        margin: 15px;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
        background-color: #FFFFFF;
        width: 620px;
        height: 440px;
        padding: 16px 6px 16px 16px;
    }

    .k-line-chart-title {
        margin: 0;
        color: #252525;
        padding-bottom: 10px;
    }

    .k-line-chart {
        display: flex;
        flex: 1;
    }
    .k-line-chart-menu-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        font-size: 12px;
        color: #606060;
    }
    .k-line-chart-menu-container button {
        cursor: pointer;
        background-color: #2196F3;
        border-radius: 2px;
        margin-right: 8px;
        height: 24px;
        line-height: 26px;
        padding: 0 6px;
        font-size: 12px;
        color: #fff;
        border: none;
        outline: none;
    }
</style>