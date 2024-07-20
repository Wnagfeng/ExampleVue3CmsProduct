declare module 'jsencrypt' {
    export default class JSEncrypt {
        constructor(options?: any);
        setPublicKey(pubKey: string): void;
        setPrivateKey(privKey: string): void;
        encrypt(msg: string): string | false;
        decrypt(msg: string): string | false;
    }
}
