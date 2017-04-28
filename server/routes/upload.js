import express from 'express';
import Image from '../models/image';
import mongoose from 'mongoose';
import multiparty from 'multiparty';
import fs from 'fs';

const router = express.Router();

router.post('/', (req, res) => {
    let image = new Image;

    image.img.data = req.body.imageUrl;
    image.img.contentType = 'image/png';
    image.save((err, image) => {
        if (err) throw err;
        console.error('saved img to mongo');
        return res.json({ success: true });
    });
});

router.get('/', (req, res) => {
    /*
    Image.findById(image, (err, doc) => {
        if (err) return next(err);
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);
    });*/
    Image.find().exec((err, images) => {
        if (err) throw err;
        return res.json(images);
    });
});

export default router;