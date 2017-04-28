import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Image = new Schema({
    img : {
        data: Buffer,
        contentType: String
    }
});

export default mongoose.model('image', Image);