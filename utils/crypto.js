const cryptoJs = require('crypto-js')

const secretKey = cryptoJs.enc.Utf8.parse(process.env.SECRET_KEY)

const iv = cryptoJs.lib.WordArray.random(16).toString(cryptoJs.Utf8)
const ivBytes = cryptoJs.enc.Hex.parse(iv)

export const enc = (str) => {
  return {
    iv,
    password: cryptoJs.AES.encrypt(str, secretKey, {
      iv: ivBytes,
      mode: cryptoJs.mode.CBC,
    }).toString(),
  }
}
