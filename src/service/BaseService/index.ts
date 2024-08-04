import wfrequest from "../index";
// 定义通用的返回数据类型接口
export interface UnifiedResponse<T> {
    code: number;
    totalCount: number;
    message: string;
    data: T[];
}
export function GetList<T>(url: string): Promise<UnifiedResponse<T>> {
    return wfrequest.post<UnifiedResponse<T>>({
        url
    });
}