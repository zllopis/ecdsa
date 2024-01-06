const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
//const signature = secp.secp256k1.sign("", privateKey);
const publicKey = secp.secp256k1.getPublicKey(privateKey);

secp.secp256k1.verify;

//console.log(signature, "signature");
console.log(toHex(privateKey), "privateKey");
console.log(toHex(publicKey), "publicKey");
