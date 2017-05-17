import express from 'express';
import Image from '../models/image';
import mongoose from 'mongoose';
import multiparty from 'multiparty';
import fs from 'fs';

const router = express.Router();

router.post('/', (req, res) => {
    let image = new Image;

    image.img.data = req.body.imageUrl.imagePreviewUrl;
    image.img.contents = req.body.imageUrl.contents;
    image.img.writer = req.body.imageUrl.writer;
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

export default router;