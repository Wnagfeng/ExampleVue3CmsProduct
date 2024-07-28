<template>
    <div class="dashboardWrapper">
        <div class="header">
            <el-row :gutter="20">
                <template v-for="item in count">
                    <countCard v-bind="item"></countCard>
                </template>
            </el-row>
        </div>
    </div>
    <div class="middle">
        <el-row :gutter="20">
            <el-col :span="8">
                <echartsCard header="分类商品数量(饼图)">
                    <template #echart>
                        <!-- 图表的绘制地点 -->
                        <PiePage :pieData="piedata"></PiePage>
                    </template>
                </echartsCard>
            </el-col>
            <el-col :span="10">
                <echartsCard header="全国商品商品销量展示">
                    <template #echart>
                        <Mappage :Adddata="mapData"></Mappage>
                    </template>
                </echartsCard>
            </el-col>
            <el-col :span="6">
                <echartsCard header="分类商品数量(玫瑰图)">
                    <template #echart>
                        <Nightingalepage :opstion="piedata"></Nightingalepage>
                    </template>
                </echartsCard>
            </el-col>
        </el-row>
    </div>
    <div class="footer">
        <el-row :gutter="20">
            <el-col :span="12">
                <echartsCard header="分类商品的销量">
                    <template #echart>
                        <Basicpage :value="roseData.Ydata" :name="roseData.Xdata"></Basicpage>
                    </template>
                </echartsCard>
            </el-col>
            <el-col :span="12">
                <echartsCard header="分类商品的收藏">
                    <template #echart>
                        <Barpage :value="barData.Ydata" :name="barData.Xdata"></Barpage>
                    </template>
                </echartsCard>
            </el-col>
        </el-row>
    </div>

</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useCountStore } from '@/stores/count'
import countCard from './cpns/countCard.vue'
import echartsCard from './cpns/echarts-card.vue'
import PiePage from "./cpns/Echarts/Piepage.vue"
import Mappage from './cpns/Echarts/Mappage.vue'
import Nightingalepage from './cpns/Echarts/Nightingalepage.vue'
import Basicpage from './cpns/Echarts/Basicpage.vue'
import Barpage from './cpns/Echarts/Barpage.vue'
const countStore = useCountStore()
const { count, categoryCount, addressSale, CategorySale, FavorCount } = storeToRefs(countStore)
countStore.FetchgetGoodsAmountList()
countStore.FetchGetGoodsCategoryCount()
countStore.FetchGetGoodsAddressSaleCount()
countStore.FetchGetCategorySale()
countStore.FetchFavorCount()
const piedata = computed(() => {
    return categoryCount.value.map((item: any) => ({
        value: item.goodsCount,
        name: item.name
    }))
})
const mapData = computed(() => {
    return addressSale.value.map((item: any) => {
        return {
            name: item.address,
            value: item.count
        }
    })
})
const roseData = computed(() => {
    let Xdata: string[] = []
    let Ydata: number[] = []
    CategorySale.value.map((item: any) => {
        Xdata.push(item.name)
        Ydata.push(item.goodsCount)
    })
    return { Xdata, Ydata }
})
const barData = computed(() => {
    let Xdata: string[] = []
    let Ydata: number[] = []
    FavorCount.value.map((item: any) => {
        Xdata.push(item.name)
        Ydata.push(item.goodsFavor)
    })
    return { Xdata, Ydata }
})

</script>

<style scoped lang="less">
.header {
    min-height: 138px;
}

.middle,
.footer {
    min-height: 397.39px;
    margin-top: 20px;
}
</style>
