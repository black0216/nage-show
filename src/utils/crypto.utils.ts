import CryptoJS from 'crypto-js';

export class CryptoUtils {
  private static ENCRYPT_FIX_KEY = CryptoJS.enc.Utf8.parse('abcdefghijkrstuv024680wxyzlmnopq');
  private static ENCRYPT_FIX_IV = CryptoJS.lib.WordArray.create([0x00000000, 0x00000000, 0x00000000, 0x00000000]);


  public static AesDecrypt(data: string): string {
    const decrypted = CryptoJS.AES.decrypt(data, this.ENCRYPT_FIX_KEY, {
      iv: this.ENCRYPT_FIX_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
