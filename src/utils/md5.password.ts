import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';



const md5password = (password: string, salt: string): string => {
    const saltedPassword = password + salt; // 将盐添加到密码中
    const hash = (sha256 as any)(saltedPassword);
    return hash.toString(Base64 as any);
}

const verifyPassword = (inputPassword: string, salt: string, storedHashedPassword: string): boolean => {
    const inputHashedPassword = md5password(inputPassword, salt);
    return inputHashedPassword === storedHashedPassword;
}
// 解密方法
const decryptedPassword = (hashedPassword: string, salt: string): string => {
    const saltedPassword = Base64.parse(hashedPassword).toString(Base64) + salt; // 将盐添加到密码中
    const hash = (sha256 as any)(saltedPassword);
    return hash.toString(Base64 as any);
}

export { md5password, verifyPassword, decryptedPassword };
