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
    console.log(req.body.imageUrl.hashtags);
    image.img.data = req.body.imageUrl.imagePreviewUrl;
    image.img.contents = req.body.imageUrl.contents;
    image.img.writer = req.body.imageUrl.writer;
    image.img.hashtags = req.body.imageUrl.hashtags;
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

// select images by ID
router.get('/:writer', function (req, res) {
    _image2.default.find({ "img.writer": req.params.writer }).sort({ "_id": -1 }).limit(6).exec(function (err, images) {
        if (err) throw err;

        images.map(function (image, i) {
            image.img.convert = image.img.data.toString('utf8');
        });

        res.json(images);
    });
});

// select images by ID
router.get('/hashtags/:hashtags', function (req, res) {
    _image2.default.find({ "img.hashtags": req.params.hashtags }).sort({ "_id": -1 }).limit(6).exec(function (err, images) {
        if (err) throw err;

        images.map(function (image, i) {
            image.img.convert = image.img.data.toString('utf8');
        });

        res.json(images);
    });
});

// DELETE IMAGE
router.delete('/delete/:id', function (req, res) {

    // CEHCK MEMO ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }
    /*
    // CHECK LOGIN STATUS
    if (typeof req.body.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    } */

    _image2.default.findById(req.params.id, function (err, image) {
        if (err) throw err;

        if (!image) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }
        /*
        if (image.writer != req.body.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSIOn FAILURE",
                code: 4
            });
        } */

        _image2.default.remove({ _id: req.params.id }, function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

exports.default = router;