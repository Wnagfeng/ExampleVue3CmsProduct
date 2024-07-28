
export interface ICount {
    amount: string
    title: string
    tips: string
    subtitle: string
    number1: number
    number2: number
}


export interface ICategoryCount {
    id: number
    name: string
    goodsCount: number
}

export interface IAddressSale {
    address: string
    count: number
}


export interface ICategorySale {
    id: number
    name: string
    goodsCount?: number
}

export interface Ifavorcount {
    id: number
    name: string
    goodsFavor?: number
}





// 接口返回值类型
export interface GetGoodsAmountListResponse {
    code: number
    message: string
    data: ICount[]
}
export interface GetGoodsCategoryCountResponse {
    code: number
    message: string
    data: ICategoryCount[]
}
export interface GetGoodsAddressSaleCount {
    code: number
    message: string
    data: IAddressSale[]
}

export interface GetGoodsCategorySaleCount {
    code: number
    message: string
    data: ICategorySale[]
}

export interface GetGoodsCategoryFavorCount {
    code: number
    message: string
    data: Ifavorcount[]
}