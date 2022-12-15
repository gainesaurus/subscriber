"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const subSchema = new index_js_1.default.Schema({
    icon: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    prettyStart: {
        type: String,
        required: true
    },
    cycle: {
        type: String,
        required: true
    },
    reminderDate: {
        type: Date,
        required: true
    }
}, { collection: 'subscriptions' });
exports.default = index_js_1.default.model('subscriptions', subSchema);
