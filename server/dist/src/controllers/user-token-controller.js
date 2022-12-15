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
exports.putToken = void 0;
const user_token_model_js_1 = __importDefault(require("../models/user-token-model.js"));
function putToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenObj = req.body;
            console.log(tokenObj);
            const query = { userId: tokenObj.userId };
            const userToken = yield user_token_model_js_1.default.findOneAndUpdate(query, { token: tokenObj.token }, { upsert: true });
            res.send(userToken);
            res.status(201);
        }
        catch (err) {
            console.log('ERROR in USER_TOKEN controller PUT from db', err);
            res.status(500);
        }
    });
}
exports.putToken = putToken;
