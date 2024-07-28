<template>
    <Baseechartspage :opstion="basicpoption"></Baseechartspage>
</template>
<script setup lang="ts">
import Baseechartspage from '@/components/BaseEchartsTemplate.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
interface Iprops {
    value: number[]
    name: string[]
}
const props = defineProps<Iprops>()
const basicpoption = computed<EChartsOption>(() => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: props.name
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '分类销量统计',
                data: props.value,
                type: 'line',
                areaStyle: {}
            }
        ]
    }
})
</script>
<style scoped lang="less"></style>