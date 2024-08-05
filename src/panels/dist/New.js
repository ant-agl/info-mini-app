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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.New = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
// import { Icon24Camera, Icon20SendOutline, Icon16Clear, Icon20DeleteOutline } from '@vkontakte/icons';
var icons_1 = require("@vkontakte/icons");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
var api_1 = require("../api/api");
exports.New = function (_a) {
    var id = _a.id;
    var routeNavigator = vk_mini_apps_router_1.useRouteNavigator();
    var _b = react_1.useState(""), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState(""), description = _c[0], setDescription = _c[1];
    var _d = react_1.useState([]), images = _d[0], setImages = _d[1];
    var _e = react_1.useState([]), groups = _e[0], setGroups = _e[1];
    var _f = react_1.useState(function () { return new Date(); }), date = _f[0], setDate = _f[1];
    var _g = react_1.useState(false), isSend = _g[0], setIsSend = _g[1];
    var isStatus = function (val) {
        if (!isSend)
            return "default";
        return val ? 'valid' : 'error';
    };
    var handleImages = function (newFiles) {
        // const types = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (newFiles)
            setImages(function (prevFiles) { return __spreadArrays(prevFiles, Array.from(newFiles)); });
    };
    var deleteImage = function (index) {
        setImages(function (prevFiles) { return prevFiles.filter(function (_, i) { return i !== index; }); });
    };
    var readFiles = function (files) { return __awaiter(void 0, void 0, Promise, function () {
        var readFile;
        return __generator(this, function (_a) {
            readFile = function (file) { return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = function () { return resolve(reader.result); };
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            }); };
            return [2 /*return*/, Promise.all(files.map(readFile))];
        });
    }); };
    var sendForm = function () { return __awaiter(void 0, void 0, void 0, function () {
        var fileBuffers, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSend(true);
                    if (!title || !description || groups.length == 0)
                        return [2 /*return*/];
                    return [4 /*yield*/, readFiles(images)];
                case 1:
                    fileBuffers = _a.sent();
                    data = {
                        title: title,
                        content: description,
                        groups: groups.map(function (t) { return t.value; }),
                        time: Math.floor(date.getTime() / 1000),
                        media: fileBuffers
                    };
                    console.log(data);
                    api_1.addTicket(data).then(function () {
                        routeNavigator.push('/');
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(vkui_1.Panel, { id: id },
        React.createElement(vkui_1.PanelHeader, { before: React.createElement(vkui_1.PanelHeaderBack, { onClick: function () { return routeNavigator.back(); } }) }, "\u041D\u043E\u0432\u044B\u0439 \u0442\u0438\u043A\u0435\u0442"),
        React.createElement(vkui_1.Group, null,
            React.createElement(vkui_1.FormItem, { top: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u0438\u043A\u0435\u0442\u0430", status: isStatus(title), required: true },
                React.createElement(vkui_1.Input, { id: "title", name: "title", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u0438\u043A\u0435\u0442\u0430", value: title, required: true, onChange: function (e) { return setTitle(e.currentTarget.value); } })),
            React.createElement(vkui_1.FormItem, { top: "\u0422\u0435\u043A\u0441\u0442 \u0442\u0438\u043A\u0435\u0442\u0430", required: true, bottom: (React.createElement(vkui_1.Flex, { direction: 'column', gap: 4 },
                    React.createElement("span", null,
                        "*\u0416\u0438\u0440\u043D\u044B\u0439* \u2014 ",
                        React.createElement("b", null, "\u0422\u0435\u043A\u0441\u0442")),
                    React.createElement("span", null,
                        "_\u041A\u0443\u0440\u0441\u0438\u0432\u043D\u044B\u0439_ \u2014 ",
                        React.createElement("i", null, "\u0422\u0435\u043A\u0441\u0442")),
                    React.createElement("span", null,
                        "__\u041F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439__ \u2014 ",
                        React.createElement("u", null, "\u0422\u0435\u043A\u0441\u0442")),
                    React.createElement("span", null,
                        "~\u0417\u0430\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439~ \u2014 ",
                        React.createElement("s", null, "\u0422\u0435\u043A\u0441\u0442")),
                    React.createElement("span", null, "||\u0421\u043A\u0440\u044B\u0442\u044B\u0439||"),
                    React.createElement("span", null, "`\u041C\u043E\u043D\u043E\u0448\u0438\u0440\u043D\u044B\u0439`"),
                    React.createElement("span", null, "> \u0426\u0438\u0442\u0430\u0442\u0430"))) },
                React.createElement(vkui_1.Textarea, { id: "description", name: "description", placeholder: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0442\u0438\u043A\u0435\u0442\u0430", value: description, required: true, maxHeight: 300, onChange: function (e) { return setDescription(e.currentTarget.value); } })),
            React.createElement(vkui_1.FormLayoutGroup, { mode: "horizontal" },
                React.createElement(vkui_1.FormItem, { top: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B" },
                    React.createElement(vkui_1.File, { before: React.createElement(icons_1.Icon24Document, { role: "presentation" }), size: "m", id: "image", onChange: function (e) { var _a; return handleImages((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.files); }, multiple: true }),
                    images.map(function (file, i) { return (React.createElement(vkui_1.Flex, { key: i, align: 'center', gap: 10 },
                        React.createElement(vkui_1.Subhead, null, file.name),
                        React.createElement(vkui_1.IconButton, { label: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u0430\u0439\u043B", style: { width: 30, height: 30 }, onClick: function () { return deleteImage(i); } },
                            React.createElement(icons_1.Icon16DeleteOutline, { style: { padding: 3, margin: "auto" } })))); }))),
            React.createElement(vkui_1.FormLayoutGroup, { mode: "horizontal" },
                React.createElement(vkui_1.FormItem, { top: "\u0422\u0435\u0433\u0438 (\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 enter)" },
                    React.createElement(vkui_1.ChipsInput, { id: "groups", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u0433\u0438", after: groups.length > 0 &&
                            React.createElement(vkui_1.IconButton, { hoverMode: "opacity", label: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435", onClick: function () { return setGroups([]); } },
                                React.createElement(icons_1.Icon16Clear, null)), value: groups, onChange: function (e) { return setGroups(e); } })),
                React.createElement(vkui_1.FormItem, { top: "\u0412\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0438 \u0432\u0440\u0435\u043C\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438" },
                    React.createElement(vkui_1.DateInput, { disablePast: true, enableTime: true, closeOnChange: true, value: date, onChange: function (e) { return e && setDate(e); } }))),
            React.createElement(vkui_1.FormItem, null,
                React.createElement(vkui_1.Button, { onClick: sendForm, before: React.createElement(icons_1.Icon20SendOutline, null), size: "m", stretched: true }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 / \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E")))));
};
