"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sub_controller_js_1 = require("./controllers/sub-controller.js");
const user_token_controller_js_1 = require("./controllers/user-token-controller.js");
const notify_controller_js_1 = require("./controllers/notify-controller.js");
//routes
router.get('/subscriptions', sub_controller_js_1.getAllSubs);
router.post('/subscriptions', sub_controller_js_1.postOneSub);
router.put('/subscriptions', sub_controller_js_1.editSub);
router.delete('/subscriptions', sub_controller_js_1.deleteSub);
router.put('/user-token', user_token_controller_js_1.putToken);
router.post('/notify', notify_controller_js_1.postSubNotification);
router.get('/*', (_, res) => {
    res.status(404).send('Requested resource not found\n');
});
exports.default = router;
