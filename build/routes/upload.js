'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _image = require('../models/image');

var _image2 = _interopRequireDefault(_image);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multiparty = require('multiparty');

var _multiparty2 = _interopRequireDefault(_multiparty);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
    var image = new _image2.default();

    image.img.data = req.body.imageUrl.imagePreviewUrl;
    image.img.contents = req.body.imageUrl.contents;
    image.save(function (err, image) {
        if (err) throw err;
        console.error('saved img to mongo');
        return res.json({ success: true });
    });
});

router.get('/', function (req, res) {
    _image2.default.find().exec(function (err, images) {
        if (err) throw err;
        images.map(function (image, i) {
            image.img.convert = image.img.data.toString('utf8');
        });

        return res.json(images);
    });
});

exports.default = router;