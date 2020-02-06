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
describe("/version endpoint", () => {
    let client;
    beforeEach(() => {
        client = new src_1.default(MOCK_URL);
    });
    test("request succeeds with expected version", () => __awaiter(void 0, void 0, void 0, function* () {
        const MOCK_VERSION = "v1.0.0-rc.6+oryOS.10";
        nock(MOCK_URL)
            .get("/version")
            .reply(200, {
            version: MOCK_VERSION
        });
        expect.assertions(1);
        yield expect(client.getVersion()).resolves.toBe(MOCK_VERSION);
    }));
});
//# sourceMappingURL=version.js.map