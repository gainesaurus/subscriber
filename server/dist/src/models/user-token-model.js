"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const userTokenSchema = new index_js_1.default.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, { collection: 'user-token' });
exports.default = index_js_1.default.model('user-token', userTokenSchema);
