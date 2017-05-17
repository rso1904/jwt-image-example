'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
});

// generates hash
Account.methods.generateHash = function (password) {
    //return bcrypt.hashSync(password, 8);
    return _crypto2.default.createHmac('sha1', _config2.default.secret).update(password).digest('base64');
};

// compares the password
Account.methods.validateHash = function (password) {
    //return bcrypt.compareSync(password, this.password);
    var encrypted = _crypto2.default.createHmac('sha1', _config2.default.secret).update(password).digest('base64');

    return this.password === encrypted;
};

exports.default = _mongoose2.default.model('account', Account);