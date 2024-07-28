<template>
    <div class="echartsContainer" ref="chartContainer"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaJSON from './Data/data.json'
const chartContainer = ref()
interface Iprops {
    opstion: EChartsOption
}
const props = defineProps<Iprops>()
echarts.registerMap('china', ChinaJSON as any)
onMounted(() => {
    const chartdom = chartContainer.value
    const mychart = echarts.init(chartdom)
    watchEffect(() => {
        mychart.setOption(props.opstion)
    })
    window.addEventListener('resize', function () {
        mychart.resize()
    })
})
</script>
<style scoped lang="less">
.echartsContainer {
    height: 300px;
}
</style>