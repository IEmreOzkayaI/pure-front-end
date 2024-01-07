import CryptoJS from "crypto-js";

function encryptAndStore(key, value) {
    // Parametreleri şifrele
    const encryptedKey = CryptoJS.SHA256(key).toString();
    const encryptedValue = CryptoJS.AES.encrypt(value, import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY).toString();

    // Şifrelenmiş parametreleri localStorage'a kaydet
    localStorage.setItem(encryptedKey, encryptedValue);
}

function decryptAndRetrieve(key) {
    // Parametreyi şifrele
    const encryptedKey = CryptoJS.SHA256(key).toString();

    // Şifrelenmiş parametreyi localStorage'dan al
    const encryptedValue = localStorage.getItem(encryptedKey);
    if (encryptedValue === null) {
        return null;
    }

    // Şifrelenmiş veriyi çöz
    const bytes = CryptoJS.AES.decrypt(encryptedValue, import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedValue;
}

export {encryptAndStore, decryptAndRetrieve};
