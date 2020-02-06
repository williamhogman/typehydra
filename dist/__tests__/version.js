"use strict";
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
    test("request succeeds with expected version", async () => {
        const MOCK_VERSION = "v1.0.0-rc.6+oryOS.10";
        nock(MOCK_URL)
            .get("/version")
            .reply(200, {
            version: MOCK_VERSION
        });
        expect.assertions(1);
        await expect(client.getVersion()).resolves.toBe(MOCK_VERSION);
    });
});
//# sourceMappingURL=version.js.map