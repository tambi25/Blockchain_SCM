const prompt = require('prompt-sync')();
let manufacturerInstance = null;
const depositAmt = 1000;

class Manufacturer {
    constructor(key) {
        if (!manufacturerInstance) {
            this.key = key;
            manufacturerInstance = this;
        } else {
            console.log("There can be only one Manufacturer");
        }
        return manufacturerInstance;
    }
}

class Distributor {
    constructor(key, deposit) {
        this.key = key;
        this.deposit = deposit;
    }
}

class Client {
    constructor(key, deposit) {
        this.key = key;
        this.deposit = deposit;
    }
}

class ThirdParty {
    constructor() {
      this.userBalances = {}; // to store user balances
    }
  
    receiveDeposit(userKey, amount) {             
      this.userBalances[userKey] = (this.userBalances[userKey] || 0) + amount;
    }
  
    getUserBalance(userKey) {        // Not necessary. If we want to view the security deposit for any user (using public key), then we can keep it
      return this.userBalances[userKey] || 0;
    }
    deduct(key,ammount){
        this.userBalances[key]-=ammount
        console.log(""+ammount+" is deducted.")
    }
}

class Users {
    static Manufacturers = [];
    static Distributors = [];
    static Clients = [];
    static thirdParty = new ThirdParty();

    static addManufacturer(key) {
        this.Manufacturers.push(new Manufacturer(key));
    }

    static addDistributor(key, deposit) {
        this.Distributors.push(new Distributor(key, deposit));
        this.thirdParty.receiveDeposit(key, deposit); // Deposit transfer to the third-party
    }

    static addClient(key, deposit) {
        this.Clients.push(new Client(key, deposit));
        this.thirdParty.receiveDeposit(key, deposit); // Deposit transfer to the third-party
    }
    //deduct ammount
    
}

function checkDeposit(deposit) {
    if (deposit < depositAmt) {
        throw new Error("Deposit should be more than "+depositAmt);
    }
}

//to check if we are creating a duplicate user
function checkDupKey(pubKey) {
    Users.Manufacturers.forEach(function(Manufacturer) {
        if (pubKey === Manufacturer.key) {
            throw new Error("Key already exists! Duplicate key entered.");
        }
    });
    Users.Distributors.forEach(function(Distributor) {
        if (pubKey === Distributor.key) {
            throw new Error("Key already exists! Duplicate key entered.");
        }
    });
    Users.Clients.forEach(function(Client) {
        if (pubKey === Client.key) {
            throw new Error("Key already exists! Duplicate key entered.");
        }
    });
}

function register() {
    const type = prompt("Enter type: ");
    // key is the public key 
    const key = prompt("Enter key: ");
    checkDupKey(key)
    switch (type) {
        case 'M':
            Users.addManufacturer(key);
            break;
        case 'D':
            const distributorDeposit = prompt("Enter deposit: ");
            checkDeposit(distributorDeposit);
            console.log("\nDeposit tranfered to trusted third party.\n")
            Users.addDistributor(key, distributorDeposit);
            break;
        case 'C':
            const clientDeposit = prompt("Enter deposit: ");
            checkDeposit(clientDeposit);
            console.log("\nDeposit tranfered to trusted third party.\n")
            Users.addClient(key, clientDeposit);
            break;
        default:
            console.log("Unrecognized user type");
    }
}

while(1){
    // const choice  = prompt("Enter choice");
    register();
    quit  = prompt("press E to exit registration, Press A to add another user: ");
    if(quit=='E')   break;
}

module.exports.Users = Users
module.exports.ThirdParty = ThirdParty