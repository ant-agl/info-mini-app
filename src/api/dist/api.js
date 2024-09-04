"use strict";
var _a;
exports.__esModule = true;
exports.getGroups = exports.saveBinding = exports.getBindings = exports.sendForPublication = exports.sendForRevision = exports.editTicket = exports.addTicket = exports.getTickets = exports.api = void 0;
var axios_1 = require("axios");
var mockData_1 = require("./mockData");
var bencode_1 = require("bencode");
var dev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
var token = (_a = localStorage.token) !== null && _a !== void 0 ? _a : null;
var authError = function () {
    document.body.innerHTML = '<h1 style="text-align: center; margin: 0;">Ошибка авторизации</h1>';
};
exports.api = axios_1["default"].create({
    baseURL: "https://metodnikiforova.site/",
    headers: {
        "Content-Type": "application/x-bittorrent",
        Accept: "text/plain, */*",
        Authorization: token !== null && token !== void 0 ? token : ""
    }
});
function getUrl(img) {
    return "https://metodnikiforova.site/assets/" + new TextDecoder().decode(img);
}
function getTickets() {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve(mockData_1.tickets);
            return;
        }
        exports.api.get("/correspondence")
            .then(function (res) {
            var decodeRes = bencode_1["default"].decode(res.data);
            console.log(decodeRes);
            var data = decodeRes.map(function (item) { return ({
                id: new TextDecoder().decode(item.index),
                title: new TextDecoder().decode(item.title),
                description: new TextDecoder().decode(item.content),
                groups: item.groups.map(function (g) { return new TextDecoder().decode(g); }),
                time: item.time,
                media: item.media.map(function (m) { return ({
                    name: new TextDecoder().decode(m.name),
                    url: getUrl(m.index),
                    index: new TextDecoder().decode(m.index),
                    mimetype: new TextDecoder().decode(m.mimetype)
                }); }),
                offer: item.offer,
                authors: item.authors.map(function (g) { return new TextDecoder().decode(g); }),
                corrections: item.corrections.map(function (m) { return ({
                    author: new TextDecoder().decode(m.author),
                    text: new TextDecoder().decode(m.text),
                    sat: m.sat == 1
                }); })
            }); });
            console.log(data);
            resolve(data);
        })["catch"](function (err) {
            var _a, _b;
            console.log(err);
            if (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) == 401 || ((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.status) == 424) {
                authError();
            }
            reject(err);
        });
    });
}
exports.getTickets = getTickets;
function addTicket(data) {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve();
            return;
        }
        exports.api.post("/new", bencode_1["default"].encode(data))
            .then(function (res) {
            console.log('res.data', res.data);
            resolve();
        })["catch"](function (err) {
            console.log(err);
            if (err.response.data)
                localStorage.setItem('errorMessage', err.response.data);
            reject(err);
        });
    });
}
exports.addTicket = addTicket;
function editTicket(index, data) {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve();
            return;
        }
        exports.api.patch("/edit/" + index, bencode_1["default"].encode(data))
            .then(function (res) {
            console.log('res.data', res.data);
            resolve();
        })["catch"](function (err) {
            console.log(err);
            if (err.response.data)
                localStorage.setItem('errorMessage', err.response.data);
            reject(err);
        });
    });
}
exports.editTicket = editTicket;
function sendForRevision(id, reason) {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve(true);
            return;
        }
        exports.api.post("/reject/" + id, bencode_1["default"].encode(reason))
            .then(function (res) {
            resolve(res.data);
        })["catch"](function (err) {
            console.log(err);
            reject(err);
        });
    });
}
exports.sendForRevision = sendForRevision;
function sendForPublication(id) {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve(true);
            return;
        }
        exports.api.get("/appr/" + id)
            .then(function (res) {
            resolve(res.data);
        })["catch"](function (err) {
            console.log(err);
            reject(err);
        });
    });
}
exports.sendForPublication = sendForPublication;
function getBindings() {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve({ tg: 12321123 });
            return;
        }
        exports.api.get("/bindings")
            .then(function (res) {
            var decodeRes = bencode_1["default"].decode(res.data);
            resolve(decodeRes);
        })["catch"](function (err) {
            console.log(err);
            reject(err);
        });
    });
}
exports.getBindings = getBindings;
function saveBinding(proto, contact) {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve(true);
            return;
        }
        exports.api.get("/bind/" + proto + "/" + contact)
            .then(function (res) {
            resolve(res.data);
        })["catch"](function (err) {
            console.log(err);
            reject(err);
        });
    });
}
exports.saveBinding = saveBinding;
function getGroups() {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve([
                [
                    'group1', 'group2', 'all'
                ],
                [
                    'group3'
                ]
            ]);
            return;
        }
        exports.api.get("/groups")
            .then(function (res) {
            resolve(res.data);
        })["catch"](function (err) {
            console.log(err);
            reject(err);
        });
    });
}
exports.getGroups = getGroups;
