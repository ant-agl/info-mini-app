"use strict";
exports.__esModule = true;
exports.Profile = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var icons_1 = require("@vkontakte/icons");
var api_1 = require("../api/api");
var SnackbarContext_1 = require("../SnackbarContext");
exports.Profile = function (_a) {
    var id = _a.id;
    var openError = SnackbarContext_1.useSnackbar().openError;
    var _b = react_1.useState(""), tgID = _b[0], setTgID = _b[1];
    var _c = react_1.useState(""), oldTgID = _c[0], setOldTgID = _c[1];
    var _d = react_1.useState(true), tgDisabled = _d[0], setTgDisabled = _d[1];
    var tgInput = react_1.useRef(null);
    react_1.useEffect(function () {
        api_1.getBindings().then(function (bindings) {
            if (bindings.tg) {
                setTgID(bindings.tg);
                setOldTgID(bindings.tg);
            }
        })["catch"](function (err) {
            openError(err.response.data || "Возникла ошибка");
        });
    }, []);
    var sendForm = function (type) {
        console.log('save', type, tgID);
        if (type == 'tg' && tgID) {
            api_1.saveBinding(type, tgID)["catch"](function (err) {
                openError(err.response.data || "Возникла ошибка");
            });
            setTgDisabled(true);
            setOldTgID(tgID);
        }
    };
    var cancelField = function (type) {
        if (type == 'tg') {
            setTgDisabled(true);
            setTgID(oldTgID);
        }
    };
    var editField = function (type) {
        if (type == 'tg') {
            setTgDisabled(false);
            setTimeout(function () {
                if (tgInput.current) {
                    tgInput.current.focus();
                }
            });
        }
    };
    return (React.createElement(vkui_1.Panel, { id: id },
        React.createElement(vkui_1.PanelHeader, null, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C"),
        React.createElement(vkui_1.Group, null,
            React.createElement(vkui_1.Header, null, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F"),
            React.createElement(vkui_1.FormLayoutGroup, null,
                React.createElement(vkui_1.FormItem, { top: "Telegram ID", htmlFor: "tg-id" },
                    React.createElement(vkui_1.Flex, { noWrap: true, gap: 'm' },
                        React.createElement(vkui_1.Input, { getRef: tgInput, id: "tg-id", name: "tg-id", placeholder: "xxx", value: tgID, onChange: function (e) { return setTgID(+e.currentTarget.value); }, style: { width: '100%' }, disabled: tgDisabled }),
                        tgDisabled ? (React.createElement(vkui_1.IconButton, { label: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C", onClick: function () { return editField('tg'); } },
                            React.createElement(icons_1.Icon16Pen, { color: 'var(--vkui--color_text_accent_themed)' }))) : (React.createElement(vkui_1.Flex, { noWrap: true, style: { margin: 0 } },
                            React.createElement(vkui_1.IconButton, { label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", onClick: function () { return sendForm('tg'); } },
                                React.createElement(icons_1.Icon20Check, { width: 16, height: 16, color: 'green' })),
                            React.createElement(vkui_1.IconButton, { label: "\u041E\u0442\u043C\u0435\u043D\u0430", onClick: function () { return cancelField('tg'); } },
                                React.createElement(icons_1.Icon28CrossLargeOutline, { width: 16, height: 16, color: 'red' }))))))))));
};
