import express from 'express';
import account from './account';
import memo from './memo';
import upload from './upload';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

//router.use('/account', authMiddleware);
router.use('/account', account);
router.use('/memo', authMiddleware);
router.use('/memo', memo);
router.use('/upload', upload);

export default router;