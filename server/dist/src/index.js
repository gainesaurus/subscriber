"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
server_1.default.listen(PORT, () => {
    console.log(`Listening on port ${PORT}! 🚀`);
});
