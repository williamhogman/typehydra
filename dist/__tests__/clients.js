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
const src_1 = __importDefault(require("../src"));
const nock = require("nock");
const MOCK_URL = "http://localhost";
describe("GET /clients endpoint", () => {
    let client;
    beforeEach(() => {
        client = new src_1.default(MOCK_URL);
    });
    test("request succeeds with expected clients", () => __awaiter(void 0, void 0, void 0, function* () {
        const MOCK_CLIENTS = [
            {
                client_id: "1"
            },
            {
                client_id: "2"
            }
        ];
        nock(MOCK_URL)
            .get("/clients")
            .reply(200, [...MOCK_CLIENTS]);
        expect.assertions(1);
        yield expect(client.getClients()).resolves.toEqual(MOCK_CLIENTS);
    }));
    test("request sends correct limit and offset parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        nock(MOCK_URL)
            .get("/clients?limit=1&offset=1")
            .reply(200, []);
        expect.assertions(1);
        yield expect(client.getClients(1, 1)).resolves.toEqual([]);
    }));
    test("request fails with expected error", () => __awaiter(void 0, void 0, void 0, function* () {
        const MOCK_ERROR = {
            error: "error",
            error_code: 500,
            error_debug: "debug",
            error_hint: "hint",
        };
        nock(MOCK_URL)
            .get("/clients")
            .reply(500, MOCK_ERROR);
        expect.assertions(1);
        yield expect(client.getClients()).rejects.toMatchObject(MOCK_ERROR);
    }));
});
//# sourceMappingURL=clients.js.map