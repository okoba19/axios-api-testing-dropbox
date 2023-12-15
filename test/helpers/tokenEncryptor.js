const CryptoJS = require('crypto-js');

class TokenEncryptor {
    constructor(passphrase) {
        this.passphrase = passphrase;
    }

    encrypt(text) {
        const ciphertext = CryptoJS.AES.encrypt(text, this.passphrase);
        return ciphertext.toString();
    }

    decrypt(ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.passphrase);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}

module.exports = TokenEncryptor;