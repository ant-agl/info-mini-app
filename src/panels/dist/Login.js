"use strict";
exports.__esModule = true;
exports.Login = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var blakejs_1 = require("blakejs");
exports.Login = function (_a) {
    var id = _a.id;
    var _b = react_1.useState(''), username = _b[0], setUsername = _b[1];
    var _c = react_1.useState(''), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState(false), isSend = _d[0], setIsSend = _d[1];
    var handleSubmit = function () {
        setIsSend(true);
        if (!username || !password)
            return;
        var token = btoa(username + ":" + blakejs_1["default"].blake2bHex(password, undefined, 64));
        localStorage.setItem("authToken", token);
        location.reload();
    };
    return (React.createElement(vkui_1.Panel, { id: id },
        React.createElement(vkui_1.PanelHeader, null, "\u0412\u0445\u043E\u0434"),
        React.createElement(vkui_1.Div, null,
            React.createElement(vkui_1.Group, null,
                React.createElement(vkui_1.FormLayoutGroup, null,
                    React.createElement(vkui_1.FormItem, { top: "\u041B\u043E\u0433\u0438\u043D", required: true },
                        React.createElement(vkui_1.Input, { type: "text", status: !isSend || username ? 'default' : 'error', value: username, onChange: function (e) { return setUsername(e.currentTarget.value); }, placeholder: "\u041B\u043E\u0433\u0438\u043D", required: true })),
                    React.createElement(vkui_1.FormItem, { top: "\u041F\u0430\u0440\u043E\u043B\u044C", required: true },
                        React.createElement(vkui_1.Input, { type: "password", value: password, status: !isSend || password ? 'default' : 'error', onChange: function (e) { return setPassword(e.currentTarget.value); }, placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", required: true })),
                    React.createElement(vkui_1.FormItem, null,
                        React.createElement(vkui_1.Button, { size: "m", stretched: true, onClick: handleSubmit }, "\u0412\u043E\u0439\u0442\u0438")))))));
};
exports["default"] = exports.Login;
