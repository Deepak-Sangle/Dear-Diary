const crypto = require('crypto');

const NUM_BYTES = 32;
const algorithm = "aes-256-cbc"; 

function encryptData(message, initVector, key) {
  const cipher = crypto.createCipheriv(algorithm, key, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

function decryptData(encryptedData, initVector, key){
  const decipher = crypto.createDecipheriv(algorithm, key, initVector);
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
}

function getMasterInitVector(){
  const ivHex = process.env.MASTER_INIT_VECTOR;
  const initVector = Buffer.from(ivHex, 'hex');
  return initVector;
}

function getMasterSecretKey(){
  const secretHex = process.env.MASTER_SECRET_KEY;
  const secretKey = Buffer.from(secretHex, 'hex');
  return secretKey;
}

module.exports = {
  encryptData,
  decryptData,
  getMasterSecretKey,
  getMasterInitVector,
  NUM_BYTES
}