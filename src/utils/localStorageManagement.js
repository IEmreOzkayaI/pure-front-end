// import CryptoJS from "crypto-js";
//
// function encryptAndStore(key, value) {
//     // Parametreleri şifrele
//     const encryptedKey = CryptoJS.SHA256(key).toString();
//     const encryptedValue = CryptoJS.AES.encrypt(value, 'sss').toString();
//
//     // Şifrelenmiş parametreleri localStorage'a kaydet
//     localStorage.setItem(encryptedKey, encryptedValue);
//     console.log("Encrypted Key:", encryptedKey);
//     console.log("Encrypted Value:", encryptedValue);
// }
//
// function decryptAndRetrieve(key) {
//     // Parametreyi şifrele
//     const encryptedKey = CryptoJS.SHA256(key).toString();
//
//     // Şifrelenmiş parametreyi localStorage'dan al
//     const encryptedValue = localStorage.getItem(encryptedKey);
//     if (encryptedValue === null) {
//         return null;
//     }
//
//     // Şifrelenmiş veriyi çöz
//     const bytes = CryptoJS.AES.decrypt(encryptedValue, 'sss');
//     const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
//     console.log("Decrypted Key:", encryptedKey);
//     console.log("Decrypted Value:", decryptedValue);
//
//     return decryptedValue;
// }
//
// export { encryptAndStore, decryptAndRetrieve };
