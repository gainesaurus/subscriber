"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const notificationSchema = new index_js_1.default.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    delay: {
        type: Number,
        required: true
    }
}, { collection: 'user-notify' });
exports.default = index_js_1.default.model('user-notify', notificationSchema);
