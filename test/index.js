var TxData = require("../index.js");

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
var toValue = 6.3*Math.pow(10,22);

var params = [toAddr,toValue];

var data  = TxData(ABI,funName,params);

console.log(data);