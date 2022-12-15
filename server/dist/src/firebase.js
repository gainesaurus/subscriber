"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messaging = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    databaseURL: process.env.MONGO_URI_CLOUD_ATLAS
});
exports.messaging = firebase_admin_1.default.messaging();
