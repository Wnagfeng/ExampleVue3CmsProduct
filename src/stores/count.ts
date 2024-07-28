import { defineStore } from 'pinia'
import { GetGoodsAmountList, GetGoodsCategoryCount, GetGoodsAddressSaleCount, GetGoodsCategorySaleCount, GetGoodsCategoryFavorCount } from '@/service/count/index'
import type { ICount, ICategoryCount, IAddressSale, ICategorySale, Ifavorcount } from '@/types/count.type'
interface Istate {
    count: ICount[]
    categoryCount: ICategoryCount[],
    addressSale: IAddressSale[],
    CategorySale: ICategorySale[],
    FavorCount: Ifavorcount[]
}

export const useCountStore = defineStore('count', {
    state: (): Istate => ({
        count: [],
        categoryCount: [],
        addressSale: [],
        CategorySale: [],
        FavorCount: []
    }),
    actions: {
        async FetchgetGoodsAmountList() {
            const res = await GetGoodsAmountList()
            this.count = res.data
        },
        async FetchGetGoodsCategoryCount() {
            const res = await GetGoodsCategoryCount()
            this.categoryCount = res.data
        },
        async FetchGetGoodsAddressSaleCount() {
            const res = await GetGoodsAddressSaleCount()
            this.addressSale = res.data
        },
        async FetchGetCategorySale() {
            const res = await GetGoodsCategorySaleCount()
            this.CategorySale = res.data
        },
        async FetchFavorCount() {
            const res = await GetGoodsCategoryFavorCount()
            this.FavorCount = res.data
        }
    }
})
