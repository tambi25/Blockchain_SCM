// const { Blockchain, Transaction} = require("./blockchain");
const EC=require('elliptic').ec;// install ellpitic library-->for key generation
const ec=new EC('secp256k1');

//const myKey=ec.keyFromPrivate('7bb0b5fdbd2ffb1bb7990256942e9fbe7001949df2148a3b7d1afd909184cdab');
const mywalletAddress=myKey.getPublic('hex');
const pvt = myKey.getPrivate('hex');
console.log(mywalletAddress)
console.log(pvt)
// //dummy
// const myKeyDummy= ec.keyFromPrivate('2abc92d70279dde7599ec7010f13580cdbad92d9ad754ac782cd453834e47ad6');
// const mywalletAddressDummy=myKey.getPublic('hex');

let pjt=new Blockchain();

console.log('Balance is:',pjt.getBalanceofAddress(mywalletAddress));                //Inital balance

const tx1=new Transaction(mywalletAddress,'to someone else public key goes herMr X',30);
tx1.signTransaction(myKey);
pjt.addTransaction(tx1);

console.log('\nStarting the miner....');
pjt.minePendingTransactions(mywalletAddress);
console.log('Balance is:',pjt.getBalanceofAddress(mywalletAddress));

console.log("\n \n \n")

pjt.chain[1].transactions[1].amount = 1000;
console.log(pjt.isValidChain())

pjt.printBlockchain(); 