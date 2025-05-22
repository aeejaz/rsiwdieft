const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
           // JWT expiry ensures tokens can’t be used forever. - Blacklist expiry keeps your database clean and lets you revoke tokens early (e.g., on logout).
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);