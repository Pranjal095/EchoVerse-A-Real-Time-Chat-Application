import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : "DEFAULT";

export const encryptText=(plainText)=>{
    let cipherText = CryptoJS.AES.encrypt(plainText,secretKey).toString()
    //replace / with _ to prevent route modification
    cipherText = cipherText.replace(/\//g,'_'); 
    return cipherText
}

export const decryptText=(cipherText)=>{
    //replace _ back to / while decrypting
    cipherText = cipherText.replace(/_/g,'/');
    const bytes = CryptoJS.AES.decrypt(cipherText,secretKey)
    const plainText = bytes.toString(CryptoJS.enc.Utf8)
    return plainText
}