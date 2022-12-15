import mongoose from './index.js';
var userTokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, { collection: 'user-token' });
export default mongoose.model('user-token', userTokenSchema);
