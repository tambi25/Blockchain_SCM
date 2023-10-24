const util = require('util');
const EC=require('elliptic').ec;// install ellpitic library-->for key generation
const ec=new EC('secp256k1');

const key=ec.genKeyPair()
const publicKey=key.getPublic('hex');
const privateKey=key.getPrivate('hex');

// console.log(key)
console.log('Private key:',privateKey);
console.log('Public key:',publicKey);