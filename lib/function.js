/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file function.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

var coder = require('./solidity/coder');
var utils = require('./utils/utils');
var errors = require('./errors');
var sha3 = require('./utils/sha3');

/**
 * This prototype should be used to call/sendTransaction to solidity functions
 */
var SolidityFunction = function (json) {

    this._inputTypes = json.inputs.map(function (i) {
        return i.type;
    });
    this._outputTypes = json.outputs.map(function (i) {
        return i.type;
    });
    this._constant = (json.stateMutability === "view" || json.stateMutability === "pure" || json.constant);
    this._payable = (json.stateMutability === "payable" || json.payable);
    this._name = utils.transformToFullName(json);
};

/**
 * Should be called to check if the number of arguments is correct
 *
 * @method validateArgs
 * @param {Array} arguments
 * @throws {Error} if it is not
 */
SolidityFunction.prototype.validateArgs = function (args) {
    var inputArgs = args.filter(function (a) {
      // filter the options object but not arguments that are arrays
      return !( (utils.isObject(a) === true) &&
                (utils.isArray(a) === false) &&
                (utils.isBigNumber(a) === false)
              );
    });
    if (inputArgs.length !== this._inputTypes.length) {
        throw errors.InvalidNumberOfSolidityArgs(this._name);
    }
};

/**
 * Should be used to create payload from arguments
 *
 * @method toPayload
 * @param {Array} solidity function params
 * @param {Object} optional payload options
 */
SolidityFunction.prototype.toPayload = function (args) {
    var options = {};
    if (args.length > this._inputTypes.length && utils.isObject(args[args.length -1])) {
        options = args[args.length - 1];
    }
    this.validateArgs(args);
    options.to = this._address;
    options.data = '0x' + this.signature() + coder.encodeParams(this._inputTypes, args);
    return options;
};

/**
 * Should be used to get function signature
 *
 * @method signature
 * @return {String} function signature
 */
SolidityFunction.prototype.signature = function () {
    return sha3(this._name).slice(0, 8);
};

/**
 * Return the encoded data of the call
 *
 * @method getData
 * @return {String} the encoded data
 */
SolidityFunction.prototype.getData = function () {
    var args = Array.prototype.slice.call(arguments);
    var payload = this.toPayload(args);

    return payload.data;
};


module.exports = SolidityFunction;
