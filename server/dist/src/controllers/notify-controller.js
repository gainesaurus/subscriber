"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSubNotification = void 0;
const user_token_model_js_1 = __importDefault(require("../models/user-token-model.js"));
const notify_js_1 = require("../notify.js");
function postSubNotification(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notifyInfo = req.body;
            const userToken = yield user_token_model_js_1.default.findOne({ userId: notifyInfo.userId });
            const messageData = {
                title: notifyInfo.title,
                body: `you are about to be billed $${notifyInfo.price} from ${notifyInfo.title}!`
            };
            const delay = notifyInfo.delay; //15; //will send the delay time from the client side!
            console.log(delay);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                (0, notify_js_1.sendReminderToClient)(userToken.token, messageData);
            }), delay);
            res.sendStatus(201);
        }
        catch (err) {
            console.log('ERROR in NOTIFY controller POST from db', err);
            res.status(500);
        }
    });
}
exports.postSubNotification = postSubNotification;
