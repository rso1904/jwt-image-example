'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authMiddleware = function authMiddleware(req, res, next) {
    // read the token from header or url 
    var token = req.headers['x-access-token'] || req.query.token;

    // token does not exist
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        });
    }

    // create a promise that decodes the token
    var p = new Promise(function (resolve, reject) {
        _jsonwebtoken2.default.verify(token, req.app.get('jwt-secret'), function (err, decoded) {
            if (err) reject(err);
            resolve(decoded);
        });
    });

    // if it has failed to verify, it will return an error message
    var onError = function onError(error) {
        res.status(403).json({
            success: false,
            message: error.message
        });
    };

    // process the promise
    p.then(function (decoded) {
        req.decoded = decoded;
        next();
    }).catch(onError);
};

module.exports = authMiddleware;