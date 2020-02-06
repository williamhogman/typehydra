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
const axios_1 = __importDefault(require("axios"));
const urljoin = require("url-join");
const url_1 = require("url");
class HydraClient {
    constructor(uri) {
        this.uri = uri;
    }
    getURI() {
        return this.uri;
    }
    getClients(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitString = limit ? `?limit=${limit}` : "";
            const offsetString = offset ? `?offset=${offset}` : "";
            return this.get(urljoin("/clients", limitString, offsetString));
        });
    }
    createClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post("/clients", client);
        });
    }
    getClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`/clients/${id}`);
        });
    }
    updateClient(id, client) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/clients/${id}`, client);
        });
    }
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/clients/${id}`);
        });
    }
    getJSONWebKeySet(set) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`/keys/${set}`);
        });
    }
    updateJSONWebKeySet(set, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/keys/${set}`, body);
        });
    }
    generateJSONWebKey(set, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(`/keys/${set}`, body);
        });
    }
    deleteJSONWebKeySet(set) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/keys/${set}`);
        });
    }
    fetchJSONWebKey(kid, set) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`/keys/${set}/${kid}`);
        });
    }
    updateJSONWebKey(set, kid, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/keys/${set}/${kid}`, body);
        });
    }
    deleteJSONWebKey(set, kid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/keys/${set}/${kid}`);
        });
    }
    getConsentRequest(challenge) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`/oauth2/auth/requests/consent/${challenge}`);
        });
    }
    acceptConsentRequest(challenge, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/oauth2/auth/requests/consent/${challenge}/accept`, body);
        });
    }
    rejectConsentRequest(challenge, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/oauth2/auth/requests/consent/${challenge}/reject`, body);
        });
    }
    getLoginRequest(challenge) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`/oauth2/auth/requests/login/${challenge}`);
        });
    }
    acceptLoginRequest(challenge, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/oauth2/auth/requests/login/${challenge}/accept`, body);
        });
    }
    rejectLoginRequest(challenge, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`/oauth2/auth/requests/login/${challenge}/reject`, body);
        });
    }
    getConsentSessions(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`/oauth2/auth/sessions/consent/${user}`);
        });
    }
    revokeConsentSessions(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/oauth2/auth/sessions/consent/${user}`);
        });
    }
    revokeConsentSession(user, client) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/oauth2/auth/sessions/consent/${user}/${client}`);
        });
    }
    invalidateUserSession(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`/oauth2/auth/sessions/login/${user}`);
        });
    }
    flushExpiredOAuth2AccessTokens(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post("/oauth2/flush", body);
        });
    }
    introspectOAuth2Token(token, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            // This endpoint uses application/x-www-form-urlencoded instead of
            // application/json, so we need to handle it differently.
            const body = new url_1.URLSearchParams();
            body.append("token", token);
            if (scope) {
                body.append("scope", scope);
            }
            return axios_1.default.post(this.joinPath("/oauth2/introspect"), body, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                responseType: "json",
            })
                .then((res) => res.data)
                .catch((err) => {
                if (err.response) {
                    throw err.response.data;
                }
                throw err;
            });
        });
    }
    checkAliveStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get("/health/alive")
                .then((response) => response.status);
        });
    }
    checkReadinessStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get("/health/ready")
                .then((response) => response.status);
        });
    }
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get("/version")
                .then((response) => response.version);
        });
    }
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.get(this.joinPath(path), {
                headers: {
                    Accept: "application/json",
                },
                responseType: "json",
            })
                .then((res) => res.data)
                .catch((err) => {
                if (err.response) {
                    throw err.response.data;
                }
                throw err;
            });
        });
    }
    post(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.post(this.joinPath(path), {
                body: JSON.stringify(body),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                responseType: "json",
            })
                .then((res) => res.data)
                .catch((err) => {
                if (err.response) {
                    throw err.response.data;
                }
                throw err;
            });
        });
    }
    put(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.put(this.joinPath(path), {
                body: JSON.stringify(body),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                responseType: "json",
            })
                .then((res) => res.data)
                .catch((err) => {
                if (err.response) {
                    throw err.response.data;
                }
                throw err;
            });
        });
    }
    delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.delete(this.joinPath(path), {
                headers: {
                    Accept: "application/json",
                },
                responseType: "json",
            })
                .then((res) => res.data)
                .catch((err) => {
                if (err.response) {
                    throw err.response.data;
                }
                throw err;
            });
        });
    }
    joinPath(path) {
        return urljoin(this.uri, path);
    }
}
exports.default = HydraClient;
//# sourceMappingURL=HydraClient.js.map