var TxData = require("./lib/txData");

// dont override global variable
if (typeof window !== 'undefined' && typeof window.TxData === 'undefined') {
    window.TxData = TxData;
}


module.exports = TxData;
