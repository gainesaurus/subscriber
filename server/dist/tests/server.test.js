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
const server_1 = __importDefault(require("../server"));
const mocks_1 = __importDefault(require("./mocks"));
describe("Server setup", () => {
    const PORT = process.env.PORT;
    const HOSTNAME = process.env.HOSTNAME;
    const BASE_URL = HOSTNAME + ':' + PORT;
    let id;
    beforeAll((done) => {
        server_1.default.listen(PORT, () => {
            done();
        });
    });
    test('should GET subscriptions on /subscriptions', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(BASE_URL + '/subscriptions');
        expect(response.status).toBe(200);
        const body = yield response.json();
        expect(body.length).not.toBeUndefined();
    }));
    test('should POST subscription on /subscriptions', () => __awaiter(void 0, void 0, void 0, function* () {
        const opts = {
            method: 'POST',
            body: JSON.stringify(mocks_1.default.subscriptionBody),
            headers: {
                'Content-type': 'application/json'
            }
        };
        const response = yield fetch(BASE_URL + '/subscriptions', opts);
        expect(response.status).toBe(201);
        const body = yield response.json();
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('_id');
        id = body._id;
    }));
    test('should PUT subscription on /subscriptions', () => __awaiter(void 0, void 0, void 0, function* () {
        const opts = {
            method: 'PUT',
            body: JSON.stringify(Object.assign(Object.assign({}, mocks_1.default.subscriptionBody), { id })),
            headers: {
                'Content-type': 'application/json'
            }
        };
        const response = yield fetch(BASE_URL + '/subscriptions', opts);
        expect(response.status).toBe(201);
        const body = yield response.json();
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('_id');
    }));
    test('should DELETE subscription on /subscriptions', () => __awaiter(void 0, void 0, void 0, function* () {
        const opts = {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                'Content-type': 'application/json'
            }
        };
        const response = yield fetch(BASE_URL + '/subscriptions', opts);
        expect(response.status).toBe(202);
    }));
});
