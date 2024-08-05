"use strict";
exports.__esModule = true;
exports.saveBinding = exports.getBindings = exports.sendForPublication = exports.sendForRevision = exports.addTicket = exports.getTickets = void 0;
var axios_1 = require("axios");
var mockData_1 = require("./mockData");
var bencode_1 = require("bencode");
var blakejs_1 = require("blakejs");
var dev = true;
var login = "admin";
// const login = "admin2";
var password = "qwerty";
var token = btoa(login + ":" + blakejs_1["default"].blake2bHex(password, undefined, 64));
var api = axios_1["default"].create({
    baseURL: "https://donstu.ant-agl.ru/" + token,
    headers: {
        "Content-Type": "application/x-bittorrent",
        Accept: "text/plain, */*"
    }
});
function getUrl(img) {
    return "https://so.ant-agl.ru/assets/" + new TextDecoder().decode(img);
}
function getTickets() {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve(mockData_1.tickets);
            return;
        }
        api.get("/wmc")
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
                offer: new TextDecoder().decode(item.offer),
                authors: item.authors.map(function (g) { return new TextDecoder().decode(g); })
            }); });
            console.log(data);
            resolve(data);
        })["catch"](function (err) {
            console.log(err);
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
        api.post("/new", bencode_1["default"].encode(data))
            .then(function (res) {
            console.log('res.data', res.data);
            resolve();
        })["catch"](function (err) {
            console.log(err);
            reject(err);
        });
    });
}
exports.addTicket = addTicket;
function sendForRevision(id, reason) {
    return new Promise(function (resolve, reject) {
        if (dev) {
            resolve(true);
            return;
        }
        api.post("/reject/" + id, bencode_1["default"].encode(reason))
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
        api.get("/appr/" + id)
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
            resolve(['123', '234', '312']);
            return;
        }
        api.get("/bindings")
            .then(function (res) {
            resolve(res.data);
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
        api.get("/bind/" + proto + "/" + contact)
            .then(function (res) {
            resolve(res.data);
        })["catch"](function (err) {
            console.log(err);
            reject(err);
        });
    });
}
exports.saveBinding = saveBinding;
