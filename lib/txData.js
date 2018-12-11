var SolidityFunction = require('./function');
var _ = require('lodash');

module.exports = function (abi,funName,paramArr) {
	var funJson = _.find(abi, { name: funName });
    var solidityFunction = new SolidityFunction(funJson);

    var payloadData = solidityFunction.toPayload(paramArr).data;
    return payloadData;
}