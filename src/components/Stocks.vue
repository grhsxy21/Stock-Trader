<template>
<div>
    <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
    >
        <h1>Stocks</h1>
        <!--下拉菜单选择器-->
        <el-select v-model="value" filterable placeholder="Please choose a stock" @change="getData">
            <el-option
                v-for="stock in stocks"
                :key="stock.name"
                :label="stock.name"
                :value="stock.name">
            </el-option>
        </el-select>

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
    </v-container>
</div>
</template>

<script>
import Stock from "./Stock.vue";
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
        value: null,
        mainTechnicalIndicatorTypes: ['MA', 'EMA', 'SAR'],
        subTechnicalIndicatorTypes: ['VOL', 'MACD', 'KDJ']
        }
    },
    mounted: function () {
        this.kLineChart = init('technical-indicator-k-line')
        this.kLineChart.addTechnicalIndicatorTemplate(emojiTechnicalIndicator)
        this.paneId = this.kLineChart.createTechnicalIndicator('VOL', false)
        this.kLineChart.applyNewData(generatedKLineDataList())  //TODO  改变股票数据来源
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
        //console.log(generatedKLineDataList())
    },
    methods: {
        getData(value){
            //console.log(value)
            //TODO  获取股票数据
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