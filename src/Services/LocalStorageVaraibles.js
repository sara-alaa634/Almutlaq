import CryptoJS from "crypto-js";

const Key = "dt";
const PREFIX = process.env.REACT_APP_API_USER_PREFIX;

export const setID = (id) => {
    const prefix = PREFIX + id; // Add a prefix
    const encryptedUserId = CryptoJS.AES.encrypt(
      prefix,
      process.env.REACT_APP_API_USER_ID
    ).toString();
    localStorage.setItem(Key, encryptedUserId);
  };
  
  export const getID = () => {
    const encryptedUserId = localStorage.getItem(Key);
    if (!encryptedUserId) {
      return null;
    }
    const bytes = CryptoJS.AES.decrypt(
      encryptedUserId,
      process.env.REACT_APP_API_USER_ID
    );
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  
    const prefixLength = PREFIX.length;
    const id = decryptedValue.substring(prefixLength);
    return id;
  };
  
  export const removeID = () => {
    localStorage.removeItem(Key);
  };
  
 