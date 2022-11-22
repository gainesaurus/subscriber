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
exports.deleteSub = exports.editSub = exports.postOneSub = exports.getAllSubs = void 0;
const sub_model_js_1 = __importDefault(require("../models/sub-model.js"));
function getAllSubs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const subscriptions = yield sub_model_js_1.default.find().sort({ reminderDate: -1 });
            res.send(subscriptions);
            res.status(200);
        }
        catch (err) {
            console.log('ERROR in SUB controller GET from db', err);
            res.status(500);
        }
    });
}
exports.getAllSubs = getAllSubs;
function postOneSub(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sub = req.body;
            const createdSub = yield sub_model_js_1.default.create({
                icon: sub.icon,
                price: sub.price,
                title: sub.title,
                start: sub.start,
                prettyStart: sub.prettyStart,
                cycle: sub.cycle,
                reminderDate: sub.reminderDate,
            });
            res.status(201);
            res.send(createdSub);
        }
        catch (err) {
            console.log('ERROR in SUB controller POST from db', err);
            res.status(500);
        }
    });
}
exports.postOneSub = postOneSub;
function editSub(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updates = req.body;
            console.log(req.body);
            const query = { _id: updates.id };
            const updatedSub = yield sub_model_js_1.default.findOneAndUpdate(query, {
                icon: updates.icon,
                price: updates.price,
                title: updates.title,
                start: updates.start,
                prettyStart: updates.prettyStart,
                cycle: updates.cycle,
                reminderDate: updates.reminderDate,
            }, { new: true });
            res.status(201);
            res.send(updatedSub);
        }
        catch (err) {
            console.log('ERROR in SUB controller PUT from db', err);
            res.status(500);
        }
    });
}
exports.editSub = editSub;
function deleteSub(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const subId = req.body.id;
            yield sub_model_js_1.default.findOneAndDelete({ _id: subId });
            res.sendStatus(202);
        }
        catch (err) {
            console.log('ERROR in SUB controller DELETE from db', err);
            res.status(500);
        }
    });
}
exports.deleteSub = deleteSub;
