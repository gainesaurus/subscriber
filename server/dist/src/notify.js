"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReminderToClient = void 0;
const firebase_1 = require("./firebase");
const sendReminderToClient = (token, data) => {
    // Send a message to the devices corresponding to the provided token
    firebase_1.messaging
        .send({ token, data })
        .then(response => {
        console.log(response);
        // console.log('[notify.js] Notifications response:',`${response.responses}`);
    })
        .catch(error => {
        console.log('Error sending message:', error);
    });
};
exports.sendReminderToClient = sendReminderToClient;
