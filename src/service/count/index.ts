import wfrequest from '../index'
import type { GetGoodsAmountListResponse, GetGoodsCategoryCountResponse, GetGoodsAddressSaleCount, GetGoodsCategorySaleCount, GetGoodsCategoryFavorCount } from '@/types/count.type'
export function GetGoodsAmountList() {
    return wfrequest.get<GetGoodsAmountListResponse>({
        url: '/goods/amount/list',
    })
}
export function GetGoodsCategoryCount() {
    return wfrequest.get<GetGoodsCategoryCountResponse>({
        url: '/goods/category/count',
    })
}
export function GetGoodsAddressSaleCount() {
    return wfrequest.get<GetGoodsAddressSaleCount>({
        url: '/goods/address/sale',
    })
}
export function GetGoodsCategorySaleCount() {
    return wfrequest.get<GetGoodsCategorySaleCount>({
        url: "/goods/category/sale"
    })
}
export function GetGoodsCategoryFavorCount() {
    return wfrequest.get<GetGoodsCategoryFavorCount>({
        url: "/goods/category/favor"
    })
}