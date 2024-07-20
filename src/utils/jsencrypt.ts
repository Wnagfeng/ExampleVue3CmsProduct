import JSEncrypt from "jsencrypt"
import { PRIVATE_KEY, PUBLIC_KEY } from "@/global/constants"

// 加密
export function encrypt(txt: any) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(PUBLIC_KEY) // 设置公钥
    return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt: any) {
    const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(PRIVATE_KEY) // 设置私钥
    return encryptor.decrypt(txt) // 对数据进行解密
}

