# Solidity Smart Contract Transaction Data

## Installation

### Node.js

```bash
npm install pchainjs-txdata
```

* Include `txdata.js` in your html file. (not required for the meteor package)

## Usage

Use the `TxData` object directly from the global namespace:

```js
var TxData = require("txdata");
var ABI = [
{
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      } 
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

var funName = "transfer";

var toAddr = "0xD6fcD18d4a09CE1aF030E450C8a244D847584188";
var toValue = 1*Math.pow(10,18);

var params = [toAddr,toValue];

var data  = TxData(ABI,funName,params);

```

## Contribute!

### Requirements

* Node.js
* npm


## License

[LGPL-3.0+](LICENSE.md) © 2018 Contributors
