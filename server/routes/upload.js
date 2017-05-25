import express from 'express';
import Image from '../models/image';
import mongoose from 'mongoose';
import multiparty from 'multiparty';
import fs from 'fs';

const router = express.Router();

router.post('/', (req, res) => {
    let image = new Image;
    console.log(req.body.imageUrl.hashtags);
    image.img.data = req.body.imageUrl.imagePreviewUrl;
    image.img.contents = req.body.imageUrl.contents;
    image.img.writer = req.body.imageUrl.writer;
    image.img.hashtags = req.body.imageUrl.hashtags;
    image.save((err, image) => {
        if (err) throw err;
        console.error('saved img to mongo');
        return res.json({ success: true });
    });
});

router.get('/', (req, res) => {
    Image.find().exec((err, images) => {
        if (err) throw err;
        images.map((image, i) => {
            image.img.convert = image.img.data.toString('utf8');
        });

        return res.json(images);
    });
});

// select images by ID
router.get('/:writer', (req, res) => {
    Image.find({ "img.writer" : req.params.writer })
        .sort({ "_id": -1 })
        .limit(6)
        .exec((err, images) => {
            if (err) throw err;
            
            images.map((image, i) => {
                image.img.convert = image.img.data.toString('utf8');
            });

            res.json(images);
        });
});

// select images by ID
router.get('/hashtags/:hashtags', (req, res) => {
    Image.find({ "img.hashtags" : req.params.hashtags })
        .sort({ "_id": -1 })
        .limit(6)
        .exec((err, images) => {
            if (err) throw err;
            
            images.map((image, i) => {
                image.img.convert = image.img.data.toString('utf8');
            });

            res.json(images);
        });
});

// DELETE IMAGE
router.delete('/delete/:id', (req, res) => {

    // CEHCK MEMO ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
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

    Image.findById(req.params.id, (err, image) => {
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

        Image.remove({ _id: req.params.id }, err => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

export default router;