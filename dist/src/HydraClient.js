"use strict";
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
    async getClients(limit, offset) {
        const limitString = limit ? `?limit=${limit}` : "";
        const offsetString = offset ? `?offset=${offset}` : "";
        return this.get(urljoin("/clients", limitString, offsetString));
    }
    async createClient(client) {
        return this.post("/clients", client);
    }
    async getClient(id) {
        return this.get(`/clients/${id}`);
    }
    async updateClient(id, client) {
        return this.put(`/clients/${id}`, client);
    }
    async deleteClient(id) {
        return this.delete(`/clients/${id}`);
    }
    async getJSONWebKeySet(set) {
        return this.get(`/keys/${set}`);
    }
    async updateJSONWebKeySet(set, body) {
        return this.put(`/keys/${set}`, body);
    }
    async generateJSONWebKey(set, body) {
        return this.post(`/keys/${set}`, body);
    }
    async deleteJSONWebKeySet(set) {
        return this.delete(`/keys/${set}`);
    }
    async fetchJSONWebKey(kid, set) {
        return this.get(`/keys/${set}/${kid}`);
    }
    async updateJSONWebKey(set, kid, body) {
        return this.put(`/keys/${set}/${kid}`, body);
    }
    async deleteJSONWebKey(set, kid) {
        return this.delete(`/keys/${set}/${kid}`);
    }
    async getConsentRequest(challenge) {
        return this.get(`/oauth2/auth/requests/consent/${challenge}`);
    }
    async acceptConsentRequest(challenge, body) {
        return this.put(`/oauth2/auth/requests/consent/${challenge}/accept`, body);
    }
    async rejectConsentRequest(challenge, body) {
        return this.put(`/oauth2/auth/requests/consent/${challenge}/reject`, body);
    }
    async getLoginRequest(challenge) {
        return this.get(`/oauth2/auth/requests/login/${challenge}`);
    }
    async acceptLoginRequest(challenge, body) {
        return this.put(`/oauth2/auth/requests/login/${challenge}/accept`, body);
    }
    async rejectLoginRequest(challenge, body) {
        return this.put(`/oauth2/auth/requests/login/${challenge}/reject`, body);
    }
    async getConsentSessions(user) {
        return this.get(`/oauth2/auth/sessions/consent/${user}`);
    }
    async revokeConsentSessions(user) {
        return this.delete(`/oauth2/auth/sessions/consent/${user}`);
    }
    async revokeConsentSession(user, client) {
        return this.delete(`/oauth2/auth/sessions/consent/${user}/${client}`);
    }
    async invalidateUserSession(user) {
        return this.delete(`/oauth2/auth/sessions/login/${user}`);
    }
    async flushExpiredOAuth2AccessTokens(body) {
        return this.post("/oauth2/flush", body);
    }
    async introspectOAuth2Token(token, scope) {
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
    }
    async checkAliveStatus() {
        return this.get("/health/alive")
            .then((response) => response.status);
    }
    async checkReadinessStatus() {
        return this.get("/health/ready")
            .then((response) => response.status);
    }
    async getVersion() {
        return this.get("/version")
            .then((response) => response.version);
    }
    async get(path) {
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
    }
    async post(path, body) {
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
    }
    async put(path, body) {
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
    }
    async delete(path) {
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
    }
    joinPath(path) {
        return urljoin(this.uri, path);
    }
}
exports.default = HydraClient;
//# sourceMappingURL=HydraClient.js.map