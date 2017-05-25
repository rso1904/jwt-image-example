import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import config from '../../config';

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now },
    image: String,
    email: String
});

// generates hash
Account.methods.generateHash = function (password) {
    //return bcrypt.hashSync(password, 8);
    return crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64');
};

// compares the password
Account.methods.validateHash = function (password) {
    //return bcrypt.compareSync(password, this.password);
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64');

    return this.password === encrypted;
}

export default mongoose.model('account', Account);