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
describe("GET /health/alive endpoint", () => {
    let client;
    beforeEach(() => {
        client = new src_1.default(MOCK_URL);
    });
    test("request succeeds with expected status", () => __awaiter(void 0, void 0, void 0, function* () {
        const MOCK_STATUS = "ok";
        nock(MOCK_URL)
            .get("/health/alive")
            .reply(200, {
            status: MOCK_STATUS,
        });
        expect.assertions(1);
        yield expect(client.checkAliveStatus()).resolves.toBe(MOCK_STATUS);
    }));
    test("request fails with expected error", () => __awaiter(void 0, void 0, void 0, function* () {
        const MOCK_ERROR = {
            error: "error",
            error_code: 500,
            error_debug: "debug",
            error_hint: "hint",
        };
        nock(MOCK_URL)
            .get("/health/alive")
            .reply(500, MOCK_ERROR);
        expect.assertions(1);
        yield expect(client.checkAliveStatus()).rejects.toMatchObject(MOCK_ERROR);
    }));
});
describe("GET /health/ready endpoint", () => {
    let client;
    beforeEach(() => {
        client = new src_1.default(MOCK_URL);
    });
    test("request succeeds with expected status", () => __awaiter(void 0, void 0, void 0, function* () {
        const MOCK_STATUS = "ok";
        nock(MOCK_URL)
            .get("/health/ready")
            .reply(200, {
            status: MOCK_STATUS,
        });
        expect.assertions(1);
        yield expect(client.checkReadinessStatus()).resolves.toBe(MOCK_STATUS);
    }));
    test("request fails with expected error", () => __awaiter(void 0, void 0, void 0, function* () {
        const MOCK_ERROR = {
            errors: {
                "error1": "1",
            },
        };
        nock(MOCK_URL)
            .get("/health/ready")
            .reply(500, MOCK_ERROR);
        expect.assertions(1);
        yield expect(client.checkReadinessStatus()).rejects.toMatchObject(MOCK_ERROR);
    }));
});
//# sourceMappingURL=health.js.map