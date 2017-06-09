import express from 'express';
import account from './account';
import upload from './upload';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

router.use('/account', account);
//router.use('/upload', authMiddleware);
router.use('/upload', upload);

export default router;